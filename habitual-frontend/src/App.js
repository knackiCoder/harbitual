import React from 'react'
import Login from './pages/login';
import Register from './pages/register';
import ForgetPassword from './pages/forgetPassword';
import * as ROUTES from "./constants/routes"
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Verify from './pages/verify';
import { PrivateRoute } from './pages/protectedRoute';
import Home from './pages/home';
import Logout from './pages/logout';
import LoginConfirmation from './pages/confirmLogin';
import Admin from './pages/admin';
import PersistLogin from './pages/persistLogin';
import { Layout } from './pages/layout';
import ErrorPage from './pages/404';

function App() {
  return (
    <Router>
       <Routes>
         <Route path="/" element={<Layout />}>
          {/* Protected Route */}
          
            <Route element={<PrivateRoute allowedRoles={['Admin', 'User']}/>}>
              <Route path={ROUTES.HOME} element={<Home />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
              <Route path={ROUTES.ADMIN} element={<Admin />} />
            </Route>
          

          {/* Public routes */}
            <Route path={ROUTES.SIGN_IN} element={<Login />} />

            <Route path={ROUTES.SIGN_UP} element={<Register />} />

            <Route path={ROUTES.FORGET_PASSWORD} element={<ForgetPassword />} />
            <Route path={ROUTES.VERIFY_EMAIL} element={<Verify />} />
            <Route path={ROUTES.LOGOUT} element={<Logout />} />
            <Route path={ROUTES.VERIFY_LOGIN} element={<LoginConfirmation />} />
            <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;


