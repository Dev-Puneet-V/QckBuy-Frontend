import React, { useState, useEffect }  from 'react';
import Header from './components/organism/Header';
import Home from './components/page/Home';
import Product from './components/page/Product';
import Review from './components/molecule/Review';
import Modal from './components/molecule/Modal';
import { Typography, Box, DialogContent, DialogTitle } from '@mui/material';
import {CloseOutlined} from '@mui/icons-material';
import CartItem from './components/molecule/CartItem';
import Cart from './components/page/Cart';
import OrderConfirm from './components/page/OrderConfirm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from './components/page/Payment';
import Employee from './components/page/Employee';
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  console.log(process.env.REACT_APP_ADMIN_TOKEN)
  useEffect(() =>{
    const processor = async () => {
        let response = await fetch(`http://localhost:4000/api/v1/product/admin`, {
          headers: {Authorization: `Bearer ${process.env.REACT_APP_ADMIN_TOKEN}`}
        });
        let data = await response.json();
        setProducts(data.products);
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
            
            <Route path="/" element={products.length > 0 && <Home products={products}/>} />
            
            <Route path="/cart" element={<Cart
            cart={cart} setCart={setCart}
          />} />
              <Route path="/product/:id" element={<Product
          />} />
            <Route path="/confirm" element={<OrderConfirm/>} />
            <Route path="/" element={<Employee />} />
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
