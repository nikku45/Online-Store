import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import HomePage from './Pages/HomePage.jsx'
import ProductPage from './Pages/ProductPage.jsx'
import LoginPage from './Pages/Login.jsx'
import Cart from './Pages/Cart.jsx'
import Navbar from './Components/Navbar.jsx'



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
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} /> {/* optional full page */}
      </Routes>
      </div>
      
    </Router>
  );
}

export default App
