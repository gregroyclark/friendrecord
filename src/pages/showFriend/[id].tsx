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
  console.log("id: ", typeof id, id);

  const friendId = Array.isArray(id) ? Number(id[0]) : Number(id);
  console.log("friendId: ", typeof friendId, id);

  useEffect(() => {
    const fetchFriend = async () => {
      const response = await fetch(`/api/getFriend/${friendId}`);
      console.log(response);
      if (!response.ok) {
        throw new Error("Error fetching friend");
      }
      const friendData = await response.json();
      console.log("friendData: ", friendData);
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
