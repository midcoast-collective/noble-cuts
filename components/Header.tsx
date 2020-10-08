import React from "react";
import Link from "next/link";

import { Icon } from "@components/index";

type HeaderProps = {};

const Header = ({}: Readonly<HeaderProps>) => {
  return (
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
            <Icon.Logo fill="#10103e" />
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
            <Icon.Logo fill="#10103e" />
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
  );
};

export default Header;
