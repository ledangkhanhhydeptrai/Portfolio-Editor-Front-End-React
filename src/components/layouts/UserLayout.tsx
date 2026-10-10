import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const UserLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar bên trái: cao full màn hình, logo nằm trên cùng */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Cột bên phải: Header ở trên, nội dung bên dưới */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen(true)} />

        {/* Nội dung CRUD: phủ kín toàn bộ phần còn lại */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;