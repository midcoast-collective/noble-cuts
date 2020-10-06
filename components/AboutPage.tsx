import React from "react";
import Img from "react-optimized-image";

import { Page } from "../api/getPagesData";

type AboutPageProps = {
  page: Partial<Page>;
};

const AboutPage = ({ page }: Readonly<AboutPageProps>): JSX.Element => (
  <main>
    <section>
      <h2>{page.title}</h2>

      <div className="wrap narrow">
        <p className="blurb">{page.intro}</p>
      </div>

      <div className="wrap">
        <Img
          alt={page.title}
          src={require(`../public/images/uploads/${page.photo}`)}
          loading="lazy"
          type="block"
        />
      </div>
    </section>

    <section>
      <div className="wrap">
        <h2>FAQs</h2>
        {page.faqs?.map((faq) => (
          <div className="blurb">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default AboutPage;
