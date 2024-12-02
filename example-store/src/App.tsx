import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router"
import { Checkout, Storefront } from './pages'
import { Navbar } from './components'

function App() {
  const [cart, setCart] = useState<any>([]);

  const addToCart = (product: any) => setCart((prevCart: any) => [...prevCart, product]);

  return (
    <div
      className="w-screen h-screen flex flex-col"
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Storefront addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
