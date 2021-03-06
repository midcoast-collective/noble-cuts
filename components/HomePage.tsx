import React from "react";
import YouTube from "react-youtube";
import Img from "react-optimized-image";

import { Product } from "../api/getProductsData";
import { Page } from "../api/getPagesData";
import { Icon } from "@components/index";
import HeroImage from "../public/images/home-page-hero.jpg";

type HomePageProps = {
  addProduct: (product: Product) => void;
  cart?: Product[];
  products: Product[];
  page: Partial<Page>;
};

const HomePage = ({
  addProduct,
  cart = [],
  products,
  page,
}: Readonly<HomePageProps>): JSX.Element => {
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

  const [videoIsVisible, setVideoIsVisible] = React.useState(false);

  return (
    <main>
      <div className="hero">
        <Img alt="Noble Cuts" src={HeroImage} type="hero" />
      </div>

      <section className="gray" id="products">
        <div className="wrap narrow">
          <h2>Products</h2>

          <Icon.Cuts />
        </div>

        <div className="wrap">
          <div className="products">
            {products
              .sort((a, b) => a.order - b.order)
              .map((product) => {
                const cartProduct = cart.find(
                  (productInCart) => productInCart.title === product.title
                );
                const cartProductQuantity = cartProduct
                  ? cartProduct.quantity
                  : 0;

                return (
                  <div className="product" key={product.id}>
                    <h3>{product.title}</h3>
                    <Img
                      src={require(`../public/images/uploads/${product.thumbnail}`)}
                      type="product"
                    />
                    <p>
                      <strong>{product.priceperpound}</strong>
                    </p>
                    <p className="description">{product.description}</p>
                    <button
                      className="button"
                      onClick={() => addProduct(product)}
                    >
                      {cartProductQuantity < 1
                        ? `Add to Cart`
                        : `${cartProductQuantity} Added to Cart`}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section>
        <h2>{page.title}</h2>

        <div className="wrap">
          <div style={{ visibility: videoIsVisible ? "visible" : "hidden" }}>
            <YouTube
              containerClassName="video-container"
              videoId="cB2WAR017jk"
              onReady={() => setVideoIsVisible(true)}
            />
          </div>
        </div>
      </section>

      {page.blocks?.map((block) => (
        <section key={block.title}>
          <h2>{block.title}</h2>

          <div className="wrap narrow">
            <p className="blurb">{block.blurb}</p>
          </div>

          <div className="wrap">
            <Img
              alt={block.title}
              src={require(`../public/images/uploads/${block.photo}`)}
              type="block"
            />
          </div>
        </section>
      ))}
    </main>
  );
};

export default HomePage;
