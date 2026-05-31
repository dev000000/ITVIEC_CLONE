import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./LayoutCheckToken.scss";
import type { Role } from "@/types/common.types";
import { getMeApi } from "@/services/authApi";
import { useUserStore } from "@/store/userStore";
import { useTranslation } from "react-i18next";

interface LayoutCheckTokenProps {
  checkRole: Role;
}

const LayoutCheckToken = ({ checkRole }: LayoutCheckTokenProps) => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const setLogin = useUserStore((state) => state.setLogin);

  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async (): Promise<void> => {
      try {
        const checkTokenResult = await getMeApi();
        const user = checkTokenResult.data.result;
        // Kiểm tra user hiện tại có role phù hợp với route hay không
        if (user.role === checkRole) {
          setLogin({
            authenticated: user.authenticated,
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
          });
        } else {
          // Nếu role không phù hợp, chuyển hướng về trang chủ
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to validate current user session", error);
      } finally {
        setIsCheckingToken(false);
      }
    };
    checkToken();
  }, [checkRole, navigate, setLogin]);

  if (isCheckingToken) {
    return <div>{t("layout.loading")}</div>;
  }

  return <Outlet />;
}

export default LayoutCheckToken;
