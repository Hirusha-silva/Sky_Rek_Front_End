import './App.css'
import ProductCard from './components/productCard'
import Superproduct from './components/superProduct'

function App() {
  return (
    <>
      <div>
        <Superproduct/>
        <ProductCard name="Dell" price="$ 699" url="https://picsum.photos/id/2/200/300" />
        <ProductCard name="Acer" price="$ 899" url="https://picsum.photos/id/3/200/300" />
      </div>
    </>
  )
}

export default App
