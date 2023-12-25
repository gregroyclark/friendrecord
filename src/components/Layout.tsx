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
      <main className="flex h-screen w-full items-center justify-center bg-[#E4E2DD]">
        {children}
      </main>
    </>
  );
};

export default Layout;
