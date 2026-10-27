/*
 * Envío de correos con EmailJS (https://www.emailjs.com) usando su API web.
 * Las claves se leen de .env (en local) o de las Environment Variables (en Vercel).
 *
 *   VITE_EMAILJS_SERVICE_ID          servicio de Gmail
 *   VITE_EMAILJS_PUBLIC_KEY          clave pública
 *   VITE_EMAILJS_TEMPLATE_ID         plantilla del formulario de Contacto
 *   VITE_EMAILJS_TEMPLATE_PEDIDO_ID  plantilla de pedidos (nuevo / cancelado)
 */
const ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const TEMPLATE_CONTACTO = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
export const TEMPLATE_PEDIDO = import.meta.env.VITE_EMAILJS_TEMPLATE_PEDIDO_ID

export const correoConectado = (templateId) =>
  Boolean(SERVICE_ID && PUBLIC_KEY && templateId)

export const enviarCorreo = async (templateId, templateParams) => {
  if (!correoConectado(templateId)) {
    // En producción nunca se simula: así no se pierden mensajes sin enterarte
    if (!import.meta.env.DEV) {
      throw new Error('Faltan las claves de EmailJS en el despliegue')
    }
    console.warn('Correo: faltan claves de EmailJS en .env. Envío simulado.', templateParams)
    await new Promise((resolve) => setTimeout(resolve, 800))
    return
  }

  const respuesta = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: templateId,
      user_id: PUBLIC_KEY,
      template_params: templateParams,
    }),
  })
  if (!respuesta.ok) throw new Error(await respuesta.text())
}

const soles = (n) => `S/ ${n.toFixed(2)}`
const fechaHora = () =>
  new Date().toLocaleString('es-PE', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
    timeZone: 'America/Lima',
  })

/* Correo del pedido. tipo: 'nuevo' | 'cancelado' */
export const enviarPedido = (pedido, tipo = 'nuevo') =>
  enviarCorreo(TEMPLATE_PEDIDO, {
    tipo: tipo === 'cancelado' ? 'PEDIDO CANCELADO' : 'NUEVO PEDIDO',
    pedido_id: pedido.id,
    hora: fechaHora(),
    cliente_nombre: pedido.customer.name,
    celular: pedido.customer.phone,
    direccion: pedido.customer.address,
    departamento: pedido.customer.apt || '—',
    referencia: pedido.customer.ref || '—',
    detalle: pedido.lines
      .map((l) => `${l.qty} × ${l.product.name} — ${soles(l.qty * l.product.price)}`)
      .join('\n'),
    subtotal: soles(pedido.subtotal),
    delivery: soles(pedido.delivery),
    total: soles(pedido.total),
    pago: 'Efectivo al recibir',
  })
