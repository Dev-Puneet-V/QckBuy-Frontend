import React, { useState, useEffect }  from 'react';
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
interface AuthType {
  isAuthenticated: boolean;
  user?: any
}
function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cookies] = useCookies(['token']);
  const [isLoading, setIsLoading] = React.useState(true);
  const [auth, setAuth] = React.useState<AuthType>({isAuthenticated: cookies.token ? true : false}); 
  const checkAuthentication = () => {
    if(!cookies.token){
      navigate('/login');
      setAuth({isAuthenticated: false});
    } else {
      setAuth({ isAuthenticated: true });
    }
  };
  useEffect(() =>{
    checkAuthentication();
  }, [cookies.token]);

  return (
    <div className="App">
      {/* <Header /> */}
        <Routes>
        <Route element={<PrivateRoute isAuthenticated={auth.isAuthenticated}/>}>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="product">
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path="payment" element={<Payment cart={cart}/>} />
            <Route path="cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="confirm" element={<OrderConfirm/>} />
            <Route path='dashboard'>
              <Route path="employee" element={<Employee />} />
              <Route path="admin" element={<Admin />} />
          </Route>
          </Route>
        </Route>
        <Route path="login" element={<Authentication />} />
        </Routes>
    </div>
  );
}

export default App;
