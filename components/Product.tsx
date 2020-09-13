import React from "react";

import { ResponsiveImage } from "@components/index";
import { Product as ProductType } from "@pages/index";

type ProductProps = {
  product: ProductType.Processed;
};

const Product = ({ product }: Readonly<ProductProps>) => (
  <div className="product">
    <div className="product-content">
      <h2>{product.name}</h2>

      {/* <ResponsiveImage data={product.thumbnail} /> */}

      <p>{product.content}</p>
    </div>
  </div>
);

export default Product;
