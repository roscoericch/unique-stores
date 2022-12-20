import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectIsCartOpen } from "../../store/Cart/cart.selector.js";
import { selectCartCount } from "../../store/Cart/cart.selector.js";
import { setIsCartOpen } from "../../store/Cart/cart.Action.js";
// import { useState } from "react";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.contexts";

const CartIcon = () => {
  // const { isCartOpen, setisCartOpen } = useContext(CartContext);
  // const { cartCount } = useContext(CartContext);
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  // const [isCartOpen, setisCartOpen] = useState(InitialCartState);

  const toggle = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={toggle}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
