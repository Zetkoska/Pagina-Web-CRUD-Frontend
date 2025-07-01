import React, { useEffect, useState } from 'react';

const AdminCompras = () => {
    const [compras, setCompras] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editNombre, setEditNombre] = useState('');
    const [editBanco, setEditBanco] = useState('');

    // Obtener todas las compras
    const fetchCompras = async () => {
        const res = await fetch('https://pagina-web-crud-backend.onrender.com/api/compradores');
        const data = await res.json();
        setCompras(data);
    };

    useEffect(() => {
        fetchCompras();
    }, []);

    // Eliminar una compra
    const handleDelete = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar esta compra?')) {
            await fetch(`https://pagina-web-crud-backend.onrender.com/api/compradores/${id}`, { method: 'DELETE' });
            fetchCompras();
        }
    };

    // Iniciar edición
    const handleEdit = (compra) => {
        setEditId(compra._id);
        setEditNombre(compra.nombre);
        setEditBanco(compra.banco);
    };

    // Guardar edición
    const handleSave = async (id) => {
        await fetch(`https://pagina-web-crud-backend.onrender.com/api/compradores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: editNombre, banco: editBanco }),
        });
        setEditId(null);
        fetchCompras();
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">Administrar Compras</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Banco</th>
                        <th>Carrito</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((compra) => (
                        <tr key={compra._id}>
                            <td>
                                {editId === compra._id ? (
                                    <input value={editNombre} onChange={e => setEditNombre(e.target.value)} />
                                ) : (
                                    compra.nombre
                                )}
                            </td>
                            <td>
                                {editId === compra._id ? (
                                    <input value={editBanco} onChange={e => setEditBanco(e.target.value)} />
                                ) : (
                                    compra.banco
                                )}
                            </td>
                            <td>
                                <ul>
                                    {compra.carrito.map((item, idx) => (
                                        <li key={idx}>
                                            {item.nombre} x {item.cantidad} - ${item.precio}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>{new Date(compra.fechaCompra).toLocaleString()}</td>
                            <td>
                                {editId === compra._id ? (
                                    <>
                                        <button className="admin-btn save" onClick={() => handleSave(compra._id)}>Guardar</button>
                                        <button className="admin-btn cancel" onClick={() => setEditId(null)}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="admin-btn edit" onClick={() => handleEdit(compra)}>Editar</button>
                                        <button className="admin-btn delete" onClick={() => handleDelete(compra._id)}>Eliminar</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCompras;