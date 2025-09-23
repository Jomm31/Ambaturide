import { useState } from 'react';
import AdminManager from './AdminManager.jsx';
import AdminPanel from './AdminPanel.jsx';
import './Admin.css'

function Admin() {
    return (
        <>
            <div className='main-container'>
                <AdminManager />
            </div>
        </>
    )
}

export default Admin;