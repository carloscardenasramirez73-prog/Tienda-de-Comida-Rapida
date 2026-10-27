import Logo from '../Logo/Logo'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Logo />
            <p className="footer__slogan">Mucho sabor. Cero vueltas.</p>
          </div>
          <div className="footer__col">
            <b>El antojo no tiene día libre.</b>
            <span>Lunes a domingo · 12:00 a 23:00</span>
          </div>
          <div className="footer__col footer__col--right">
            <b>¿Te ayudamos con tu pedido?</b>
            <span>WhatsApp · +51 987 654 321</span>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Brasa! · Hecho con hambre de hacer bien.</span>
          <span className="footer__links">
            <a href="#/">Términos y condiciones</a>
            <a href="#/">Privacidad</a>
            <a href="#/">Libro de reclamaciones</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
