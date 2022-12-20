import { takeCoverage } from "v8";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer";
import { CART_ACTION_TYPES, TcartItem } from "./cart.types";
import { CategoryItem } from "../Category/category.types";

const addCartItem = (cartItem: TcartItem[], productsToAdd: CategoryItem) => {
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
const reduceCartItem = (cartItem: TcartItem[], productsToRemove: TcartItem) => {
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
const removeCartItem = (
  cartItem: TcartItem[],
  productsToRemove: CategoryItem
) => {
  const existingCartItem = cartItem.find(
    (cartItem) => cartItem.id !== cartItem.id
  );
  return cartItem.filter((item) => item.id !== productsToRemove.id);
};

export const setCartItems = (cartItem: TcartItem[]) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItem);
export const setIsCartOpen = (boolean: boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
export const addItemToCart = (
  cartItem: TcartItem[],
  productsToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItem, productsToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const reduceItemFromCart = (
  cartItem: TcartItem[],
  productsToRemove: TcartItem
) => {
  const newCartItems = reduceCartItem(cartItem, productsToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (
  cartItem: TcartItem[],
  productsToRemove: CategoryItem
) => {
  const newCartItems = removeCartItem(cartItem, productsToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export type removeItemFromCart = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  TcartItem[]
>;
