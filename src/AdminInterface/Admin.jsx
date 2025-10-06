import { useEffect , useLayoutEffect} from 'react';

import AdminManager from './AdminManager.jsx';
import AdminPanel from './AdminPanel.jsx';

import bg_img from '../assets/homepage-driver.jpg'

function Admin() {
    return (
        <>
            <div className='main-container'>
                <AdminManager />
                <AdminPanel />
            </div>
        </>
    )
}

export default Admin;