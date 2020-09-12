import React from "react";
import Head from "next/head";
import Header from "@components/Header";
import * as Icon from "@components/Icon";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  url?: string;
};

const Layout = ({
  children,
  title = "Page Title",
  description = "Page Description",
  url = "https://nextjs.org",
}: Readonly<LayoutProps>): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{title}</title>

        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={url + "/images/og-image.png"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={url + "/images/og-image.png"} />

        <script
          type="text/javascript"
          src="https://js.squareupsandbox.com/v2/paymentform"
        ></script>
        {/* <script
          type="text/javascript"
          src="https://js.squareup.com/v2/paymentform"
        ></script> */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <section className="layout">
        <Header url={url} />
        {children}
      </section>

      <footer>
        <div className="wrap">
          <div className="logo">
            <Icon.Logo fill="#ffffff" />
          </div>
          &copy;{new Date().getFullYear()} Noble Cuts. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Layout;
