import React from "react";
import Link from "next/link";

import { Icon } from "@components/index";

const Footer = () => (
  <footer>
    <nav>
      <Link href="/">
        <a>HOME</a>
      </Link>
      <Link href="/about/">
        <a>ABOUT</a>
      </Link>
      <Link href="/#products">
        <a>SHOP</a>
      </Link>
    </nav>

    <div className="logo">
      <Icon.Logo fill="#ffffff" />
    </div>

    <p>&copy;{new Date().getFullYear()} Noble Cuts. All rights reserved.</p>
  </footer>
);

export default Footer;
