import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="home-welcome">
        <div className="home-card">
            <h1>Bienvenido a <span style={{ color: '#e17055' }}>Los Primos</span></h1>
            <p>¡Los mejores perros calientes y hamburguesas de la ciudad!</p>
            <img
                src="/los primos.jpg"
                alt="Los Primos"
                className="home-image"
            />
            <Link to="/catalogo" className="home-btn">Ver Catálogo</Link>
        </div>
    </div>
);

export default Home; 