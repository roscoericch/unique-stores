import "./category-preview.styles.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsCategoriesLoading } from "../../store/Category/category.selector";
import Spinner from "../spinner/spinner.components";
import ProductsCard from "../products/products-card.components";
const CategoryPreview = ({ title, products }) => {
  const isLoading = useSelector(selectIsCategoriesLoading);
  return (
    <div className="category-preview-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2>
            <Link className="title" to={title}>
              {title.toUpperCase()}
            </Link>
          </h2>
          <div className="preview">
            {products
              .filter((_, index) => index < 4)
              .map((product) => (
                <ProductsCard key={product.id} products={product} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default CategoryPreview;
