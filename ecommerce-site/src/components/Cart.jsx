import React, { useState } from "react";
import styles from "../components/Cart.module.css";
import cartIcon from "../images/icon-cart.svg";
import deleteIcon from "../images/icon-delete.svg";

// კომპონენტი სახელად Cart
const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // წარმოადგენს კალათაში არსებულ ნივთებს
  const [showModal, setShowModal] = useState(false); // აკონტროლებს მოდალის ხილვადობას
  const [quantity, setQuantity] = useState(1); // წარმოადგენს დასამატებელი ნივთების რაოდენობას

  // კალათაში პროდუქტის დამატების ფუნქცია
  const addToCart = (product) => {
    // შემოწმება, არის თუ არა პროდუქტი უკვე კალათაში
    const existingItem = cartItems.find((item) => item.name === product.name);

    // თუ არსებობს, ხდება არსებული ნივთის რაოდენობის განახლება
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.name === product.name
          ? { ...item, amount: item.amount + quantity }
          : item
      );
      setCartItems(updatedCart);
    } // თუ არა, დავამატოთ ახალი ნივთი კალათაში
    else {
      const updatedCart = [
        ...cartItems,
        { ...product, amount: quantity > 0 ? quantity : 1 }, // ეს ნაწილი ქმნის ახალ ობიექტს. Spread ოპერატორი ({ ...product }) გამოიყენება product ობიექტიდან ყველა property-ების ახალ ობიექტში "დასაკოპირებლად" და დამატებით ამ ობიექტს ემატება ახალი property, რომელიც პროდუქტის რაოდენობაა კალათაში.
      ];
      setCartItems(updatedCart);
    }

    setQuantity(1);
    setShowModal(true);
  };

  const deleteFromCart = (productName) => {
    // განვაახლოთ პროდუქტის რაოდენობა
    const updatedCart = cartItems.map((item) =>
      item.name === productName ? { ...item, amount: item.amount - 1 } : item
    );

    // ამოვიღოთ პროდუქტები 0-ზე ნაკლები ან ტოლი რაოდენობით
    const filteredCart = updatedCart.filter((item) => item.amount > 0);

    // მოდალის დამალვა თუ კალათა ცარიელია
    if (filteredCart.length === 0) {
      setShowModal(false);
    }

    setCartItems(filteredCart);
  };

  // მოდალის დახურვის ფუნქცია
  const closeModal = () => {
    setShowModal(false);
  };

  // კალათის ჯამის გამოთვლის ფუნქცია
  const calculateSum = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
  };

  // ფუნქცია პროდუქტის რაოდენობის ცვლილებებისთვის
  const handleQuantityChange = (amount) => {
    if (quantity + amount >= 1) {
      setQuantity(quantity + amount);
    }
  };

  // კალათის render ფუნქცია
  const renderCartIcon = () => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.amount, 0);
    // cartItems არის მასივი, რომელიც შეიცავს კალათაში არსებულ ნივთებს.
    // .reduce: reduce ფუნქცია გამოიყენება მასივის ერთ მნიშვნელობად გადაქცევისთვის. იგი იღებს callback ფუნქციას თავის არგუმენტად და საწყის მნიშვნელობას.
    // 0 არის ჯამის საწყისი მნიშვნელობა.

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
