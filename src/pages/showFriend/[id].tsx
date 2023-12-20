/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "~/components/Layout";

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
        const response = await fetch(`/api/getFriend/${friendId}`, {
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
        <h1 className="font-semibold">Friend</h1>
        <hr />
        <h2 className="m-4">First Name: {friend?.firstName}</h2>
        <h2 className="m-4">Last Name: {friend?.lastName}</h2>
        <p className="m-4">Phone Number: {friend?.phoneNumber}</p>
        <p className="m-4">Email: {friend?.email}</p>
        <p className="m-4">Notes: {friend?.notes}</p>
        <hr />
        <button
          className="p-2"
          onClick={() => {
            void fetch(`api/deleteFriend${friend?.id}`, { method: "DELETE" });
          }}
        >
          delete
        </button>
      </div>
    </>
  );
};

export default ShowFriend;
