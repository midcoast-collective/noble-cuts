import React from "react";

import { Icon } from "@components/index";

const Footer = () => (
  <footer>
    <div className="wrap">
      <div className="logo">
        <Icon.Logo fill="#ffffff" />
      </div>
      &copy;{new Date().getFullYear()} Noble Cuts. All rights reserved.
    </div>
  </footer>
);

export default Footer;
