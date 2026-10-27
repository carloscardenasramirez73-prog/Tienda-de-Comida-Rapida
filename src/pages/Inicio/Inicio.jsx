import { Link, navigate } from '../../router'
import { useCart } from '../../context/CartContext'
import { COMBO, PRODUCTS, money } from '../../data/products'
import FoodArt from '../../components/FoodArt/FoodArt'
import ProductCard from '../../components/ProductCard/ProductCard'
import { ArrowRight, Beef, Bike, Chef } from '../../components/Icons/Icons'
import './Inicio.css'

const FEATURES = [
  { icon: Bike, title: 'De la plancha a tu puerta', text: 'Delivery en 30–40 min' },
  { icon: Beef, title: 'Sabor sin atajos', text: 'Carne 100% de res' },
  { icon: Chef, title: 'Como debe ser', text: 'Todo se prepara al pedir' },
]

export default function Inicio() {
  const { add } = useCart()
  const favorites = ['pizza-pepperoni', 'salchi-brava', 'maracuya'].map((id) =>
    PRODUCTS.find((p) => p.id === id),
  )
  const buyCombo = () => {
    add(COMBO.id, 1)
    navigate('/checkout')
  }
  return (
    <div className="container page">
      <section className="hero">
        <div className="hero__text">
          <span className="pill">COMBO DE LA SEMANA</span>
          <h1>
            Doble sabor.
            <br />
            Cero excusas.
          </h1>
          <p>Brasa doble + papas clásicas + maracuyá. El trío que le pone sabor a tu semana.</p>
          <div className="hero__price">
            <strong>{money(COMBO.price)}</strong>
            <s>S/ 38.90</s>
          </div>
          <div className="hero__actions">
            <button type="button" className="btn btn--lg" onClick={buyCombo}>
              Quiero mi combo <ArrowRight size={16} />
            </button>
            <Link to="/menu" className="btn btn--light btn--lg">Ver la carta</Link>
          </div>
          <small>Válido de lunes a domingo. Delivery no incluido.</small>
        </div>
        <div className="hero__media">
          <FoodArt kind="hero" alt="Brasa doble con papas y maracuyá" />
          <div className="sticker">
            <span>HECHO</span>
            <b>AL</b>
            <span>MOMENTO</span>
          </div>
        </div>
      </section>

      <ul className="features">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <Icon size={20} />
            <span>
              <b>{title}</b>
              <small>{text}</small>
            </span>
          </li>
        ))}
      </ul>

      <section className="section">
        <span className="eyebrow">COMIDA RÁPIDA PARA TODO EL DÍA</span>
        <h2>Favoritos variados.</h2>
        <Link to="/menu" className="link-red">
          Ver toda la carta <ArrowRight size={14} />
        </Link>
        <div className="grid grid--3">
          {favorites.map((p) => (
            <ProductCard key={p.id} product={p} home />
          ))}
        </div>
      </section>
    </div>
  )
}
