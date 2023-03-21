import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  if (document.cookie.split("=")[0] === "session") {
    return true;
  } else {
    return false;
  }
};

function ProtectRouters() {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectRouters;
