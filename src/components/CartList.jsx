import CartItem from "./CartItem";

function CartList({ cart, onRemove, onUpdateQuantity }) {
  if (cart.length === 0) {
    return <p className="cart-empty">Your cart is empty</p>;
  }

  return (
    <ul className="cart-list">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </ul>
  );
}

export default CartList;
