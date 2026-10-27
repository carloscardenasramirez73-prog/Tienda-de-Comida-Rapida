import { Link, usePath } from '../../router'
import { useCart } from '../../context/CartContext'
import { Bag, ChevronDown, Pin } from '../Icons/Icons'
import Logo from '../Logo/Logo'
import './Navbar.css'

const Navbar = () => {
  const path = usePath()
  const { count } = useCart()
  const inMenu = path.startsWith('/menu') || path.startsWith('/producto')
  const home = path === '/'
  const contacto = path.startsWith('/contacto')
  return (
    <>
      <div className="topbar">
        <strong>RECIÉN HECHO. DIRECTO A TU PUERTA.</strong>
        <span>Todos los días · 12:00 a 23:00</span>
      </div>
      <header className="header">
        <div className="container header__inner">
          <Logo />
          <nav className="nav">
            <Link to="/" className={home ? 'is-active' : ''}>Inicio</Link>
            <Link to="/menu" className={inMenu ? 'is-active' : ''}>Menú</Link>
            <Link to="/contacto" className={contacto ? 'is-active' : ''}>Contacto</Link>
          </nav>
          <div className="header__right">
            <button type="button" className="location">
              <Pin size={16} />
              <span>
                <small>ENTREGAR EN</small>
                <b>Miraflores, Lima</b>
              </span>
              <ChevronDown size={14} />
            </button>
            <Link to="/checkout" className="cart-btn">
              <Bag size={16} />
              <span>Mi carrito</span>
              <em className="cart-btn__count">{count}</em>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
