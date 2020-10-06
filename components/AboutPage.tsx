import React from "react";
//import Img from "react-optimized-image";

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
        {/* <YouTube
            containerClassName="video-container"
            videoId="cB2WAR017jk"
            onReady={() => setVideoIsVisible(true)}
          /> */}
      </div>
    </section>

    {page.faqs?.map((faq) => (
      <section key={faq.question}>
        <h2>{faq.question}</h2>
        <p className="blurb">{faq.answer}</p>
      </section>
    ))}
  </main>
);

export default AboutPage;
