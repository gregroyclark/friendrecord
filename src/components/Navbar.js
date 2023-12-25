/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "../assets/friendrecord.png";

const Navbar = () => {
  return (
    <div className="fixed z-[100] flex h-24 w-full items-center bg-[#E4E2DD]">
      <div className="flex h-full w-full items-center justify-between p-4 shadow-md 2xl:px-16">
        <Link href={"/"}>
          <img
            // src="../../public/friendrecord.png"
            src={logo.src}
            alt="friendrecord logo"
            // fetchPriority="low"
            decoding="async"
            loading="lazy"
            height={150}
            width={150}
          />
          {/* <Image src={"/friendrecord.png"} alt={"friendrecord logo"}></Image> */}
          {/* <Image
            src={logo}
            alt={"friendrecord logo"}
            width={250}
            height={250}
            className="m-2 flex items-center justify-center font-semibold"
          /> */}
        </Link>
        <div className="flex items-center justify-end">
          <ul className="flex flex-row items-center justify-between">
            <li className="m-2 ml-10 flex items-center justify-center rounded-md border p-2 font-medium font-semibold shadow-md hover:border-b">
              <Link href={"/AddFriend"}>Add Friend</Link>
            </li>
            <li className="m-2 ml-10 flex items-center justify-center rounded-md border p-2 font-medium font-semibold shadow-md hover:border-b">
              <Link href={"/FriendList"}>My Friends</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
