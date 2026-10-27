import { useState } from 'react';
import { ArrowRight, Check, Clock, Message, Pin } from '../Icons/Icons';
import { TEMPLATE_CONTACTO, correoConectado, enviarCorreo } from '../../services/correo';
import './Contacto.css';

/*
 * El envío real vive en src/services/correo.js (EmailJS).
 * Variables de la plantilla de contacto: {{nombre}}, {{email}}, {{celular}}, {{mensaje}}
 */
const conectado = correoConectado(TEMPLATE_CONTACTO);

const VACIO = { nombre: '', email: '', celular: '', mensaje: '', empresa: '' };

const Contacto = () => {
  const [formulario, setFormulario] = useState(VACIO);
  const [cargando, setCargando] = useState(false);
  const [estado, setEstado] = useState(null); // null | 'ok' | 'error'

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    if (estado) setEstado(null);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargando(true);
    setEstado(null);

    try {
      // "empresa" es un campo oculto trampa para bots: si viene lleno, no se envía
      if (!formulario.empresa) {
        await enviarCorreo(TEMPLATE_CONTACTO, {
          nombre: formulario.nombre,
          email: formulario.email,
          celular: formulario.celular || 'No indicado',
          mensaje: formulario.mensaje
        });
      }
      setEstado('ok');
      setFormulario(VACIO);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setEstado('error');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section id="contacto" className="container page contacto">
      <header className="page-head">
        <span className="eyebrow">CONTACTO</span>
        <h1>Hablemos.</h1>
        <p>Cuéntanos tu duda, una sugerencia o si quieres pedir para un evento. Te respondemos pronto.</p>
      </header>

      <div className="contacto__grid">
        <div className="contacto__info">
          <h2>¿Prefieres escribirnos directo?</h2>
          <p>Para pedidos en curso, el WhatsApp es lo más rápido.</p>
          <ul>
            <li>
              <span className="contacto__icon"><Message size={18} /></span>
              <div>
                <small>WhatsApp</small>
                <a href="https://wa.me/51987654321" target="_blank" rel="noreferrer">+51 987 654 321</a>
              </div>
            </li>
            <li>
              <span className="contacto__icon"><Clock size={18} /></span>
              <div>
                <small>Horario</small>
                <b>Lunes a domingo · 12:00 a 23:00</b>
              </div>
            </li>
            <li>
              <span className="contacto__icon"><Pin size={18} /></span>
              <div>
                <small>Delivery</small>
                <b>Miraflores, Lima</b>
              </div>
            </li>
          </ul>
        </div>

        <form className="panel panel--pad contacto__form" onSubmit={manejarEnvio}>
          <label className="contacto__field">
            <span>Nombre y apellido</span>
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ana Torres"
              autoComplete="name"
              required
              disabled={cargando}
            />
          </label>

          <div className="contacto__row">
            <label className="contacto__field">
              <span>Correo</span>
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={manejarCambio}
                placeholder="tu@correo.com"
                autoComplete="email"
                required
                disabled={cargando}
              />
            </label>
            <label className="contacto__field">
              <span>Celular (opcional)</span>
              <input
                type="tel"
                name="celular"
                value={formulario.celular}
                onChange={manejarCambio}
                placeholder="987 321 654"
                autoComplete="tel"
                disabled={cargando}
              />
            </label>
          </div>

          <label className="contacto__field">
            <span>Mensaje</span>
            <textarea
              name="mensaje"
              value={formulario.mensaje}
              onChange={manejarCambio}
              placeholder="Cuéntanos en qué te podemos ayudar..."
              rows="5"
              required
              disabled={cargando}
            ></textarea>
          </label>

          {/* Campo trampa anti-spam: los usuarios no lo ven */}
          <input
            className="contacto__trampa"
            type="text"
            name="empresa"
            value={formulario.empresa}
            onChange={manejarCambio}
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />

          <button type="submit" className="btn btn--block btn--lg" disabled={cargando}>
            {cargando ? 'Enviando...' : <>Enviar mensaje <ArrowRight size={16} /></>}
          </button>

          {estado === 'ok' && (
            <p className="contacto__aviso contacto__aviso--ok" role="status">
              <Check size={16} /> ¡Mensaje enviado! Gracias por escribirnos, te responderemos a la brevedad.
            </p>
          )}
          {estado === 'error' && (
            <p className="contacto__aviso contacto__aviso--error" role="alert">
              Hubo un problema al enviar el mensaje. Inténtalo de nuevo en unos minutos.
            </p>
          )}
          {import.meta.env.DEV && !conectado && (
            <small className="contacto__demo">
              Modo demostración: aún no hay correo conectado (revisa el archivo .env).
            </small>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contacto;
