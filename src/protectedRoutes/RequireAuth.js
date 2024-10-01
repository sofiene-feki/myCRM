import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const RequireAuth = ({ allowedRoles }) => {
  const { user } = useSelector((state) => ({ ...state }));

  

  const location = useLocation();

  return allowedRoles.find((role) => user && user.role.includes(role)) ? (
    <Outlet />
  ) : user && user?.token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
