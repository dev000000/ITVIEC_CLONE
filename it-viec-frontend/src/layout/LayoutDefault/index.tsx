import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutDefault.scss";
import Header from "@/components/Header";
import FooterComp from "@/components/Footer";
import { useEffect, useState } from "react";
import { getMeApi, logoutApi } from "@/services/authApi";
import { getMyProfileApi } from "@/services/seekerApi";
import { useUserStore } from "@/store/userStore";
import { useSeekerStore } from "@/store/seekerStore";
import { useCompanyStore } from "@/store/companyStore";
import { useTranslation } from "react-i18next";
import { ROLE } from "@/types/common.types";

const { Content } = Layout;

// 1.LayoutDefault sẽ dùng để check login từ token ( cookies ) để tránh việc người dùng đã login nhưng refresh lại trang thì sẽ bị mất thông tin login
// Với trường hợp check login xem đã login chưa để hiển thị + logic xử lí cho chuẩn 
const LayoutDefault = () => {
  console.log("1.LayoutDefault rendered");
  const { t } = useTranslation("common");
  // Hàm clear đi thông tin của seeker trong store
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);
  const setSeekerFullInfo = useSeekerStore((state) => state.setSeekerFullInfo);

  // Hàm clear đi thông tin của company trong store
  const clearCompanyInfo = useCompanyStore((state) => state.clearCompanyInfo);

  // Hàm clear đi thông tin của user trong store
  const logout = useUserStore((state) => state.logout);

  // Hàm này sẽ set thông tin user vào store
  const setLogin = useUserStore((state) => state.setLogin);

  // State để kiểm tra xem đang trong quá trình check token hay không
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  // Khi component được mount lên thì sẽ check token để lấy thông tin user
  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const { data: meData } = await getMeApi();
        // console.log("Thông tin user sau khi check token:", meData);

        const user = meData.result;
        setLogin(user);

        if (user.role === ROLE.SEEKER) {
          const seekerResponse = await getMyProfileApi();
          setSeekerFullInfo(seekerResponse.data.result);
        } else {
          clearSeekerInfo();
        }
      } catch {
        // Gọi API logout để clear token ở cookies
        await logoutApi();
        // Clear thông tin user trong store
        logout();
        // Clear thông tin seeker trong store nếu có
        clearSeekerInfo();
        // Clear thông tin company trong store nếu có
        clearCompanyInfo();
      } finally {
        // Kết thúc quá trình check token
        setIsCheckingToken(false);
      }
    }
    checkAuth();

  }, [clearCompanyInfo, clearSeekerInfo, logout, setLogin, setSeekerFullInfo]);

  // Nếu đang trong quá trình check token thì hiển thị loading, early return...
  if (isCheckingToken) return <div>{t("layout.loading")}</div>;

  // Nếu đã check xong token thì hiển thị layout bình thường
  return (
    <>
      <Layout className="layout-default">
        {/* Header kiểu login */}
        <Header type="home" />
        {/* Nội dung phần body */}
        <Content className="content">
          <Outlet />
        </Content>
        {/* Footer */}
        <FooterComp />
      </Layout>
    </>
  );
}

export default LayoutDefault;
