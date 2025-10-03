import './DriverHeader.css';
import darkLogo from '../../assets/ambaturide-dark-logo.png';

function DashboardHeader() {    
  return (
    <header>
      <div className="logo-container">
        <img src={darkLogo} alt="Ambaturide Logo" className="logo" />
        <h1 className="brand">AmbatuRIDE</h1>
      </div>
    </header>
  );
}

export default DashboardHeader;
