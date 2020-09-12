import React from "react";

import ResponsiveImg from "@components/ResponsiveImg";
import { Product as ProductType } from "@pages/index";

type ProductProps = {
  product: ProductType.Processed;
};

const Product = ({ product }: Readonly<ProductProps>) => (
  <div className="product">
    <div className="product-content">
      <h2>{product.name}</h2>

      <ResponsiveImg src={product.thumbnail} />

      <p>{product.content}</p>
    </div>
  </div>
);

export default Product;
