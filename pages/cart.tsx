import React from "react";
import Img from "react-optimized-image";
import Link from "next/link";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import axios from "axios";

import { Layout } from "@components/index";
import { useCart } from "../api/useCart";

type SqContact = {
  familyName: string;
  givenName: string;
  email: string;
  country: string;
  countryName?: string;
  region?: string;
  city: string;
  addressLines: string[];
  postalCode: string;
  phone?: string;
};

type SqVerificationDetails = {
  billingContact: SqContact;
  amount?: string;
  currencyCode?: string;
  intent?: string;
};

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

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");

  function cardNonceResponseReceived(
    errors: unknown | null,
    nonce: string,
    cardData: unknown,
    buyerVerificationToken?: string
  ) {
    if (errors) {
      console.log(errors); // TODO: Handle Errors
    }

    console.log(
      "nonce created: " +
        nonce +
        ", buyerVerificationToken: " +
        buyerVerificationToken
    );

    axios
      .post(
        `https://noble-cuts.netlify.app/.netlify/functions/getCheckoutLink`,
        {
          cart,
          nonce,
          buyerVerificationToken,
          email,
          address
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function createVerificationDetails(): SqVerificationDetails {
    return {
      amount: `${cartTotal}`,
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: lastName,
        givenName: firstName,
        email: email,
        country: "US",
        city: "",
        addressLines: [address],
        postalCode: "",
        phone: phone,
      },
    };
  }

  return (
    <Layout
      title={"Cart | Noble Cuts"}
      description={""}
      url={""}
      cart={cart}
      cartIsUpdating={cartIsUpdating}
      showCart={false}
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
                        <span>
                          <strong>{product.title}</strong>
                        </span>
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

            <div className="forms">
              <form className="customer">
                <fieldset className="sq-fieldset">
                  <div className="sq-form-half">
                    <label>
                      First Name
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.currentTarget.value)}
                      />
                    </label>
                    <label>
                      Last Name
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.currentTarget.value)}
                      />
                    </label>
                  </div>

                  <label>
                    Email
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </label>
                  <label>
                    Address
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.currentTarget.value)}
                    />
                  </label>
                  <label>
                    Phone
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.currentTarget.value)}
                    />
                  </label>
                </fieldset>
              </form>

              {/* @ts-ignore */}
              <SquarePaymentForm
                // apiWrapper="some-string???" TODO: Figure out what this is
                formId="NobleCheckoutForm"
                sandbox={true}
                applicationId={"sandbox-sq0idb-7iiDnOGPVYM8gj0SQXnHMg"}
                locationId={"L832Y9Z6HA8PE"}
                cardNonceResponseReceived={cardNonceResponseReceived}
                createVerificationDetails={createVerificationDetails}
              >
                <fieldset className="sq-fieldset">
                  <CreditCardNumberInput />
                  <div className="sq-form-third">
                    <CreditCardExpirationDateInput />
                  </div>

                  <div className="sq-form-third">
                    <CreditCardPostalCodeInput />
                  </div>

                  <div className="sq-form-third">
                    <CreditCardCVVInput />
                  </div>
                </fieldset>

                <CreditCardSubmitButton>
                  Check Out {moneyFormatter.format(cartTotal)}
                </CreditCardSubmitButton>
              </SquarePaymentForm>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Cart;
