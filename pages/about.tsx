import React from "react";
import { GetStaticProps } from "next";

import { Layout, AboutPage } from "@components/index";
import { Page, getPagesData } from "../api/getPagesData";
import { useCart } from "../api/useCart";

type AboutProps = {
  page: Partial<Page>;
};

const About = ({ page }: Readonly<AboutProps>): JSX.Element => {
  const [cart] = useCart();

  return (
    <Layout
      title={`${page.title} | Noble Cuts`}
      description={page.intro}
      url={"https://noblecutsmeat.com/about/"}
      cart={cart}
    >
      <AboutPage page={page} />
    </Layout>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
  const pages = getPagesData();

  return {
    props: {
      page: pages.filter((page) => page.id === "about")[0],
    },
  };
};
