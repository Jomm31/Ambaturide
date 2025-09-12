import Logo from '../public/ambaturideLOGO.jpg'

function Header(){

    return(
        <header>
            <img src={Logo} alt="Ambaturide Logo" className="logo"/>
            <nav>
                <ul>
                    <li><a href="">Book a Ride</a></li>
                    <li><a href="">Solutions</a></li>
                    <li><a href="">Community</a></li>
                    <li><a href="">Resources </a></li>
                    <li><a href="">Contact Us</a></li>
                </ul>

                <button>LOG IN</button>
                <button>Register</button>
            </nav>
        </header>
    )
}

export default Header