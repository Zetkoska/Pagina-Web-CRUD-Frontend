import React, { useEffect, useState } from 'react';

const Catalog = ({ onAddToCart }) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('/productos.json')
            .then(res => res.json())
            .then(data => setProductos(data));
    }, []);

    return (
        <div className="catalog">
            <h2>Catálogo</h2>
            <div className="catalog-list">
                {productos.map(producto => (
                    <div key={producto.id} className="product-card">
                        <img src={producto.imagen} alt={producto.nombre} className="product-image" />
                        <h3>{producto.nombre}</h3>
                        <p>{producto.descripcion}</p>
                        <p><b>${producto.precio.toFixed(2)}</b></p>
                        <button onClick={() => onAddToCart(producto)}>Agregar al carrito</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog; 