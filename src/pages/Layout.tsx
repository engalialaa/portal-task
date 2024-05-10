import { Outlet } from "react-router-dom";
import { UseLogout } from "../services/auth";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export const Layout = () => {
  const [userInfo, setUserInfo] = useState<any>(
    localStorage.getItem("_user_info")
  );
  const { mutateAsync } = UseLogout();
  return (
    <div className="h-[100vh] bg-gray-100 py-14 ">
      {userInfo && <button onClick={() => mutateAsync()}>Logout</button>}
      <Outlet />
      <Toaster position="top-center" />
    </div>
  );
};
