import React from 'react';
import {Outlet, useNavigate } from 'react-router-dom';
interface PrivateRouteProps {
  isAuthenticated: boolean;
}

function ProtectedRoute({ isAuthenticated }: PrivateRouteProps) {
  const navigate = useNavigate();
  React.useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, []);
  return (<>
    {
      isAuthenticated && <Outlet />
    }
  </>)
}

export default ProtectedRoute;