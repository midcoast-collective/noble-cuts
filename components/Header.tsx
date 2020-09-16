import React from "react";
import Link from "next/link";

import { Icon } from "@components/index";

type HeaderProps = {};

const Header = ({}: Readonly<HeaderProps>) => {
  return (
    <header>
      <nav>
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
      </nav>
    </header>
  );
};

export default Header;
