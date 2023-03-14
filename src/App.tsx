import React, { useState, useEffect, useContext }  from 'react';
import Header from './components/organism/Header';
import Home from './components/page/Home';
import Product from './components/page/Product';
import Cart from './components/page/Cart';
import OrderConfirm from './components/page/OrderConfirm';
import {  Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Payment from './components/page/Payment';
import Employee from './components/page/Employee';
import Admin from './components/page/Admin';
import Authentication from './components/organism/Authentication';
import PrivateRoute from './components/molecule/PrivateRoute';
import DefaultLayout from './components/template/DefaultLayout';
import { useCookies } from 'react-cookie';
import { CartState } from './contexts/Cart';
import ForgetPassword from './components/organism/ForgetPassword';
import ResetPassword from './components/organism/ResetPassword';
import User from './components/page/User';
import { UserContext } from './contexts/User';
interface AuthType {
  isAuthenticated: boolean;
  user?: any
}
function App() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
  const [isLoading, setIsLoading] = React.useState(true);
  const [auth, setAuth] = React.useState<AuthType>({isAuthenticated: cookies.token ? true : false}); 
  const userContext = useContext(UserContext);
  const checkAuthentication = () => {
    if(!cookies.token){
      // if(userContext?.user){
      //   // userContext?.setUser(undefined);
      // }
      removeCookie('user');
      navigate('/login');
      setAuth({isAuthenticated: false});
    } else {
      // userContext?.setUser(JSON.parse(cookies?.user));
      setAuth({ isAuthenticated: true });
    }
  };
  useEffect(() =>{
    checkAuthentication();
  }, [cookies.token]);

  return (
    <div className="App">
      {/* <Header /> */}
        <CartState>
            <Routes>
              <Route element={<PrivateRoute isAuthenticated={auth.isAuthenticated}/>}>
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="product">
                        <Route path=":id" element={<Product />} />
                    </Route>
                    <Route path="payment" element={<Payment />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="confirm" element={<OrderConfirm/>} />
                </Route>
                <Route path='dashboard' element={
                       (cookies?.user?.role === 'employee' && <Employee />) || 
                       (cookies?.user?.role === 'admin' && <Admin />) ||
                       (cookies?.user?.role === 'user' && <User />)
                    } />
              </Route>
              <Route path="login" element={<Authentication />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="reset-password/:id" element={<ResetPassword />} />
            </Routes>
        </CartState>
    </div>
  );
}

export default App;