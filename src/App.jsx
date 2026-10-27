import { useEffect } from 'react'
import { usePath } from './router'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Contacto from './components/Contacto/Contacto'
import Inicio from './pages/Inicio/Inicio'
import Menu from './pages/Menu/Menu'
import Producto from './pages/Producto/Producto'
import Checkout from './pages/Checkout/Checkout'
import Confirmacion from './pages/Confirmacion/Confirmacion'

function Rutas() {
  const path = usePath()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  if (path.startsWith('/producto/')) {
    const id = decodeURIComponent(path.split('/')[2] ?? '')
    return <Producto key={id} id={id} />
  }
  if (path.startsWith('/menu')) return <Menu />
  if (path.startsWith('/checkout')) return <Checkout />
  if (path.startsWith('/confirmacion')) return <Confirmacion />
  if (path.startsWith('/contacto')) return <Contacto />
  return <Inicio />
}

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Navbar />
        <main>
          <Rutas />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
