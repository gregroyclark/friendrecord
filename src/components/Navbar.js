/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "../assets/friendrecord-small.png";

const Navbar = () => {
  return (
    <div className="fixed z-[100] mb-4 flex h-24 w-full items-center">
      <div className="flex h-full w-full items-center justify-between bg-[#E4E2DD] p-2 shadow-md 2xl:px-16">
        <Link href={"/"}>
          <img
            src={logo.src}
            alt="friendrecord logo"
            decoding="async"
            loading="lazy"
            height={150}
            width={150}
            className="m-2"
          />
        </Link>
        <div className="flex items-center justify-end">
          <ul className="flex flex-row items-center justify-between">
            <li className="m-2 ml-10 flex items-center justify-center rounded-md border p-2 font-semibold shadow-md hover:border-b">
              <Link href={"/AddFriend"}>Add Friend</Link>
            </li>
            <li className="m-2 ml-10 flex items-center justify-center rounded-md border p-2 font-semibold shadow-md hover:border-b">
              <Link href={"/FriendList"}>My Friends</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
