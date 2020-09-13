import React from "react";
import Head from "next/head";

import { Footer, Header } from "@components/index";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

const Layout = ({
  children,
  title = "Page Title",
  description = "Page Description",
  url = "https://noblecutsmeat.com",
  image = "/images/og-image.png",
}: Readonly<LayoutProps>): JSX.Element => {
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
          key="square"
          type="text/javascript"
          src="https://js.squareupsandbox.com/v2/paymentform"
        ></script>
        {/* <script
          key="square"
          type="text/javascript"
          src="https://js.squareup.com/v2/paymentform"
        ></script> */}
        <script
          key="netlify"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        ></script>
      </Head>

      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
