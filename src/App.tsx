import React, { useState, useEffect }  from 'react';
import Header from './components/organism/Header';
import Home from './components/page/Home';
import Product from './components/page/Product';
import Review from './components/molecule/Review';
import Modal from './components/molecule/Modal';
import { Typography, Box, DialogContent, DialogTitle, Avatar } from '@mui/material';
import {AccountCircleOutlined, EventAvailableOutlined, DomainVerificationOutlined, HistoryOutlined} from '@mui/icons-material';
import CartItem from './components/molecule/CartItem';
import Cart from './components/page/Cart';
import OrderConfirm from './components/page/OrderConfirm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from './components/page/Payment';
import Employee from './components/page/Employee';
import Dashboard from './components/organism/Dashboard';
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() =>{
    const processor = async () => {
        // let response = await fetch(`http://localhost:4000/api/v1/product/admin`, {
        //   headers: {Authorization: `Bearer ${process.env.REACT_APP_ADMIN_TOKEN}`}
        // });
        // let data = await response.json();
        // setProducts(data.products);
    }
    processor();
  }, []);
  const [open, setOpen] = useState(true);

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
            <Route path="/payment" element={<Payment cart={cart}/>} />
            
            <Route path="/products" element={products.length > 0 && <Home products={products}/>} />
            
            <Route path="/cart" element={<Cart
            cart={cart} setCart={setCart}
          />} />
              <Route path="/product/:id" element={<Product
          />} />
            <Route path="/confirm" element={<OrderConfirm/>} />
            <Route path="/" element={<Employee />} />
            {/* <Route path="/" element={
              <Dashboard 
                navList={['Profile', 'Available Orders', 'Accepted Orders', 'History']}
                navIconList={[<AccountCircleOutlined />, <EventAvailableOutlined/>, <DomainVerificationOutlined />, <HistoryOutlined />]}
                mainContentList={
                  [

                  ]
                }
              />
              } /> */}
        </Routes>
    </BrowserRouter>
      {/* <Home products={products}/> */}
      {/* <Product
        productInfo={products[0]}
      /> */}
      {/* { cart.length > 0 && <CartItem 
        cartItem={cart[0]}
      /> } */}
      {/* <Cart cart={cart }/> */}
      {/* <Payment /> */}
    </div>
  );
}

export default App;
