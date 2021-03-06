import React from "react";
import { GetStaticProps } from "next";

import { Layout, HomePage } from "@components/index";
import { Product, getProductsData } from "../api/getProductsData";
import { Page, getPagesData } from "../api/getPagesData";
import { useCart } from "../api/useCart";

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

type IndexProps = {
  products: Product[];
  page: Page;
  title: string;
  description: string;
  url: string;
};

const Index = ({
  products,
  page,
  title,
  description,
  url,
}: Readonly<IndexProps>): JSX.Element => {
  const [cart, cartIsUpdating, addProduct] = useCart();

  return (
    <Layout
      title={title}
      description={description}
      url={url}
      cart={cart}
      cartIsUpdating={cartIsUpdating}
    >
      <HomePage
        addProduct={addProduct}
        cart={cart}
        products={products}
        page={page}
      />
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const configData = await import("../siteconfig.json");
  const products = getProductsData();
  const pages = getPagesData();

  return {
    props: {
      products,
      page: pages.filter((page) => page.id === "home")[0],
      title: configData.title,
      description: configData.description,
      url: configData.url,
    },
  };
};
