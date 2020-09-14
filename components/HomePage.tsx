import React from "react";
import YouTubeEmbed from "react-youtube-embed";
import Img from "react-optimized-image";

import { Product } from "@pages/index";
import { Icon } from "@components/index";
import HeroImg from "../public/images/home-page-hero.jpg";
import GenerationsLeftImg from "../public/images/home-page-generations-left.jpg";
import GenerationsRightImg from "../public/images/home-page-generations-right.jpg";

type HomePageProps = {
  products?: Product.Processed[];
};

const HomePage = ({ products = [] }: Readonly<HomePageProps>): JSX.Element => {
  return (
    <main>
      <div className="hero">
        <Img alt="Noble Cuts" src={HeroImg} type="hero" loading="lazy" />
      </div>

      <section className="gray" id="products">
        <div className="wrap narrow">
          <h2>Products</h2>

          <Icon.Cuts />
        </div>
      </section>

      <section>
        <h2>Noble Cuts</h2>

        <div className="wrap narrow">
          <p className="blurb">
            Say something geniune and heartfelt about this video, please. Also,
            be sure to watch the placeholder because it's funny.
          </p>
        </div>

        <div className="wrap">
          <YouTubeEmbed id="FavUpD_IjVY" />
        </div>
      </section>

      <section>
        <h2>Seven Generations and Counting...</h2>

        <div className="wrap narrow">
          <p className="blurb">
            We know this land. More importantly, we know that being good
            stewards of our Century Farm puts a better product on your dinner
            table.
          </p>
        </div>

        <div className="wrap">
          <div className="double">
            <Img
              alt="Noble Cuts - Seven Generations and Counting..."
              src={GenerationsLeftImg}
              type="double"
              loading="lazy"
            />
            <Img
              alt="Noble Cuts - Seven Generations and Counting..."
              src={GenerationsRightImg}
              type="double"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>The Right Nutrition at the Right Time</h2>

        <div className="wrap narrow">
          <p className="blurb">
            Ya herd right. We feed our cows specific nutrients at specific times
            to ensure they mature into the best darn cows they can be.
          </p>
        </div>

        <div className="wrap">
          <div className="double">
            <Img
              alt="Noble Cuts - The Right Nutrition at the Right Time"
              src={GenerationsLeftImg}
              type="double"
              loading="lazy"
            />
            <Img
              alt="Noble Cuts - The Right Nutrition at the Right Time"
              src={GenerationsRightImg}
              type="double"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Stress-free Cows</h2>

        <div className="wrap narrow">
          <p className="blurb">
            We care for our cattle in every sense of the word. Less stress =
            better beef. Period.
          </p>
        </div>

        <div className="wrap">
          <div className="double">
            <Img
              alt="Noble Cuts - Stress-free Cows"
              src={GenerationsLeftImg}
              type="double"
              loading="lazy"
            />
            <Img
              alt="Noble Cuts - Stress-free Cows"
              src={GenerationsRightImg}
              type="double"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Customers of Our Product</h2>

        <div className="wrap narrow">
          <p className="blurb">
            The product we deliver to your door step is what we put on our
            family table every single week. We love it and so will your family.
          </p>
        </div>

        <div className="wrap">
          <div className="double">
            <Img
              alt="Noble Cuts - Customers of Our Product"
              src={GenerationsLeftImg}
              type="double"
              loading="lazy"
            />
            <Img
              alt="Noble Cuts - Customers of Our Product"
              src={GenerationsRightImg}
              type="double"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
