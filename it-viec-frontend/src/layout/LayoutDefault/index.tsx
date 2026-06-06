import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutDefault.scss";
import Header from "@/components/Header";
import FooterComp from "@/components/Footer";
import { useEffect, useState } from "react";
import { getMeApi, logoutApi } from "@/services/authApi";
import { useUserStore } from "@/store/userStore";
import { useSeekerStore } from "@/store/seekerStore";
import { useCompanyStore } from "@/store/companyStore";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

// LayoutDefault sẽ dùng để check login từ token ( cookies ) để tránh việc người dùng đã login nhưng refresh lại trang thì sẽ bị mất thông tin login
const LayoutDefault = () => {
  const { t } = useTranslation("common");
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);
  const clearCompanyInfo = useCompanyStore((state) => state.clearCompanyInfo);
  const logout = useUserStore((state) => state.logout);
  const setLogin = useUserStore((state) => state.setLogin);

  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const response = await getMeApi();
        setLogin(response.data.result);
      } catch {
        // Gọi API logout để clear token ở cookies
        await logoutApi();
        // Clear thông tin user trong store
        logout();
        // Clear thông tin seeker trong store nếu có
        clearSeekerInfo();
        clearCompanyInfo();
      } finally {
        setIsCheckingToken(false);
      }
    }
    checkAuth();

  }, [clearCompanyInfo, clearSeekerInfo, logout, setLogin]);

  return (
    <>
      {isCheckingToken ? (
        <div>{t("layout.loading")}</div>
      ) : (
        <Layout className="layout-default">
          <Header type="jobSeeker" />
          <Content className="content">
            <Outlet />
          </Content>
          <FooterComp />
        </Layout>
      )}
    </>
  );
}

export default LayoutDefault;
