import React from "react";
import matter from "gray-matter";
import { GetStaticProps } from "next";

import Layout from "@components/Layout";
import PostList from "@components/PostList";

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export namespace Post {
  export type PreProcessed = {
    [key: string]: string | boolean;
    content: string;
    slug: string;
  };

  export type Processed = {
    name: string;
    category: string;
    thumbnail: string;
    website: string;
    giftcard?: string;
    number?: string;
    pickup: boolean;
    delivery: boolean;
    masks: boolean;
    masked: boolean;
    content: string;
    slug: string;
  };
}

type IndexProps = {
  posts: Post.Processed[];
  title: string;
  description: string;
  url: string;
};

const Index = ({ posts, title, description, url }: Readonly<IndexProps>) => {
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
        <PostList posts={posts} />
      </main>
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const configData = await import(`../siteconfig.json`);

  const extractPosts = (context: __WebpackModuleApi.RequireContext) => {
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

  const postContext = require.context("../posts", true, /\.md$/);
  const posts: Post.PreProcessed[] = extractPosts(postContext);

  return {
    props: {
      posts,
      title: configData.title,
      description: configData.description,
      url: configData.url,
    },
  };
};
