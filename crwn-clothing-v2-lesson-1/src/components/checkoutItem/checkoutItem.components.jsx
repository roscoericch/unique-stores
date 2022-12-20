import "./checkout-item.styles.scss";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.contexts";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../store/Cart/cart.Action";
import { selectCartItem } from "../../store/Cart/cart.selector";
const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;
  // const { addItemToCart, reduceItemFromCart, removeItemFromCart } =
  //   useContext(CartContext);
  const InitialCartItems = useSelector(selectCartItem);
  const addProductToCart = () =>
    dispatch(addItemToCart(InitialCartItems, cartItem));
  const reduceProductFromCart = () =>
    dispatch(reduceItemFromCart(InitialCartItems, cartItem));
  const removeProductFromCart = () =>
    dispatch(removeItemFromCart(InitialCartItems, cartItem));
  console.log(cartItem);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt="" className="image-container" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={reduceProductFromCart}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addProductToCart}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={removeProductFromCart}>
        &#10005;
      </div>
    </div>
  );
};
export default CheckoutItem;
