import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/user/SignIn';
import Profile from './pages/user/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
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
