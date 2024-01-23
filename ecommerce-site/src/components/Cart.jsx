import React, { useState } from "react";
import styles from "../components/Cart.module.css";
import cartIcon from "../images/icon-cart.svg";
import deleteIcon from "../images/icon-delete.svg";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.name === product.name);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.name === product.name
          ? { ...item, amount: item.amount + quantity }
          : item
      );
      setCartItems(updatedCart);
    } else {
      const updatedCart = [
        ...cartItems,
        { ...product, amount: quantity > 0 ? quantity : 1 },
      ];
      setCartItems(updatedCart);
    }

    setQuantity(1);
    setShowModal(true);
  };

  const deleteFromCart = (productName) => {
    const updatedCart = cartItems.map((item) =>
      item.name === productName ? { ...item, amount: item.amount - 1 } : item
    );

    const filteredCart = updatedCart.filter((item) => item.amount > 0);

    if (filteredCart.length === 0) {
      setShowModal(false);
    }

    setCartItems(filteredCart);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const calculateSum = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
  };

  const handleQuantityChange = (amount) => {
    if (quantity + amount >= 1) {
      setQuantity(quantity + amount);
    }
  };

  const renderCartIcon = () => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.amount, 0);
    return (
      <div
        className={styles.cartIconContainer}
        onClick={() => setShowModal(true)}
      >
        <img className={styles.cartIcon} src={cartIcon} alt="Cart Icon" />
        {totalItems > 0 && (
          <div className={styles.notificationCircle}>{totalItems}</div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {renderCartIcon()}

      <div className={styles.quantityControl}>
        <button
          className={styles.quantityButton}
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
        <p className={styles.quantityDisplay}>{quantity}</p>
        <button
          className={styles.quantityButton}
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
      </div>

      <button
        className={styles.addToCartButton}
        onClick={() => addToCart({ name: "Sneakers", price: 125 })}
      >
        Add to Cart
      </button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} className={styles.cartItem}>
                    <p>{`${item.name}. $${item.price} * ${item.amount}`}</p>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteFromCart(item.name)}
                    >
                      <img src={deleteIcon} alt="Delete Icon" />
                    </button>
                  </div>
                ))}
                <p>Total: ${calculateSum()}</p>
              </div>
            ) : (
              <p>Nothing In the Cart</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
