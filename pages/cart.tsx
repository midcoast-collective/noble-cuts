import React from "react";

import { Layout } from "@components/index";
import { useCart } from "../api/useCart";

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

const Cart = (): JSX.Element => {
  const [cart, cartIsUpdating, addProduct, removeProduct] = useCart();

  return (
    <Layout
      title={"Cart | Noble Cuts"}
      description={""}
      url={""}
      cart={cart}
      cartIsUpdating={cartIsUpdating}
    >
      <div className="wrap">
        {cart && cart.length > 0
          ? cart.map((product, ind) => (
              <div key={product.title + ind}>
                {product.title} - {product.quantity}
              </div>
            ))
          : "There are no items in your cart."}
      </div>
    </Layout>
  );
};

export default Cart;
