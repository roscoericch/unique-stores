import "./product-card.styles.scss";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.contexts";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/Cart/cart.Action";
import { selectCartItem } from "../../store/Cart/cart.selector";
import Button from "../button/button.componenets";
const ProductsCard = ({ products }) => {
  const { name, price, imageUrl } = products;
  // const { addItemToCart } = useContext(CartContext);
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItem);
  const addProductToCart = () => dispatch(addItemToCart(cartItem, products));
  return (
    <div className="product-card-container">
      <img src={imageUrl} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addProductToCart} buttonType="inverted">
        Add to Cart
      </Button>
    </div>
  );
};
export default ProductsCard;
