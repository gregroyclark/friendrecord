import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { type Friend } from "@prisma/client";
import { getFriend } from "prisma/prismaService";

const ShowFriend = () => {
  const [friend, setFriend] = useState<Friend | null>(null);

  const router = useRouter();
  const { id } = router.query;
  const friendId = Array.isArray(id) ? Number(id[0]) : Number(id);

  useEffect(() => {
    const fetchFriend = async () => {
      const friendData = await getFriend(friendId);
      setFriend(friendData);
    };
    void fetchFriend();
  }, [id]);

  if (!friend) {
    return <div>Loading...</div>;
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
