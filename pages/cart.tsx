import React from "react";
import Img from "react-optimized-image";
import Link from "next/link";
import axios from "axios";

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

  function handleCheckout() {
    axios
      .post(
        `https://noble-cuts.netlify.app/.netlify/functions/getCheckoutLink`,
        cart
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
                  <Link href="/#products">
                    <a>Shop</a>
                  </Link>
                </p>
              )}
            </div>
          </div>

          <div className="wrap">
            <div className="cart-explanation">
              <p>
                Delivery available to these Missouri counties for $25 fee:
                Caldwell, Livingston, Davies, Grundy, Carroll, Ray, Clay,
                Platte, Clinton, Buchanan, Lafayette, Jackson, Saline, Dekalb
                and Andrew.
              </p>
              <p>
                Any counties outside of our delivery area, please contact us for
                a delivery quote. You may also schedule to pickup your order at
                our farm by contacting us. If you choose to pick up your order,
                it must be picked within 7 days of completion.
              </p>
              <p>
                For shipping requests, please contact us for a custom quote.
              </p>
            </div>

            <div className="cart-actions">
              {cart && cart.length > 0 ? (
                <button className="button" onClick={handleCheckout}>
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
