import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./LayoutCheckToken.scss";
import { ROLE, type Role } from "@/types/common.types";
import { getMeApi } from "@/services/authApi";
import { getMyProfileApi } from "@/services/seekerApi";
import { useUserStore } from "@/store/userStore";
import { useTranslation } from "react-i18next";
import { useSeekerStore } from "@/store/seekerStore";
import { useCompanyStore } from "@/store/companyStore";
import { getLoginRouteByRole } from "@/utils/roleRedirect";

interface LayoutCheckTokenProps {
  checkRole: Role;
}

const LayoutCheckToken = ({ checkRole }: LayoutCheckTokenProps) => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const setLogin = useUserStore((state) => state.setLogin);
  const logout = useUserStore((state) => state.logout);
  const setSeekerFullInfo = useSeekerStore((state) => state.setSeekerFullInfo);
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);
  const clearCompanyInfo = useCompanyStore((state) => state.clearCompanyInfo);

  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async (): Promise<void> => {
      try {
        const checkTokenResult = await getMeApi();
        const user = checkTokenResult.data.result;

        setLogin({
          authenticated: user.authenticated,
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
        });

        if (user.role === ROLE.SEEKER && checkRole === ROLE.SEEKER) {
          const seekerResponse = await getMyProfileApi();
          setSeekerFullInfo(seekerResponse.data.result);
        }
      } catch (error) {
        console.error("Failed to validate current user session", error);
        logout();
        clearSeekerInfo();
        clearCompanyInfo();
        navigate(getLoginRouteByRole(checkRole), { replace: true });
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkToken();
  }, [
    checkRole,
    clearCompanyInfo,
    clearSeekerInfo,
    logout,
    navigate,
    setLogin,
    setSeekerFullInfo,
  ]);

  if (isCheckingToken) {
    return <div>{t("layout.loading")}</div>;
  }

  return <Outlet />;
};

export default LayoutCheckToken;
