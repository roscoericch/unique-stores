import { createContext } from "react";
import { useState, useEffect } from "react";
// import PRODUCTS from "../../src/shop_data/shop-data.json";
import { getCategoriesAndDocument } from "../utils/firebase/firebase.utilities";
import SHOP_DATA from "../shop_data/shop-data";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  // useEffect(() => {
  //   addCollectionsAndDocument("categories", SHOP_DATA);
  // }, []);
  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoryMap = await getCategoriesAndDocument("categories");
  //     console.log(categoryMap);
  //   };
  //   getCategoriesMap();
  // }, []);
  useEffect(async () => {
    const categoryMap = await getCategoriesAndDocument("categories");
    setCategoriesMap(categoryMap);
    console.log(categoryMap);
  }, []);
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
