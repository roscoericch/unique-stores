import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/Category/category.Action";

import CategoriesPreview from "../../routes/categories-preview/categories-preview.components";
import Category from "../../routes/Category/category.components";
import "./shop.styles.scss";
const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
