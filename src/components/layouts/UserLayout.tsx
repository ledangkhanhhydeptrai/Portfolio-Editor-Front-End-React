import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const UserLayout: React.FC = () => {
  return (
    <div className="">
      {/* Header luôn trên cùng */}
      <Header />

      {/* Nội dung chính flex-1 để chiếm không gian còn lại */}
      <main className="">
        <Outlet />
      </main>

      {/* Footer luôn ở dưới cùng */}
      <div className="-mb-20">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;