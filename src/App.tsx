import React, { useState, useEffect }  from 'react';
import Header from './components/organism/Header';
import Home from './components/page/Home';
import Product from './components/page/Product';
import Cart from './components/page/Cart';
import OrderConfirm from './components/page/OrderConfirm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from './components/page/Payment';
import Employee from './components/page/Employee';
import Manager from './components/page/Manager';
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
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
            <Route path="/employee" element={<Employee />} />
            <Route path="/" element={<Manager />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
