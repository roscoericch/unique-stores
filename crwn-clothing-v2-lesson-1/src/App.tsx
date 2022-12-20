import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/Navigation/navigation.components";
import Home from "./routes/Home/home.components";
import Shop from "./components/shop/shop.components";
import CheckOut from "./routes/Checkout/checkout.components";
import Authentication from "./routes/authentication/authentication.components";
import { setCurrentUser } from "./store/user/user.Action";
import { setCartItems, setIsCartOpen } from "./store/Cart/cart.Action";
import { checkUserSession } from "./store/user/user.Action";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  // useEffect(() => {
  //   getCurrentUser().then((user) => console.log(user));
  // }, []);
  // useEffect(() => {
  //   const count = cartItem.reduce((total, item) => total + item.quantity, 0);
  //   setCartCount(count);
  // }, [cartItem]);
  // useEffect(() => {
  //   dispatch(setCartItems());
  // }, [cartItem]);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
