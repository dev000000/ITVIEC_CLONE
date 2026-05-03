import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutEmployer.scss";
import Header from "../../components/Header";

import FooterComp from "../../components/Footer";
const { Content } = Layout;

function LayoutEmployer() {
  return (
    <>
      <Layout className="layout-default">
        <Header type="employer"/>
        <Content className="content">
          <Outlet />
        </Content>
        <FooterComp/>
      </Layout>
    </>
  );
}
export default LayoutEmployer;
