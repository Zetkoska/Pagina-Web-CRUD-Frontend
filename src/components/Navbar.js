import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                <Link to="/">Los Primos</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/catalogo">Catálogo</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </div>
    </nav>
);

export default Navbar; 