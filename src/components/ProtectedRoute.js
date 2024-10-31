import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useSelector((state) => state.auth);
  return accessToken ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
