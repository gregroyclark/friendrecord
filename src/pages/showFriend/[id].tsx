/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}

const ShowFriend = () => {
  const [friend, setFriend] = useState<Friend | null>(null);

  const router = useRouter();
  const { id } = router.query;
  console.log("showFriend id: ", typeof id, id);

  const friendId = Array.isArray(id) ? Number(id[0]) : Number(id);
  console.log(
    "showFriend friendId, before useEffect: ",
    typeof friendId,
    friendId,
  );

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const response = await fetch(`/api/getFriend?id=${friendId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Error fetching friend");
        }
        const friendData = await response.json();
        console.log("friendData: ", friendData);
        setFriend(friendData);
      } catch (error) {
        console.error("Error fetching friend: ", error);
      }
    };
    void fetchFriend();
  }, [id]);

  // const friendId = Array.isArray(id) ? Number(id[0]) : Number(id);
  console.log("showFriend friendId, before loading: ", typeof id, id);

  if (!id) {
    console.log("no id");
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  console.log("showFriend id, after loading: ", typeof id, id);

  console.log("showFriend friendId, after loading: ", typeof id, id);

  return (
    <>
      <div className="m-4 w-auto rounded-md border p-4">
        <h1 className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
          Friend
        </h1>
        <hr />
        <h2 className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
          First Name: {friend?.firstName}
        </h2>
        <h2 className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
          Last Name: {friend?.lastName}
        </h2>
        <p className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
          Phone Number: {friend?.phoneNumber}
        </p>
        <p className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
          Email: {friend?.email}
        </p>
        <p className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
          Notes: {friend?.notes}
        </p>
        <hr />
        <button className="m-4 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600">
          <Link href={`/updateFriend/${friendId}`}>Update</Link>
        </button>
        <button
          className="m-4 rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
          onClick={async () => {
            try {
              void (await fetch(`/api/deleteFriend?id=${friendId}`, {
                method: "DELETE",
              }));
              console.log("Successfully deleted friend");
              void router.push("/MyFriends");
            } catch (error) {
              console.error("Error deleting friend: ", error);
            }
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ShowFriend;
