import { Container } from "@mui/system";
import Head from "next/head";
import React, { ReactElement } from "react";

import Navbar from "../components/Navbar";
import Player from "../components/Player";

interface MainLayoutProps {
  title?: string;
  children?: React.ReactNode;
  description?: string;
  keywords?: string;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Music platform"}</title>
        <meta
          name="description"
          content={"Pet project in Nest and Next JS. " + description}
        />
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content={keywords || "Music, tracks, artists"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
