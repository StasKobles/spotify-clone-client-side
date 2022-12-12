import { AppProps } from "next/app";
import React from "react";

import { wrapper } from "../store";

class MyApp extends React.Component<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
