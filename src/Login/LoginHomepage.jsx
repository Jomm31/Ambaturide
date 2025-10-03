import manDrivingIMG from '../assets/driving-homepage.jpg';
import './LoginHomepage.css';
import HeaderPassenger from '../Passenger-Interface/Header/PassengerHeader'



function LoginHomepage() {
  return (
    <>
    <HeaderPassenger/>
    <div className="app-container">
      <div className="homepage-container">
        <div className="homepage-left">
          <h2>Login in to access your account</h2>
          <div className="button-group">
            <button className="btn rider">Rider</button>
            <button className="btn driver">Driver</button>
          </div>
        </div>

        <div className="homepage-right">
          <img src={manDrivingIMG} alt="Person driving" />
        </div>
      </div>
    </div>

    </>
    
  );
}

export default LoginHomepage;