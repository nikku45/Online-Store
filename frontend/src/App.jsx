import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import HomePage from './Pages/HomePage.jsx'
import ProductPage from './Pages/ProductPage.jsx'





function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  )
}

export default App
