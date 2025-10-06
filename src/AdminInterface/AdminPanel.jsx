import { useEffect, useState } from 'react';

function AdminPanel() {

    useEffect(() => {
        import("./Admin.css");
    }, []);

    const [rows, setRows] = useState([]);

    function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateTable(count) {
  const newRow = {
    id: 'Description', email: 'Description',
    name: 'Description', password: 'Description',
    age: 'Description', gender: 'Description',
    type: 'Description', offenses: 'Description',
  };
  
  for (let i = 0; i < count; i++) {
    setRows(prevRows => [...prevRows, newRow]);
    await sleep(100);
  }
}

    function getTableRow(id) {
        alert(id);
    }
    
    return (
        <>
            <div className="panel">
                <table className='usersTable'>
                    <thead>
                        <tr>
                            { /* 8 Columns */}
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Password</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Type</th>
                            <th>Offenses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                        <tr key={i}>
                            <td>{row.id}</td>
                            <td>{row.email}</td>
                            <td>{row.name}</td>
                            <td>{row.password}</td>
                            <td>{row.age}</td>
                            <td>{row.gender}</td>
                            <td>{row.type}  </td>
                            <td>{row.offenses}</td>
                            <td><button className="red" onClick={() => getTableRow(i, row.id)}>View</button></td>
                            <td colSpan="9"><button className="green" onClick={() => generateTable(10)}>Add Row</button></td>
                        </tr>
                    ))}
                    <tr><td colSpan="9"><button onClick={() => generateTable(50)}>Add Row</button></td></tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminPanel;