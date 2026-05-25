import { DashboardOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";

interface MenuSiderProps {
  styles?: CSSProperties;
}

function MenuSider({ styles }: MenuSiderProps) {
  const items = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to="dashboard">DashBoard</Link>,
    },
    {
      key: '2',
      icon: <DashboardOutlined />,
      label: <Link to="post-job">PostJob</Link>,
    },
    {
      key: '3',
      icon: <DashboardOutlined />,
      label: <Link to="/">DashBoard</Link>,
    },
    {
      key: '4',
      icon: <DashboardOutlined />,
      label: <Link to="/">DashBoard</Link>,
    }
  ]
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} items={items} theme="dark" style={styles} />
  )
}

export default MenuSider