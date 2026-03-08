import { useState } from 'react'
import './App.css'
import ProductCard from './components/productCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <ProductCard />
      </div>
    </>
  )
}

export default App
