// import { useContext, Fragment } from "react";
import { useSelector } from "react-redux";
// import { CategoriesContext } from "../../contexts/categories.contexts";
import { selectCategoriesMap } from "../../store/Category/category.selector";
import CategoryPreview from "../../components/category-preview/category-preview.components";
import "./categories-preview.styles.scss";
const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  console.log(categoriesMap);
  return (
    <div className="category-preview-container">
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </div>
  );
};
export default CategoriesPreview;
