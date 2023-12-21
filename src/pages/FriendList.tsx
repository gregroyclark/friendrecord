/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}

const FriendList = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("api/getAllFriends", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Error fetching friends");
        }
        const friendsData = await response.json();
        console.log("getAllFriends: ", friendsData);
        setFriends(friendsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    void fetchFriends();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="m-2 mt-8 bg-white p-4 shadow-md md:w-1/2">
        <h1 className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
          My Friends
        </h1>
        <hr className="mb-4" />
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border-b p-2">First Name</th>
              <th className="border-b p-2">Last Name</th>
              <th className="hidden border-b p-2">Phone Number</th>
              <th className="hidden border-b p-2">Email</th>
              <th className="border-b p-2">Notes</th>
              <th className="border-b p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend) => (
              <tr key={friend.id}>
                <th className="border-b p-2">{friend.firstName}</th>
                <th className="border-b p-2">{friend.lastName}</th>
                <th className="hidden border-b p-2">{friend.phoneNumber}</th>
                <th className="hidden border-b p-2">{friend.email}</th>
                <th className="border-b p-2">{friend.notes}</th>
                <th>
                  <button className="p-2">
                    <Link href={`/showFriend/${friend.id}`}>show</Link>
                  </button>
                  <button className="hidden p-2">
                    <Link href={`/updateFriend/${friend.id}`}>edit</Link>
                  </button>
                  <button
                    className="p-2"
                    onClick={async () => {
                      try {
                        void (await fetch(
                          `/api/deleteFriend?id=${friend?.id}`,
                          {
                            method: "DELETE",
                          },
                        ));
                        console.log("Successfully deleted friend");
                        setFriends(friends.filter((f) => f.id !== friend.id));
                      } catch (error) {
                        console.error("Error deleting friend: ", error);
                      }
                    }}
                  >
                    delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FriendList;
