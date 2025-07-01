import React from 'react';
import Cart from '../components/Cart';

const CartPage = ({ cartItems, onRemoveFromCart, onClearCart }) => (
    <div className="cart-page">
        <Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} onClearCart={onClearCart} />
    </div>
);

export default CartPage;