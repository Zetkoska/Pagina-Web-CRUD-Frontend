import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CartPage from './pages/CartPage';
import AdminCompras from './pages/AdminCompras';
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([]);

    // Agregar producto al carrito
    const addToCart = (producto) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === producto.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prevItems, { ...producto, cantidad: 1 }];
        });
    };

    // Quitar producto del carrito
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Limpiar carrito
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <Router>
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogo" element={<Catalog onAddToCart={addToCart} />} />
                        <Route path="/carrito" element={<CartPage cartItems={cartItems} onRemoveFromCart={removeFromCart} onClearCart={clearCart} />} />
                        <Route path="/admin" element={<AdminCompras />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App; 