import React from "react";
import Link from "next/link";

import { Icon } from "@components/index";

type HeaderProps = {};

const Header = ({}: Readonly<HeaderProps>) => {
  return (
    <>
      <div className="hairline">
        <div className="wrap">
          <div className="hairline-links">
            <span>Contact: </span>
            <a href="tel:316-708-2134">(316) 708-2134</a>
            <a href="mailto:ashley@noblecutsmeat.com">
              ashley@noblecutsmeat.com
            </a>
          </div>
        </div>
      </div>
      <header>
        <nav className="desktop-only">
          <Link href="/">
            <a>HOME</a>
          </Link>
          <Link href="/about/">
            <a>ABOUT</a>
          </Link>
          <Link href="/">
            <a className="logo">
              <Icon.HeaderLogo />
            </a>
          </Link>
          <Link href="/#products">
            <a>SHOP</a>
          </Link>
          <Link href="/cart/">
            <a>CART</a>
          </Link>
        </nav>

        <nav className="mobile-only">
          <Link href="/">
            <a className="logo">
              <Icon.HeaderLogo />
            </a>
          </Link>
        </nav>

        <nav className="mobile-only">
          <Link href="/">
            <a>HOME</a>
          </Link>
          <Link href="/about/">
            <a>ABOUT</a>
          </Link>
          <Link href="/#products">
            <a>SHOP</a>
          </Link>
          <Link href="/cart/">
            <a>CART</a>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
