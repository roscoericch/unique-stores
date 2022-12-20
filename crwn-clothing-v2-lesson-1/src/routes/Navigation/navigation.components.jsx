import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/Cart/cart.selector";
// import { CartContext } from "../../contexts/cart.contexts";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutStart } from "../../store/user/user.Action";
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles.jsx";
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const signOutUser = () => dispatch(signOutStart());
  // const signOutHandler = async () => {
  //   await signOutUser();
  // setCurrentUser(null);
  // };
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SignOut
            </NavLink>
          ) : (
            <NavLink to="/auth">SignIn</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
