import { useEffect } from 'react';

function AdminPanel() {

    useEffect(() => {
        import("./Admin.css");
    }, []);
    
    return (
        <>
            <div className="panel">
            </div>
        </>
    )
}

export default AdminPanel;