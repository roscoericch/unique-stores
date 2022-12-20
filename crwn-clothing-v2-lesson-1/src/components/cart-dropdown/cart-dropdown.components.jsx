import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.contexts";
import { selectCartItem } from "../../store/Cart/cart.selector.js";
import Button from "../button/button.componenets";
import CartItem from "../cart-item/cart-item.components";
const CartDropdown = () => {
  // const { cartItem } = useContext(CartContext);
  const cartItem = useSelector(selectCartItem);
  const navigate = useNavigate();
  const goToNavigateHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItem.length ? (
          cartItem.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToNavigateHandler}>Go To Checkout</Button>
    </CartDropdownContainer>
  );
};
export default CartDropdown;
