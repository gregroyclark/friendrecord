/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type Friend } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "~/components/Layout";

const UpdateFriend = () => {
  const [friend, setFriend] = useState<Friend | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const friendId = Array.isArray(id) ? Number(id[0]) : Number(id);

  useEffect(() => {
    const fetchFriend = async () => {
      const response = await fetch(`/api/getFriend${friendId}`);
      if (!response.ok) {
        throw new Error("Error fetching friend");
      }
      const friendData = (await response.json()) as Friend | null;
      if (friendData) {
        setFriend(friendData);
        setFirstName(friendData.firstName);
        setLastName(friendData.lastName);
        setPhoneNumber(friendData.phoneNumber);
        setEmail(friendData.email);
        setNotes(friendData.notes);
      }
    };
    void fetchFriend();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/updateFriend${friendId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, phoneNumber, email, notes }),
    });
    if (!response.ok) {
      throw new Error("Error updating friend");
    }
    const updatedFriend = (await response.json()) as Friend;
    setFriend(updatedFriend);
  };

  if (!friend) {
    return <div className="flex justify-center">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button>Update Friend</button>
    </form>
  );
};

export default UpdateFriend;
