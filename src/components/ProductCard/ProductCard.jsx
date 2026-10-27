import { useState } from 'react'
import { Link } from '../../router'
import { useCart } from '../../context/CartContext'
import { money } from '../../data/products'
import FoodArt from '../FoodArt/FoodArt'
import { Check, Plus } from '../Icons/Icons'
import './ProductCard.css'

export function AddButton({ product }) {
  const { add } = useCart()
  const [done, setDone] = useState(false)
  const onClick = () => {
    add(product.id, 1)
    setDone(true)
    setTimeout(() => setDone(false), 1200)
  }
  return (
    <button type="button" className={`btn btn--sm ${done ? 'is-done' : ''}`} onClick={onClick}>
      {done ? <Check size={14} /> : <Plus size={14} />}
      {done ? 'Listo' : 'Agregar'}
    </button>
  )
}

export default function ProductCard({ product, home = false }) {
  const badge = home ? (product.homeBadge ?? product.badge) : product.badge
  const desc = home ? (product.homeDesc ?? product.desc) : product.desc
  return (
    <article className="card">
      <Link to={`/producto/${product.id}`} className="card__media">
        <FoodArt product={product} />
        <span className="chip-badge">{badge}</span>
      </Link>
      <div className="card__body">
        <h3>
          <Link to={`/producto/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{desc}</p>
        <div className="card__foot">
          <strong>{money(product.price)}</strong>
          <AddButton product={product} />
        </div>
      </div>
    </article>
  )
}
