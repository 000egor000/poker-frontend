import React from "react";
import Head from "next/head";

type PropsType = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: PropsType) {
  return (
    <>
      <Head>
        <title>Poker Club for Gents</title>
        <meta
          name="description"
          content="Platform with the best poker training courses and the top poker software"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
}
