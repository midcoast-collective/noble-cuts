import React from "react";
import { GetStaticProps } from "next";

import { Layout, AboutPage } from "@components/index";
import { Page, getPagesData } from "../api/getPagesData";

type AboutProps = {
  page: Partial<Page>;
};

const About = ({ page }: Readonly<AboutProps>): JSX.Element => (
  <Layout
    title="About | Noble Cuts"
    description={"description"}
    url={"https://noblecutsmeat.com/about/"}
  >
    <AboutPage page={page} />
  </Layout>
);

export default About;

export const getStaticProps: GetStaticProps = async () => {
  const pages = getPagesData();

  return {
    props: {
      page: pages.filter((page) => page.id === "about")[0],
    },
  };
};
