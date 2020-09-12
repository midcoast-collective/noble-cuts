import React from "react";
import type { AppProps } from "next/app";

import "../styles/normalize.css";
import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
