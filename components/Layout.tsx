import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Footer, Header, Icon } from "@components/index";
import { Product } from "../api/getProductsData";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  cart?: Product[];
  cartIsUpdating?: boolean;
  showCart?: boolean;
};

const Layout = ({
  children,
  title = "Page Title",
  description = "Page Description",
  url = "https://noblecutsmeat.com",
  image = "/images/og-image.png",
  cart = [],
  cartIsUpdating = false,
  showCart = true,
}: Readonly<LayoutProps>): JSX.Element => {
  let quantity = 0;

  cart &&
    cart.length &&
    cart.forEach((productInCart) => {
      quantity += productInCart.quantity;
    });

  return (
    <>
      <Head>
        <meta
          key="apple-mobile-web-app-capable"
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <title key="title">{title}</title>

        <meta key="description" name="description" content={description} />

        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:url" property="og:url" content={url} />
        <meta key="og:title" property="og:title" content={title} />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
        <meta key="og:image" property="og:image" content={url + image} />

        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:titl" name="twitter:title" content={title} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={description}
        />
        <meta key="twitter:image" name="twitter:image" content={url + image} />
        <link
          key="google-fonts"
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
        <script
          key="netlify"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        ></script>

        <script
          key="square"
          type="text/javascript"
          src="https://js.squareupsandbox.com/v2/paymentform"
        ></script>
        {/* <script
          key="square"
          src="https://js.squareup.com/v2/paymentform"
        ></script> */}
      </Head>

      <h1 className="sr-only">{title}</h1>

      <Header />

      {children}

      <Footer />

      {showCart ? (
        <Link href="/cart">
          <div className="cart">
            <span className={cartIsUpdating ? "isLoading" : ""}>
              {quantity}
            </span>
            <Icon.Cart />
          </div>
        </Link>
      ) : null}
    </>
  );
};

export default Layout;
