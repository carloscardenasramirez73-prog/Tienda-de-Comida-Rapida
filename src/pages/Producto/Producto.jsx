import { useState } from 'react'
import { Link, navigate } from '../../router'
import { useCart } from '../../context/CartContext'
import { getProduct, money } from '../../data/products'
import FoodArt from '../../components/FoodArt/FoodArt'
import { Bag, Minus, Plus } from '../../components/Icons/Icons'
import './Producto.css'

export default function Producto({ id }) {
  const product = getProduct(id)
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="container page empty">
        <h1>No encontramos ese plato.</h1>
        <Link to="/menu" className="btn">Volver a la carta</Link>
      </div>
    )
  }
  const total = product.price * qty
  const addToCart = () => {
    add(product.id, qty)
    navigate('/checkout')
  }
  return (
    <div className="container page">
      <nav className="crumbs" aria-label="Migas de pan">
        <Link to="/">Inicio</Link> · <Link to="/menu">Menú</Link> · <b>{product.name}</b>
      </nav>
      <div className="detail">
        <div className="detail__media">
          <FoodArt product={product} />
        </div>
        <div className="detail__info">
          <span className="eyebrow">{product.category.toUpperCase()}</span>
          <h1>{product.name}</h1>
          <p className="detail__desc">{product.long}</p>
          <div className="detail__price">
            <strong>{money(product.price)}</strong> <small>por unidad</small>
          </div>
          <div className="detail__qty">
            <div>
              <span className="label">Cantidad</span>
              <div className="stepper stepper--lg">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Quitar uno">
                  <Minus size={14} />
                </button>
                <span>{qty}</span>
                <button type="button" className="is-plus" onClick={() => setQty(Math.min(20, qty + 1))} aria-label="Agregar uno">
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="detail__subtotal">
              <small>Subtotal · {qty} {qty === 1 ? 'unidad' : 'unidades'}</small>
              <strong>{money(total)}</strong>
            </div>
          </div>
          <button type="button" className="btn btn--block btn--lg" onClick={addToCart}>
            Agregar al carrito · {money(total)} <Bag size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
