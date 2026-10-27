import { useState } from 'react'
import { Link, navigate } from '../../router'
import { useCart } from '../../context/CartContext'
import { money } from '../../data/products'
import { enviarPedido } from '../../services/correo'
import FoodArt from '../../components/FoodArt/FoodArt'
import { ArrowLeft, ArrowRight, Bike, Cash, Minus, Pin, Plus, Shield, Trash } from '../../components/Icons/Icons'
import './Checkout.css'

const FIELDS = {
  name: { label: 'Nombre y apellido', placeholder: 'Ana Torres' },
  phone: { label: 'Celular', placeholder: '987 321 654' },
  address: { label: 'Dirección de entrega', placeholder: 'Av. José Larco 123, Miraflores, Lima', wide: true },
  apt: { label: 'Departamento / piso', placeholder: 'Departamento 402' },
  ref: { label: 'Referencia', placeholder: 'Frente al parque' },
}

export default function Checkout() {
  const { lines, count, subtotal, delivery, total, setQty, remove, placeOrder, actualizarPedido } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', address: '', apt: '', ref: '' })
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value })
    if (errors[k]) setErrors({ ...errors, [k]: false })
  }

  const confirm = () => {
    const next = {
      name: form.name.trim().length < 2,
      phone: form.phone.replace(/\D/g, '').length < 7,
      address: form.address.trim().length < 5,
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return
    const pedido = placeOrder(form)
    navigate('/confirmacion')
    // El correo a la tienda se envía en segundo plano; la pantalla de confirmación muestra el resultado
    enviarPedido(pedido, 'nuevo')
      .then(() => actualizarPedido(pedido.id, { aviso: 'ok' }))
      .catch((error) => {
        console.error('Error al enviar el pedido por correo:', error)
        actualizarPedido(pedido.id, { aviso: 'error' })
      })
  }

  if (count === 0) {
    return (
      <div className="container page empty">
        <h1>Tu carrito está vacío.</h1>
        <p>Elige algo rico de la carta y vuelve para pedir.</p>
        <Link to="/menu" className="btn btn--lg">Ver la carta <ArrowRight size={16} /></Link>
      </div>
    )
  }

  return (
    <div className="container page">
      <header className="page-head page-head--row">
        <div>
          <h1>Un paso más y a comer.</h1>
          <p>Revisa tu carrito y dinos dónde llevamos el sabor.</p>
        </div>
        <Link to="/menu" className="link-red">
          <ArrowLeft size={14} /> Seguir comprando
        </Link>
      </header>

      <div className="checkout">
        <div className="checkout__main">
          <section className="panel">
            <div className="panel__head">
              <h2>Tu carrito</h2>
              <span>{count} {count === 1 ? 'producto' : 'productos'}</span>
            </div>
            <ul className="lines">
              {lines.map(({ id, qty, product }) => (
                <li key={id}>
                  <div className="lines__thumb"><FoodArt product={product} /></div>
                  <div className="lines__info">
                    <b>{product.name}</b>
                    <small>{money(product.price)} por unidad</small>
                    {product.note && <small>{product.note}</small>}
                  </div>
                  <div className="stepper">
                    <button type="button" onClick={() => setQty(id, qty - 1)} aria-label="Quitar uno"><Minus size={12} /></button>
                    <span>{qty}</span>
                    <button type="button" onClick={() => setQty(id, qty + 1)} aria-label="Agregar uno"><Plus size={12} /></button>
                  </div>
                  <span className="lines__total">{money(qty * product.price)}</span>
                  <button type="button" className="icon-btn" onClick={() => remove(id)} aria-label={`Eliminar ${product.name}`}>
                    <Trash size={15} />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel panel--pad">
            <h2 className="panel__title"><Pin size={18} /> ¿Dónde lo entregamos?</h2>
            <div className="form">
              {Object.entries(FIELDS).map(([k, f]) => (
                <label key={k} className={`field ${f.wide ? 'field--wide' : ''} ${errors[k] ? 'has-error' : ''}`}>
                  <span>{f.label}</span>
                  <input
                    value={form[k]}
                    onChange={set(k)}
                    placeholder={f.placeholder}
                    inputMode={k === 'phone' ? 'tel' : undefined}
                    autoComplete={k === 'name' ? 'name' : k === 'phone' ? 'tel' : k === 'address' ? 'street-address' : 'off'}
                  />
                  {errors[k] && <em>Revisa este dato</em>}
                </label>
              ))}
            </div>
          </section>

          <section className="panel pay">
            <span className="radio is-on" />
            <Cash size={20} />
            <div>
              <b>Efectivo al recibir</b>
              <small>Paga cuando tu pedido llegue a la puerta.</small>
            </div>
            <span className="pay__tag">Seleccionado</span>
          </section>
        </div>

        <aside className="panel panel--pad summary">
          <h2>Resumen del pedido</h2>
          <div className="delivery-box">
            <Bike size={20} />
            <div>
              <b>Delivery a Miraflores</b>
              <small>En tu puerta en 30–40 min</small>
            </div>
          </div>
          <dl>
            <div><dt>Subtotal · {count} {count === 1 ? 'producto' : 'productos'}</dt><dd>{money(subtotal)}</dd></div>
            <div><dt>Delivery</dt><dd>{money(delivery)}</dd></div>
          </dl>
          <div className="summary__total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>
          <small className="summary__note">Precios en soles. Todos los impuestos incluidos.</small>
          <button type="button" className="btn btn--block btn--lg" onClick={confirm}>
            Confirmar Pedido <ArrowRight size={16} />
          </button>
          <small className="summary__legal">
            Al confirmar, aceptas nuestros términos y condiciones y la política de privacidad.
          </small>
          <small className="summary__safe"><Shield size={14} /> Tus datos están en buenas manos.</small>
        </aside>
      </div>
    </div>
  )
}
