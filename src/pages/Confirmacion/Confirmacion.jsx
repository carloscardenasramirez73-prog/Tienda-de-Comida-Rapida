import { useEffect, useState } from 'react'
import { Link } from '../../router'
import { useCart } from '../../context/CartContext'
import { money } from '../../data/products'
import { enviarPedido } from '../../services/correo'
import FoodArt from '../../components/FoodArt/FoodArt'
import { ArrowRight, Bike, Check, Chef, Flame, Utensils, X } from '../../components/Icons/Icons'
import './Confirmacion.css'

const pad = (n) => String(n).padStart(2, '0')
const hhmm = (ts) => {
  const d = new Date(ts)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const STEPS = [
  { label: 'Confirmado', icon: Check },
  { label: 'En preparación', icon: Flame },
  { label: 'En camino', icon: Bike },
  { label: '¡A disfrutar!', icon: Utensils },
]
const HEADLINES = [
  ['Tu pedido está en preparación', 'Todo se está preparando al momento, como te gusta.'],
  ['Tu pedido está en preparación', 'Todo se está preparando al momento, como te gusta.'],
  ['Tu pedido va en camino', 'Nuestro repartidor ya salió rumbo a tu puerta.'],
  ['¡A disfrutar!', 'Tu pedido ya llegó. Buen provecho.'],
]

export default function Confirmacion() {
  const { order, actualizarPedido } = useCart()
  const [now, setNow] = useState(() => Date.now())
  const [cancelar, setCancelar] = useState('inicio') // inicio | confirmar | enviando | error

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  if (!order) {
    return (
      <div className="container page empty">
        <h1>Aún no tienes un pedido.</h1>
        <p>Cuando confirmes uno, lo verás aquí.</p>
        <Link to="/menu" className="btn btn--lg">Ver la carta <ArrowRight size={16} /></Link>
      </div>
    )
  }

  // Seguimiento simulado: avanza solo con el tiempo
  const elapsed = (now - order.createdAt) / 1000
  const stage = elapsed < 45 ? 1 : elapsed < 90 ? 2 : 3
  const [title, text] = HEADLINES[stage]
  const first = order.customer.name.trim().split(/\s+/)[0]
  const cancelado = order.estado === 'cancelado'
  const puedeCancelar = !cancelado && stage < 2

  const confirmarCancelacion = async () => {
    setCancelar('enviando')
    try {
      await enviarPedido(order, 'cancelado')
      actualizarPedido(order.id, { estado: 'cancelado' })
    } catch (error) {
      console.error('Error al cancelar el pedido por correo:', error)
      setCancelar('error')
    }
  }

  const eta = `${hhmm(order.createdAt + 30 * 60000)} – ${hhmm(order.createdAt + 40 * 60000)}`

  return (
    <div className="container page confirm">
      <div className={`confirm__badge ${cancelado ? 'confirm__badge--cancel' : ''}`}>
        {cancelado ? <X size={26} /> : <Check size={26} />}
      </div>
      <h1>{cancelado ? 'Pedido cancelado' : '¡Pedido confirmado!'}</h1>
      <p className="confirm__thanks">
        {cancelado
          ? `Listo, ${first}. Avisamos a la tienda que cancelaste tu pedido.`
          : `Gracias, ${first}. Ya encendimos la plancha para ti.`}
      </p>
      <p className="confirm__id">
        <span>PEDIDO #{order.id}</span> · Hoy, {hhmm(order.createdAt)}
      </p>

      {!cancelado && order.aviso === 'enviando' && (
        <p className="confirm__aviso" role="status">Avisando a la tienda…</p>
      )}
      {!cancelado && order.aviso === 'ok' && (
        <p className="confirm__aviso confirm__aviso--ok" role="status">
          <Check size={14} /> La tienda ya recibió tu pedido.
        </p>
      )}
      {!cancelado && order.aviso === 'error' && (
        <p className="confirm__aviso confirm__aviso--error" role="alert">
          No pudimos avisar a la tienda automáticamente. Escríbenos por{' '}
          <a href="https://wa.me/51987654321" target="_blank" rel="noreferrer">WhatsApp</a>{' '}
          con tu número de pedido (#{order.id}).
        </p>
      )}

      <section className="panel panel--pad confirm__card">
        <h2>Esto va camino a tu mesa</h2>
        <ul className="lines lines--plain">
          {order.lines.map(({ id, qty, product }) => (
            <li key={id}>
              <div className="lines__thumb lines__thumb--sm"><FoodArt product={product} /></div>
              <div className="lines__info">
                <b>{qty} × {product.name}</b>
                <small>{money(product.price)} por unidad</small>
              </div>
              <span className="lines__total">{money(qty * product.price)}</span>
            </li>
          ))}
        </ul>
        <dl className="confirm__sums">
          <div><dt>Subtotal · {order.count} {order.count === 1 ? 'producto' : 'productos'}</dt><dd>{money(order.subtotal)}</dd></div>
          <div><dt>Delivery</dt><dd>{money(order.delivery)}</dd></div>
        </dl>
        <div className="summary__total">
          <span>Total</span>
          <strong>{money(order.total)}</strong>
        </div>
      </section>

      {cancelado ? (
        <section className="tracker tracker--cancel">
          <h2><X size={18} /> Tu pedido fue cancelado</h2>
          <p>Si fue un error, escríbenos por WhatsApp o vuelve a pedir desde la carta.</p>
          <Link to="/menu" className="btn btn--lg">Ver la carta <ArrowRight size={16} /></Link>
        </section>
      ) : (
        <section className="tracker">
          <div className="tracker__head">
            <div>
              <h2><Chef size={18} /> {title}</h2>
              <p>{text}</p>
            </div>
            <div className="tracker__eta">
              <small>LLEGADA ESTIMADA</small>
              <strong>{eta}</strong>
            </div>
          </div>
          <ol className="steps">
            {STEPS.map(({ label, icon: Icon }, i) => (
              <li key={label} className={`${i <= stage ? 'is-done' : ''} ${i < stage ? 'is-linked' : ''}`}>
                <span className="steps__dot"><Icon size={14} /></span>
                <span>{label}</span>
              </li>
            ))}
          </ol>
          <small className="tracker__note">Seguimiento simulado · Tiempo estimado de entrega: 30–40 min</small>
        </section>
      )}

      {puedeCancelar && (
        <div className="confirm__cancel">
          {cancelar === 'inicio' && (
            <button type="button" className="btn-ghost" onClick={() => setCancelar('confirmar')}>
              Cancelar pedido
            </button>
          )}
          {cancelar !== 'inicio' && (
            <div className="confirm__cancel-box" role="alertdialog">
              <b>¿Seguro que quieres cancelar el pedido #{order.id}?</b>
              <div>
                <button type="button" className="btn btn--sm" disabled={cancelar === 'enviando'} onClick={confirmarCancelacion}>
                  {cancelar === 'enviando' ? 'Cancelando…' : 'Sí, cancelar pedido'}
                </button>
                <button type="button" className="btn-ghost" disabled={cancelar === 'enviando'} onClick={() => setCancelar('inicio')}>
                  No, seguir
                </button>
              </div>
              {cancelar === 'error' && (
                <p className="confirm__aviso confirm__aviso--error" role="alert">
                  No pudimos cancelar automáticamente. Avísanos por{' '}
                  <a href="https://wa.me/51987654321" target="_blank" rel="noreferrer">WhatsApp</a>.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
