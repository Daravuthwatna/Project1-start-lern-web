/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FolderOutlined,
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { getImageUrl } from "../Utils/Constant";
import LocalStorage from "../Utils/LocalStorage";
const { Header, Sider, Content } = Layout;

const LayoutDB = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "/dashboard/employee",
      icon: <UserOutlined />,
      label: "Employee",
    },
    {
      key: "/dashboard/customer",
      icon: <TeamOutlined />,
      label: "Customer",
    },
    {
      key: "/dashboard/product",
      icon: <FolderOutlined />,
      label: "Product",
    },
    {
      key: "/dashboard/login",
      icon: <LogoutOutlined />,
      label: "Log Out",
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate(`/dashboard/login`);
    }
  }, []);

  if (!localStorage.getItem("user")) {
    return <></>;
  }

  return (
    <div className="h-100">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          {collapsed ? (
            <h3 className="text-light text-center mt-3">T-S</h3>
          ) : (
            <h3 className="text-light text-center mt-3">T-SALE.COM</h3>
          )}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            onClick={(value) => {
              if (value.key?.includes("login")) {
                localStorage.clear();
              }
              navigate(value.key);
            }}
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="d-flex justify-content-between align-items-center px-3">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <div className="d-flex align-items-center">
                <span className="me-3">
                  {LocalStorage.getUser().FirstName +" "+LocalStorage.getUser().LastName}
                </span>
                <img
                  src={getImageUrl(
                    JSON.parse(localStorage.getItem("user")).Image
                  )}
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default LayoutDB;
