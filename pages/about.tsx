import React from "react";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import YouTubeEmbed from "react-youtube-embed";

import { Layout, ProductList } from "@components/index";

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export namespace Product {
  export type PreProcessed = {
    [key: string]: string | boolean;
    content: string;
    slug: string;
  };

  export type Processed = {
    name: string;
    category: string;
    thumbnail: string;
    content: string;
    slug: string;
  };
}

type IndexProps = {
  products: Product.Processed[];
  title: string;
  description: string;
  url: string;
};

const Index = ({ products, title, description, url }: Readonly<IndexProps>) => {
  if (typeof window !== "undefined" && window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user: unknown) => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }

  return (
    <Layout title={title} description={description} url={url}>
      <main>
        <YouTubeEmbed id="AogN7XQruZY" />
        <ProductList products={products} />
      </main>
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const configData = await import(`../siteconfig.json`);

  const extractProducts = (context: __WebpackModuleApi.RequireContext) => {
    const keys: string[] = context.keys();
    const values: any = keys.map(context);

    const data = keys.map((key, index) => {
      const slug: string = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      const value: any = values[index];
      const document: { data: object; content: string } = matter(
        value?.default
      );

      return {
        ...document?.data,
        content: document?.content,
        slug,
      };
    });

    return data;
  };

  const productsContext = require.context("../posts", true, /\.md$/);
  const products: Product.PreProcessed[] = extractProducts(productsContext);

  return {
    props: {
      products,
      title: configData.title,
      description: configData.description,
      url: configData.url,
    },
  };
};
