import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  return document.cookie.split("=")[0] === "session";
};

function ProtectRouters() {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectRouters;
