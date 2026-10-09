import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const UserLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      {/* Header cố định ở phía trên */}
      <Header onMenuClick={() => setMobileOpen(true)} />

      <div className="flex min-h-0 flex-1">
        {/* Sidebar bên trái */}
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        {/* Nội dung CRUD bên phải: phủ kín toàn bộ phần còn lại */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
