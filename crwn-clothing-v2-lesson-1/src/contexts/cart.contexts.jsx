import { createContext, useEffect, useReducer } from "react";
import { useState } from "react";
import { createAction } from "../utils/reducer/reducer";

const addCartItem = (cartItem, productsToAdd) => {
  const existingCart = cartItem.find((item) => {
    return item.id === productsToAdd.id;
  });
  if (existingCart) {
    return cartItem.map((item) =>
      item.id === productsToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItem, { ...productsToAdd, quantity: 1 }];
};
const reduceCartItem = (cartItem, productsToRemove) => {
  if (productsToRemove.quantity > 1) {
    return cartItem.map((item) =>
      item.id === productsToRemove.id
        ? { ...item, quantity: productsToRemove.quantity - 1 }
        : item
    );
  }
  if (productsToRemove.quantity <= 1) {
    return cartItem.filter((item) => item.id !== productsToRemove.id);
  }
};
const removeCartItem = (cartItem, productsToRemove) => {
  return cartItem.filter((item) => item.id !== productsToRemove.id);
};
// const cartItemPrice = (cartItem) => {
//   return cartItem
//     .map((item) => {
//       const { quantity, price } = item;
//       return { quantity, price };
//     })
//     .reduce((total, item) => total + item.quantity * item.price, 0);
// };
const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItem: [],
  cartTotal: 0,
  cartCount: 0,
};

export const CartContext = createContext({
  isCartOpen: false,
  setisCartOpen: () => {},
  cartItem: [],
  cartItemPrice: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  reduceItemFromCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setisCartOpen] = useState(false);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);
  // const [cartItem, setCartItem] = useState([]);

  // useEffect(() => {
  //   const count = cartItem.reduce((total, item) => total + item.quantity, 0);
  //   setCartCount(count);
  // }, [cartItem]);
  // useEffect(() => {
  //   const cartItemTotal = cartItem.reduce(
  //     (total, item) => total + item.quantity * item.price,
  //     0
  //   );
  //   setCartTotal(cartItemTotal);
  // }, [cartItem]);

  const [{ cartItem, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemReducer = (newCartItems) => {
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItem: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = (productsToAdd) => {
    const newCartItems = addCartItem(cartItem, productsToAdd);
    updateCartItemReducer(newCartItems);
  };
  const reduceItemFromCart = (productsToRemove) => {
    const newCartItems = reduceCartItem(cartItem, productsToRemove);
    updateCartItemReducer(newCartItems);
  };
  const removeItemFromCart = (productsToRemove) => {
    const newCartItems = removeCartItem(cartItem, productsToRemove);
    updateCartItemReducer(newCartItems);
  };

  const setisCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };
  const value = {
    isCartOpen,
    setisCartOpen,
    addItemToCart,
    reduceItemFromCart,
    removeItemFromCart,
    cartItem,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
