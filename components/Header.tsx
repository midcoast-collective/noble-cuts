import React from "react";
import YouTubeEmbed from "react-youtube-embed";

import * as Icon from "@components/Icon";

type HeaderProps = {
  url?: string;
};

const Header = ({ url = "https://nextjs.org" }: Readonly<HeaderProps>) => {
  const encodedUrl = encodeURIComponent(url);

  return (
    <header>
      <div className="header">
        <div className="wrap">
          <div className="crown">
            <div className="logo">
              <Icon.Logo />
            </div>

            <div className="share">
              <span>Share This:</span>
              <a
                className="share-link"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon.Facebook />
              </a>
              <a
                className="share-link"
                href={`https://twitter.com/intent/tweet?text=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon.Twitter />
              </a>
            </div>
          </div>

          <div className="banner">
            <h1>Be a Champion of Commerce. Decide local.</h1>
            <p>
              When you shop or dine locally you help friends, neighbors and our
              community overall. The need to shop local has never been greater.
              Ditch Amazon and decide local.
            </p>

            <YouTubeEmbed id="AogN7XQruZY" />
          </div>
        </div>

        <svg
          className="wave"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{
            height: "calc(var(--rhythm) * 8)",
            width: "100%",
          }}
        >
          <path
            d="M-0.57,61.67 C181.15,151.47 310.38,-0.50 500.00,84.37 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "var(--color-white)" }}
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;
