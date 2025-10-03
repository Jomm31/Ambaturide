import { useEffect, useLayoutEffect} from 'react';


import AdminManager from './AdminManager.jsx';
import AdminPanel from './AdminPanel.jsx';
import "./Admin.css"

import bg_img from '../assets/homepage-driver.jpg'

function Admin() {

    useLayoutEffect(() => {
        import("./Admin.css");
    }, []);

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