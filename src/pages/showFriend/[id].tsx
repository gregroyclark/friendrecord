import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { type Friend } from "@prisma/client";
import Layout from "~/components/Layout";

const ShowFriend = () => {
  const [friend, setFriend] = useState<Friend | null>();

  const router = useRouter();
  const { id } = router.query;
  console.log("id: ", id);

  const friendId = Array.isArray(id) ? Number(id[0]) : Number(id);
  console.log("friendId: ", friendId);

  useEffect(() => {
    const fetchFriend = async () => {
      const response = await fetch(`/api/getFriend/${friendId}`);
      if (!response.ok) {
        throw new Error("Error fetching friend");
      }
      const friendData = (await response.json()) as Friend | null;
      console.log(friendData);
      setFriend(friendData);
    };
    void fetchFriend();
  }, [id]);

  if (!friend) {
    return (
      <Layout>
        <div className="flex items-center justify-center">Loading...</div>
      </Layout>
    );
  }

  return (
    <div>
      <h1>
        {friend.firstName} {friend.lastName}
      </h1>
      <p>Phone Number: {friend.phoneNumber}</p>
      <p>Email: {friend.email}</p>
      <p>Notes: {friend.notes}</p>
    </div>
  );
};

export default ShowFriend;
