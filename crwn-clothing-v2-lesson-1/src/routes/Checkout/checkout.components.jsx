import "./checkout.styles.scss";
import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.contexts";
import { useSelector } from "react-redux";
import { selectCartItem } from "../../store/Cart/cart.selector";
import { selectCartTotal } from "../../store/Cart/cart.selector";
import CheckoutItem from "../../components/checkoutItem/checkoutItem.components";
import PaymentForm from "../../components/payment-form/payment-form.component";
const CheckOut = () => {
  // const { cartItem, cartTotal } = useContext(CartContext);
  const cartItem = useSelector(selectCartItem);
  const cartTotal = useSelector(selectCartTotal);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItem.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
      <PaymentForm/>
    </div>
  );
};
export default CheckOut;
