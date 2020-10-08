import React from "react";
import Img from "react-optimized-image";

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
      <main>
        <section>
          <h2>Cart</h2>
          <div className="wrap">
            <div className="cart-container">
              {cart && cart.length > 0
                ? cart.map((product) => (
                    <div key={product.title} className="cart-container-item">
                      <Img
                        src={require(`../public/images/uploads/${product.thumbnail}`)}
                        type="product"
                      />
                      {product.title} - {product.quantity}
                    </div>
                  ))
                : "There are no items in your cart."}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Cart;
