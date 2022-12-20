import "./category.styles.scss";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectIsCategoriesLoading,
} from "../../store/Category/category.selector";
// import { CategoriesContext } from "../../contexts/categories.contexts";
import Spinner from "../../components/spinner/spinner.components";
import ProductsCard from "../../components/products/products-card.components";
import { Fragment } from "react";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsCategoriesLoading);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="category-title">{category.toUpperCase()}</h2>
          <div className="category-container">
            {products &&
              products.map((product) => (
                <ProductsCard key={product.id} products={product} />
              ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Category;
