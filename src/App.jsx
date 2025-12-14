import { useState, useEffect, useRef } from "react";
import "./App.css";
import CartList from "./components/CartList";

function App() {
  // Инициализируем состояние напрямую из localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const isInitialized = useRef(true);

  // Слушаем обновления корзины от Vanilla JS
  useEffect(() => {
    const handleCartUpdate = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error loading cart:", e);
        }
      }
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeAll = () => {
    setCart([]); // Обнуляем список
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <h3>You purcased {cart.length}</h3>
      <CartList
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      {cart.length > 0 && (
        <div className="cart-total">
          <button className="remove-btn" onClick={removeAll}>
            Remove all
          </button>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
