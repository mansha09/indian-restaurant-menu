import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <h4>{item.name} - {item.spiciness}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <Button variant="danger" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
        </>
      )}

      {/* Link to navigate back to the Menu page */}
      <Link to="/">
        <Button variant="primary" className="mt-3">Go Back to Menu</Button>
      </Link>
    </div>
  );
};

export default Cart;
