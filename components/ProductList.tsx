import React from "react";

import { Product as ProductType } from "@pages/index";
import Product from "@components/Product";

type ProductListProps = {
  products?: ProductType.Processed[];
};

const ProductList = ({ products = [] }: Readonly<ProductListProps>) => {
  if (products.length < 1) return <p>Oops, there is nothing to see here...</p>;

  return (
    <div className="wrap">
      <div className="list">
        {products.map((product) => (
          <Product product={product} key={product.slug} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
