import { createSelector } from "@reduxjs/toolkit";

const selectCartReducer = (state) => state.cart;
export const selectCartItem = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItem
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartTotal = createSelector([selectCartItem], (cartItem) =>
  cartItem.reduce((total, item) => total + item.quantity * item.price, 0)
);
export const selectCartCount = createSelector([selectCartItem], (cartItem) =>
  cartItem.reduce((total, item) => total + item.quantity, 0)
);
