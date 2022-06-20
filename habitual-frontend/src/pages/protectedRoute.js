import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export function IsUserRedirect({ loggedInPath, children }) {
   const { user } = useAuth();
   const location = useLocation();
   console.log(user) 

   return !user ? children : <Navigate
      to={{ pathname: loggedInPath }}
      state={{ path: location.pathname }}
      replace
   />
}



export function PrivateRoute({ children, loggedInPath, allowedRoles }) {
   const { user } = useAuth()
   const location = useLocation();

   return user?.roles?.find(role => allowedRoles?.includes(role)) 
   ? 
   <Outlet/> 
   : 
   user 
   ? 
   <Navigate 
            to= '/404' 
            state={{ path: location.pathname }} 
            replace />
   : <Navigate
            to="/login"
            state={{ path: location.pathname }}
            replace
   />;
};


 
 
