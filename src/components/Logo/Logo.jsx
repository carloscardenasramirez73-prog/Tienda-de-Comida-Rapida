import { Link } from '../../router'
import { Flame } from '../Icons/Icons'
import './Logo.css'

const Logo = () => (
  <Link to="/" className="logo" aria-label="Brasa! inicio">
    <Flame size={22} />
    <span>BRASA!</span>
  </Link>
)

export default Logo
