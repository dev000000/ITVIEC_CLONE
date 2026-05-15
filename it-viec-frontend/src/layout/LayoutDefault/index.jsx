import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutDefault.scss";
import Header from "@/components/Header";
import FooterComp from "@/components/Footer";
import { useEffect, useState } from "react";
import { getMeApi } from "@/services_new/authApi";
import { useUserStore } from "@/store/userStore";
import { useSeekerStore } from "@/store/seekerStore";

const { Content } = Layout;

function LayoutDefault() {
  const navigate = useNavigate();
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);
  // const authenticated = useUserStore((state) => state.authenticated);
  const setLogin = useUserStore((state) => state.setLogin);
  const logout = useUserStore((state) => state.logout);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

   useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getMeApi();
        console.log("response me", response);
        setLogin(response.data?.result);
      } catch (error) {
        console.error("Error checking auth:", error);
        logout();
        clearSeekerInfo();
      } finally {
        setIsCheckingToken(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <>
      {isCheckingToken ? (
        <div>....Loading</div>
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
