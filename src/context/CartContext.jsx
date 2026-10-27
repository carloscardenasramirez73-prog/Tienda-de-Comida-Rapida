import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { DELIVERY_FEE, getProduct } from '../data/products'

const CartContext = createContext(null)

const read = (storage, key, fallback) => {
  try {
    const raw = storage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
const write = (storage, key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    /* almacenamiento no disponible */
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() =>
    read(localStorage, 'brasa-cart', []).filter((i) => getProduct(i.id)),
  )
  const [order, setOrder] = useState(() => read(sessionStorage, 'brasa-order', null))

  const commit = useCallback((next) => {
    setItems(next)
    write(localStorage, 'brasa-cart', next)
  }, [])

  const add = (id, qty = 1) => {
    const found = items.find((i) => i.id === id)
    commit(
      found
        ? items.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...items, { id, qty }],
    )
  }
  const setQty = (id, qty) =>
    commit(
      qty <= 0
        ? items.filter((i) => i.id !== id)
        : items.map((i) => (i.id === id ? { ...i, qty } : i)),
    )
  const remove = (id) => commit(items.filter((i) => i.id !== id))

  const lines = useMemo(
    () => items.map((i) => ({ ...i, product: getProduct(i.id) })),
    [items],
  )
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0)
  const delivery = count > 0 ? DELIVERY_FEE : 0

  const placeOrder = (customer) => {
    const previous = Number(read(localStorage, 'brasa-order-seq', 1047))
    const seq = previous + 1
    write(localStorage, 'brasa-order-seq', seq)
    const next = {
      id: `BR-${seq}`,
      createdAt: Date.now(),
      customer,
      lines: lines.map((l) => ({ ...l })),
      count,
      subtotal,
      delivery,
      total: subtotal + delivery,
      estado: 'activo', // activo | cancelado
      aviso: 'enviando', // estado del correo a la tienda: enviando | ok | error
    }
    write(sessionStorage, 'brasa-order', next)
    setOrder(next)
    commit([])
    return next
  }

  const actualizarPedido = (id, cambios) =>
    setOrder((prev) => {
      if (!prev || prev.id !== id) return prev
      const next = { ...prev, ...cambios }
      write(sessionStorage, 'brasa-order', next)
      return next
    })

  const value = {
    lines,
    count,
    subtotal,
    delivery,
    total: subtotal + delivery,
    add,
    setQty,
    remove,
    order,
    placeOrder,
    actualizarPedido,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)
