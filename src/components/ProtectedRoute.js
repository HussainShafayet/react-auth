import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useSelector((state) => state.auth);

  return authenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
