import { useState } from 'react'
import { CATEGORIES, PRODUCTS } from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import { ArrowRight, ChevronDown, Chef } from '../../components/Icons/Icons'
import './Menu.css'

const SORTS = {
  recomendados: { label: 'Recomendados', fn: () => 0 },
  asc: { label: 'Precio: menor a mayor', fn: (a, b) => a.price - b.price },
  desc: { label: 'Precio: mayor a menor', fn: (a, b) => b.price - a.price },
}

export default function Menu() {
  const [category, setCategory] = useState('Todos')
  const [sort, setSort] = useState('recomendados')
  const list = PRODUCTS.filter((p) => category === 'Todos' || p.category === category).sort(
    SORTS[sort].fn,
  )
  return (
    <div className="container page">
      <header className="page-head">
        <span className="eyebrow">ELIGE TU COMIDA</span>
        <h1>Comida rápida.</h1>
        <p>Pizzas, pollo, hot dogs, salchipapas, bebidas y más.</p>
      </header>

      <div className="filters">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter ${c === category ? 'is-active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="toolbar">
        <span>
          {list.length} {list.length === 1 ? 'opción' : 'opciones'} ·{' '}
          {category === 'Todos' ? 'comida rápida' : category}
        </span>
        <label className="select">
          Ordenar por: {SORTS[sort].label}
          <ChevronDown size={13} />
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Ordenar por">
            {Object.entries(SORTS).map(([k, s]) => (
              <option key={k} value={k}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid--4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <aside className="notice">
        <Chef size={22} />
        <div>
          <b>Tu comida, con toda la información.</b>
          <p>¿Tienes alguna alergia? Revisa los ingredientes en cada producto y cuéntanos antes de pedir.</p>
        </div>
        <a className="link-red" href="https://wa.me/51987654321" target="_blank" rel="noreferrer">
          Hablemos por WhatsApp <ArrowRight size={14} />
        </a>
      </aside>
    </div>
  )
}
