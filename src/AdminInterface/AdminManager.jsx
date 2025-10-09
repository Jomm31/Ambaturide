import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminManager() {
    useEffect(() => {
    import ('./Admin.css');
    
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

    const navigate = useNavigate();

    return (
        <>
            <div className='card'>
                <ul>
                    <li onClick={() => navigate('/Admin')}>Users List</li>
                    <li onClick={() => navigate('/Admin')}>Drivers List</li>
                    <li onClick={() => navigate('/Admin')}>Riders List</li>
                    <li onClick={() => navigate('/Admin')}>Transactions List</li>
                    <li onClick={() => navigate('/Admin')}>Reports List</li>
                    <li onClick={() => navigate('/Admin')}>Bookings List</li>
                    <li onClick={() => navigate('/')}>Exit</li>
                    </ul>
            </div>
        </>
    )
}

export default AdminManager;