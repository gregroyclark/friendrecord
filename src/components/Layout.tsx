import React, { type ReactElement } from "react";
import Navbar from "./Navbar";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main className="m-8 flex h-screen items-center justify-center">
          {children}
        </main>
      </body>
    </html>
    // <div>
    //   <Navbar />
    //   <main className="absolute left-0 top-0 flex min-h-screen w-full bg-white/10">
    //     <div className="m-auto h-full w-full max-w-[700px] flex-col items-start justify-center">
    //       {children}
    //     </div>
    //   </main>
    // </div>
  );
};

export default Layout;
