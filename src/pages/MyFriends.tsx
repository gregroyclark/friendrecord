/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from "react";

import Layout from "~/components/Layout";
import Link from "next/link";

interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}
const MyFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("api/myFriends", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Error fetching friends");
        }
        const friendsData = await response.json();
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    void fetchFriends();
  }, []);

  return (
    <Layout>
      <div className="mx-auto mt-8 bg-white p-4 shadow-md">
        <h1 className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
          My Friends
        </h1>
        <hr className="mb-4" />
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border-b p-2">First Name</th>
              <th className="border-b p-2">Last Name</th>
              <th className="border-b p-2">Phone Number</th>
              <th className="border-b p-2">Email</th>
              <th className="border-b p-2">Notes</th>
              <th className="border-b p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend) => (
              <tr key={friend.id}>
                <th className="border-b p-2">{friend.firstName}</th>
                <th className="border-b p-2">{friend.lastName}</th>
                <th className="border-b p-2">{friend.phoneNumber}</th>
                <th className="border-b p-2">{friend.email}</th>
                <th className="border-b p-2">{friend.notes}</th>
                <th>
                  <button className="p-2">
                    <Link href={`/showFriend/${friend.id}`}>Show</Link>
                  </button>
                  <button className="p-2">
                    <Link href={`/updateFriend/${friend.id}`}>edit</Link>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default MyFriends;
