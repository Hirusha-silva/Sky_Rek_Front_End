import './App.css'
import ProductCard from './components/productCard'

function App() {
  return (
    <>
      <div>
        <ProductCard name="Dell" price="$ 699" url="https://picsum.photos/id/2/200/300" />
        <ProductCard name="Acer" price="$ 899" url="https://picsum.photos/id/3/200/300" />
      </div>
    </>
  )
}

export default App
