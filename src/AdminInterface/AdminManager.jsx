import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminManager() {

    useEffect(() => {
        import("./Admin.css");
    }, []);

    const navigate = useNavigate();
    
    function get_list() {
        return;
    }

    return (
        <>
            <div className='card'>
                <ul>
                    <li onClick={() => navigate('/')}>Transactions List</li>
                    <li onClick={() => navigate('/')}>Drivers List</li>
                    <li onClick={() => navigate('/')}>Riders List</li>
                    <li onClick={() => navigate('/')}>Reports List</li>
                    <li onClick={() => navigate('/')}>Exit</li>
                    </ul>
            </div>
        </>
    )
}

export default AdminManager;