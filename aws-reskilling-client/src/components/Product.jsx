import { CardBody } from "@windmill/react-ui";
import { Link } from "react-router-dom";
import { formatCurrency } from "../helpers/formatCurrency";

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.product_id}`}>
      <div className="group">
        <span className="block relative h-48 rounded overflow-hidden">
          <img
            className="w-full h-full object-contain object-center"
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            decoding="async"
            title={product.name}
          />
        </span>
        <CardBody className="flex flex-col items-stretch mt-4">
          <h2 className="title-font text-lg font-medium overflow-ellipsis whitespace-nowrap overflow-hidden">
            {product.name}
          </h2>
          <p className="">{formatCurrency(product.price)}</p>
        </CardBody>
      </div>
    </Link>
  );
};

export default Product;
