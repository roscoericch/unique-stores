import { CART_ACTION_TYPES, TcartItem } from "./cart.types";
import { AnyAction } from "redux";

export type cartState = {
  readonly cartItem: TcartItem[];
  readonly isCartOpen: boolean;
};

export const CART_INITIAL_STATE: cartState = {
  isCartOpen: false,
  cartItem: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {} as AnyAction
): cartState => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItem: payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      return state;
  }
};
