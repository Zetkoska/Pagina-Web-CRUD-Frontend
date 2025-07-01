import React, { useState } from 'react';

const Cart = ({ cartItems, onRemoveFromCart, onClearCart }) => {
    const [banco, setBanco] = useState('');
    const [nombre, setNombre] = useState('');
    const [pagado, setPagado] = useState(false);
    const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    const handlePago = async (e) => {
        e.preventDefault();
        if (banco.trim() && nombre.trim()) {
            try {
                const response = await fetch('http://localhost:5000/api/compradores', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre,
                        banco,
                        carrito: cartItems
                    })
                });
                if (response.ok) {
                    setPagado(true);
                    onClearCart();
                    setBanco('');
                    setNombre('');
                } else {
                    alert('Error al guardar la compra');
                }
            } catch (error) {
                alert('Error de conexión con el servidor');
            }
        }
    };

    return (
        <div className="cart">
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.nombre} x {item.cantidad} - ${item.precio.toFixed(2)}
                            <button onClick={() => onRemoveFromCart(item.id)}>Quitar</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total: ${total.toFixed(2)}</h3>
            {/* Formulario de pago */}
            {cartItems.length > 0 && !pagado && (
                <form className="cart-form" onSubmit={handlePago}>
                    <div>
                        <label>Banco:</label>
                        <input
                            type="text"
                            value={banco}
                            onChange={e => setBanco(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Pagar</button>
                </form>
            )}
            {pagado && <p className="pago-exitoso">¡Pago realizado con éxito!</p>}
        </div>
    );
};

export default Cart; 