// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("token"); // or useContext(AuthContext)

  if (!isLoggedIn) {
    toast.error("Please login first!");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
