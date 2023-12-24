import React, { useState } from 'react';
import { AppstoreOutlined, FileOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import { titleCase } from '../utils/titleCase';
const { Header, Content, Footer, Sider } = Layout;

function getItem(
    label,
    key,
    icon,
    children,
  ) {
    return {
      key,
      icon,
      children,
      label,
    };
}

const DashLayout = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const profile = JSON.parse(localStorage.getItem("auth"));
  const items = [
    getItem('Dashboard', 'dashboard', <AppstoreOutlined />),
    getItem('Trades', 'trades', <AppstoreOutlined />),
    getItem('Holdings', 'holdings', <AppstoreOutlined />),
  ];

  return (
    <Layout>
      <Sider
        style={{height: "100vh", width: "500px"}}
        collapsible 
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: 20}}>
            <img src="upstox-icon.png" style={{width: "50px", margin: 5}} />
            <p style={{color: "white", margin: 5}}>{profile.user_id}</p>
            <p style={{color: "white", margin: 5}}>{titleCase(profile.user_name)}</p>
        </div>
        <Menu onClick={e=> navigate(e.key)} theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>

      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
        </Header> */}
        <Content style={{height: "100vh", overflow: "scroll"}}>
          <Outlet />
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default DashLayout;