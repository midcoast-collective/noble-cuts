import React from "react";
import Img from "react-optimized-image";
import Link from "next/link";

import { Layout } from "@components/index";
import { useCart } from "../api/useCart";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const Cart = (): JSX.Element => {
  const [
    cart,
    cartIsUpdating,
    addProduct,
    removeProduct,
    removeAllProduct,
  ] = useCart();

  let cartTotal = 0;
  cart.forEach(
    (productInCart) =>
      (cartTotal += productInCart.quantity * productInCart.price)
  );

  return (
    <Layout
      title={"Cart | Noble Cuts"}
      description={""}
      url={""}
      cart={cart}
      cartIsUpdating={cartIsUpdating}
    >
      <main>
        <section className="cart-section">
          <h2>Cart</h2>
          <div className="wrap">
            <div className="cart-container">
              {cart && cart.length > 0 ? (
                cart
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((product) => (
                    <div key={product.title} className="cart-item">
                      <Img
                        src={require(`../public/images/uploads/${product.thumbnail}`)}
                        type="product"
                      />
                      <div>
                        <span>
                          {moneyFormatter.format(
                            product.quantity * product.price
                          )}{" "}
                          (&times;{product.quantity})
                        </span>
                      </div>
                      <div>
                        <span>{product.title}</span>
                        <span className="cart-item-description">
                          {product.description}
                        </span>
                      </div>
                      <div className="cart-item-actions">
                        <button onClick={() => removeProduct(product)}>
                          &minus;
                        </button>
                        <button onClick={() => addProduct(product)}>
                          &#x2b;
                        </button>
                        <button onClick={() => removeAllProduct(product)}>
                          &times;
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="empty-cart-message">
                  Looks like your cart is empty...{" "}
                  <Link href="/#products">Shop</Link>
                </p>
              )}
            </div>

            <div className="cart-actions">
              {cart && cart.length > 0 ? (
                <button className="button">
                  Check Out {moneyFormatter.format(cartTotal)}
                </button>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Cart;
