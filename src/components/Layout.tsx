import { type Metadata } from "next";
import React, { type ReactElement } from "react";

import Navbar from "./Navbar";

export const metadata: Metadata = {
  title: "friendrecord",
  description:
    "Welcome to friendrecord! Demo React/Next.js, MySQL CRUD web app.",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Navbar />
      <main className="m-8 flex items-center justify-center">{children}</main>
    </>
  );
};

export default Layout;
