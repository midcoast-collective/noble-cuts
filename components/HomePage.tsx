import React from "react";
import YouTube from "react-youtube";
import Img from "react-optimized-image";

import { Product } from "../api/getProductsData";
import { Page } from "../api/getPagesData";
import { Icon } from "@components/index";
import HeroImage from "../public/images/home-page-hero.jpg";

type HomePageProps = {
  products: Product[];
  page: Page;
};

const HomePage = ({ products, page }: Readonly<HomePageProps>): JSX.Element => {
  React.useEffect(() => {
    // Redirect to Netlify CMS Admin if coming from login view
    // TODO: Get this working :(
    if (typeof window !== "undefined" && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user: unknown) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            console.log("Logged In...");
            document.location.href = "/admin/";
          });
        }
      });
    }
  });

  const [videoIsVisibile, setVideoIsVisible] = React.useState(false);

  console.log({ products, page });

  return (
    <main>
      <div className="hero">
        <Img alt="Noble Cuts" src={HeroImage} type="hero" loading="eager" />
      </div>

      <section className="gray" id="products">
        <div className="wrap narrow">
          <h2>Products</h2>

          <Icon.Cuts />
        </div>

        <div className="wrap">
          <div className="products">
            {products.map((product) => (
              <div className="product" key={product.id}>
                <h3>{product.title}</h3>
                <Img
                  src={require(`../public/images/uploads/${product.thumbnail}`)}
                  type="product"
                  loading="lazy"
                />
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <button className="button">Add to Cart</button>
              </div>
            ))}
          </div>
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
          <div style={{ visibility: videoIsVisibile ? "visible" : "hidden" }}>
            <YouTube
              containerClassName="video-container"
              videoId="FavUpD_IjVY"
              onReady={() => setVideoIsVisible(true)}
            />
          </div>
        </div>
      </section>

      {page.blocks.map((block, ind) => (
        <section key={ind}>
          <h2>{block.title}</h2>

          <div className="wrap narrow">
            <p className="blurb">{block.blurb}</p>
          </div>

          <div className="wrap">
            <div className="double">
              <Img
                alt={block.title}
                src={require(`../public/images/uploads/${block.photo1}`)}
                type="double"
                loading="lazy"
              />
              <Img
                alt={block.title}
                src={require(`../public/images/uploads/${block.photo2}`)}
                type="double"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      ))}

      {/* <section>
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
      </section> */}
    </main>
  );
};

export default HomePage;
