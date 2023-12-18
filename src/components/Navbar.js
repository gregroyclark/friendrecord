import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed z-[100] flex h-24 w-full items-center bg-[#f8f8f8]">
      <div className="flex h-full w-full items-center justify-between p-4 shadow-md 2xl:px-16">
        <Link href={"/"}>
          <h1 className="m-4 flex items-center justify-center font-semibold">
            MyFriendBook
          </h1>
        </Link>
        <div className="flex items-center justify-end">
          <ul className="flex flex-row justify-between">
            <li className="m-4 ml-10 flex items-center justify-center text-sm uppercase hover:border-b">
              <Link href={"/AddFriend"}>Add Friend</Link>
            </li>
            <li className="m-4 ml-10 flex items-center justify-center text-sm uppercase hover:border-b">
              <Link href={"/MyFriends"}>My Friends</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
