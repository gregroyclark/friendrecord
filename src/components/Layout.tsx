import Head from "next/head";
import React, { type ReactElement } from "react";

import Navbar from "./Navbar";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <html lang="en">
      <Head>
        <title>MyFriendBook</title>
        <meta name="description" content="Welcome to MyFriendBook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="">
        <Navbar />
        <main className="m-8 flex items-center justify-center">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
