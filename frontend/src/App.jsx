import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import Navbar from './Components/Navbar.jsx'
import HomePage from './Pages/HomePage.jsx'
import ProductPage from './Pages/ProductPage.jsx'
import LoginPage from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Cart from './Pages/Cart.jsx'
import Checkout from './Pages/CheckOut.jsx'
import Order from './Pages/Order.jsx'



function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <Cart open={isCartOpen} setOpen={setIsCartOpen} />
      
      <div className='pt-16'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path='/orders' element={<Order/>} />
      </Routes>
      </div>
      
    </Router>
  );
}

export default App
