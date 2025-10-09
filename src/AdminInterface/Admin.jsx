import { useEffect , useLayoutEffect} from 'react';

import AdminManager from './AdminManager.jsx';
import AdminPanel from './AdminPanel.jsx';
import AdminPanel2 from './AdminPanel2.jsx';

import bg_img from '../assets/homepage-driver.jpg'

function Admin() {

    useEffect(() => {
        import("./Admin.css");
    }, []);

    return (
        <>
            <div className='main-container'>
                <AdminManager />
                <AdminPanel2 />
            </div>
        </>
    )
}

export default Admin;