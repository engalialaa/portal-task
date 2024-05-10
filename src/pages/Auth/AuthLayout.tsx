import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthLayout = ({ children }: { children?: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<any>(
    localStorage.getItem("_user_info")
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      const { user } = JSON.parse(userInfo);

      const roles = user?.roles.map((role: any) => role.name);

      if (roles.includes("Admin")) {
        navigate("/dashboard");
        return;
      }
      navigate("/posts");
      return;
    }
    navigate("/");
  }, [navigate, userInfo]);

  return <div className="">{children}</div>;
};
