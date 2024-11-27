import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/user/SignIn';
import Profile from './pages/user/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import {useDispatch} from 'react-redux';
import {checkAuth} from './features/userSlice';
import {useEffect} from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(checkAuth()); // Verifies if the session is active using the refresh token
  }, [dispatch]);
  
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          {/*<Route path="/register" element={<Register />} />*/}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
