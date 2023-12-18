import React, { type ReactElement } from "react";
import Navbar from "./Navbar";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div>
      <Navbar />
      <main className="absolute left-0 top-0 h-screen w-full bg-white/10">
        <div className="m-auto flex h-full w-full max-w-[700px] flex-col items-start justify-center">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
