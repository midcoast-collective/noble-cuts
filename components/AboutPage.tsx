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

      <div className="wrap">
        <Img
          alt={page.title}
          src={require(`../public/images/uploads/${page.photo}`)}
          type="block"
        />
      </div>

      <div className="wrap narrow">
        <p className="blurb about">
          Hi there! We’re Andy and Ashley Greenwood and we own, operate, and
          live on a century farm in Northwest Missouri with our 2 kiddos.
          <br />
          <br />
          For those of you who may not know what a century farm is, it simply means
          we have had been recognized for having this farmland in our family for
          at least 100 years. We have been working the soil when times were good
          and even when they weren’t so good, like during The Great Depression.
          <br />
          <br />
          What that means to you -- we are here to stay; we aren’t going
          anywhere.
          <br />
          <br />
          We started Noble Cuts Meat Co., with one goal in mind: deliver
          American-grown, beef-goodness to your family’s table. We take our
          service to our land and to our customers seriously.
          <br />
          <br />
          You can taste it in every bite. We look forward to meeting you soon.
          <br />
          <br />
          Thank you,
          <br />
          <br />
          Ashley & Andy
        </p>
      </div>
    </section>

    <section>
      <div className="wrap">
        <h2>FAQs</h2>
        {page.faqs?.map((faq) => (
          <div className="blurb" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default AboutPage;
