import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkDB, describeTable, getDB, selectAllUsers } from './database.js';
import { UsersPanel, TransactionsPanel } from './AdminPanel.jsx';

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
                    <li onClick={() => selectAllUsers('ambaturide')}>Select All</li>
                    <li onClick={() => checkDB('ambaturide_db')}>Test Database</li>
                    <li onClick={() => TransactionsPanel()}>Transactions Table</li>
                    <li onClick={() => navigate('/Admin')}>Transactions List</li>
                    <li onClick={() => navigate('/Admin')}>Drivers List</li>
                    <li onClick={() => navigate('/Admin')}>Riders List</li>
                    <li onClick={() => navigate('/Admin')}>Reports List</li>
                    <li onClick={() => navigate('/')}>Exit</li>
                    </ul>
            </div>
        </>
    )
}

export default AdminManager;