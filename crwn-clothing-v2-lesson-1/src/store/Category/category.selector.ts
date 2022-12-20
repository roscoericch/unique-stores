import { createSelector } from "@reduxjs/toolkit";

import { categoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state): categoriesState => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      // const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);
// const categoryMap = querySnapshot.docs

export const selectIsCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
