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
                <p>{product.description}</p>
                <button className="button">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Right Nutrition at the Right Time
      Ya herd right. We feed our cows specific nutrients at specific times to ensure they mature into the best darn cows they can be.

      Stress-free Cows
      We care for our cattle in every sense of the word. Less stress = better beef. Period.

      Customers of Our Product
      The product we deliver to your door step is what we put on our family table every single week. We love it and so will your family. */}

      <section>
        <h2>{page.title}</h2>

        <div className="wrap narrow">
          <p className="blurb">{page.intro}</p>
        </div>

        <div className="wrap">
          <div style={{ visibility: videoIsVisibile ? "visible" : "hidden" }}>
            <YouTube
              containerClassName="video-container"
              videoId="cB2WAR017jk"
              onReady={() => setVideoIsVisible(true)}
            />
          </div>
        </div>
      </section>

      {page.blocks.map((block) => (
        <section key={block.title}>
          <h2>{block.title}</h2>

          <div className="wrap narrow">
            <p className="blurb">{block.blurb}</p>
          </div>

          <div className="wrap">
            <Img
              alt={block.title}
              src={require(`../public/images/uploads/${block.photo}`)}
              loading="lazy"
              type="block"
            />
          </div>
        </section>
      ))}
    </main>
  );
};

export default HomePage;
