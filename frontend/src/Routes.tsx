
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import LoginScreen from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';


const AppRoutes = () => {
  return (
   
      <Router>
        <Routes>
        <Route
        path="/admin"
        element={<PrivateRoute><AdminDashboard /> </PrivateRoute>}
      />
      <Route
        path="/"
        element={<PrivateRoute> <Home /> </PrivateRoute>}
      />
      <Route path="/login" element={<LoginScreen />} />
      </Routes>
      </Router>
  );
};

export default AppRoutes;