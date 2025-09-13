import Logo from '../public/ambaturideLOGO.jpg'
import './Header.css'


function Header() {
  return (
    <header>
      <div className="logo-container">
        <img src={Logo} alt="Ambaturide Logo" className="logo" />
        <h1 className="brand"><span>Ambatu</span>RIDE</h1>
      </div>

      <nav>
        <ul>
          <li><a href="">Book a Ride</a></li>
          <li><a href="">Solutions</a></li>
          <li><a href="">Community</a></li>
          <li><a href="">Resources</a></li>
        </ul>
        <div className="auth-buttons">
          <button className="login">LOG-IN</button>
          <button className="register">REGISTER</button>
        </div>
      </nav>
    </header>
  )
}

export default Header