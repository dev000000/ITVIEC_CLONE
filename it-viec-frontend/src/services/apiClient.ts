import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userStore";
import { refreshTokenCookieApi } from "./authApi";

/**
 * Khởi tạo axios instance để tùy chỉnh cấu hình cho toàn bộ dự án.
 */
const apiClient = axios.create();

// Thiết lập thời gian chờ cho mỗi request (10 phút)
apiClient.defaults.timeout = 1000 * 60 * 10;

// Cho phép gửi kèm cookies (dùng cho HttpOnly JWT tokens)
apiClient.defaults.withCredentials = true;

/**
 * Interceptor cho Request: Thực hiện các hành động trước khi gửi request.
 */
apiClient.interceptors.request.use(
  (config) => {
    // Có thể thêm Authorization header ở đây nếu không dùng cookie
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Biến lưu trữ Promise của việc làm mới token.
 * Giúp tránh việc gọi API refresh token nhiều lần đồng thời.
 */
let refreshTokenPromise: Promise<void> | null = null;

/**
 * Interceptor cho Response: Xử lý dữ liệu trả về hoặc lỗi tập trung.
 */
apiClient.interceptors.response.use(
  function onFulfilled(response) {
    // Trả về trực tiếp response object cho các code 2xx
    return response;
  },
  async function onRejected(error) {
    const originalRequest = error.config;

    // Lỗi 401: Chưa xác thực (thường là do chưa đăng nhập)
    if (error.response?.status === 401) {
      toast.error(error.response?.data?.message || "Phiên đăng nhập hết hạn.");
      return Promise.reject(error);
    }

    // Lỗi 410 (GONE): Access Token hết hạn, cần gọi refresh token
    if (error.response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenCookieApi()
          .then(() => {
            // Refresh thành công
          })
          .catch((_error) => {
            // Refresh thất bại -> Đăng xuất người dùng
            toast.error(_error.response?.data?.message || "Vui lòng đăng nhập lại.");
            useUserStore.getState().logout();
            return Promise.reject(_error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      // Đợi refresh token hoàn tất rồi thử lại request ban đầu
      return refreshTokenPromise.then(() => {
        return apiClient(originalRequest);
      });
    }

    // Lỗi 403: Không có quyền truy cập
    if (error.response?.status === 403) {
      toast.error(error.response?.data?.message || "Bạn không có quyền thực hiện hành động này.");
      return Promise.reject(error);
    }

    // Các lỗi khác
    return Promise.reject(error);
  },
);

export default apiClient;