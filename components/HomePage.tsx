import React from "react";
import YouTubeEmbed from "react-youtube-embed";

import Img from "react-optimized-image";
import HeroImg from "../public/images/home-page-hero.jpg";
import { Product } from "@pages/index";
import { Icon } from "@components/index";

type HomePageProps = {
  products?: Product.Processed[];
};

const HomePage = ({ products = [] }: Readonly<HomePageProps>): JSX.Element => {
  return (
    <main>
      <div className="hero">
        <Img alt="Noble Cuts" src={HeroImg} type="hero" />
      </div>

      <section className="gray" id="products">
        <div className="wrap narrow">
          <h2>Products</h2>

          <Icon.Cuts />
        </div>
      </section>

      <section>
        <div className="wrap narrow">
          <YouTubeEmbed id="FavUpD_IjVY" />
        </div>
      </section>

      {/* <ProductList products={products} /> */}
    </main>
  );
};

export default HomePage;
