/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface FormData {
  firstName: "";
  lastName: "";
  phoneNumber: "";
  email: "";
  notes: "";
}

const UpdateFriend: React.FC = () => {
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      void router.push("/Login");
    }
  }, [session]);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });

  const { id } = router.query;
  const friendId = Array.isArray(id) ? Number(id[0]) : Number(id);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const response = await fetch(`/api/getFriend?id=${friendId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Error fetching friend");
        }
        const friendData = await response.json();
        setFormData(friendData);
      } catch (error) {
        console.error("Error fetching friend: ", error);
      }
    };
    void fetchFriend();
  }, [id]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/updateFriend?id=${friendId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error updating friend");
      }
      const data = await response.json();
      console.log("Response: ", data);

      console.log(friendId);
      void router.push(`/showFriend/${friendId}`);
    } catch (error) {
      console.error("Error updating friend: ", error);
    }
  };

  if (!friendId) {
    return <div className="flex justify-center">Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="m-2 w-full space-y-4 bg-[#E4E2DD]  p-4 shadow-md md:w-1/2"
    >
      <h1 className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
        Update friend
      </h1>
      <hr className="mb-4" />
      <div>
        <label className="mb-1 flex flex-col text-sm font-semibold text-gray-600">
          First Name
          <input
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
        </label>
      </div>

      <div>
        <label className="mb-1 flex flex-col text-sm font-semibold text-gray-600">
          Last Name
          <input
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
        </label>
      </div>

      <div>
        <label className="mb-1 flex flex-col text-sm font-semibold text-gray-600">
          Phone Number
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
        </label>
      </div>

      <div>
        <label className="mb-1 flex flex-col text-sm font-semibold text-gray-600">
          Email
          <input
            type="text"
            value={formData.email}
            onChange={handleChange}
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
        </label>
      </div>

      <div>
        <label className="mb-1 flex flex-col text-sm font-semibold text-gray-600">
          Notes
          <input
            type="text"
            value={formData.notes}
            onChange={handleChange}
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
        </label>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="m-2 rounded-md bg-blue-700 p-2 text-white hover:bg-blue-800"
        >
          Update Friend
        </button>
        <button
          className="m-2 rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
          onClick={async () => {
            try {
              void (await fetch(`/api/deleteFriend?id=${friendId}`, {
                method: "DELETE",
              }));
              console.log("Successfully deleted friend");
              void router.push("/FriendList");
            } catch (error) {
              console.error("Error deleting friend: ", error);
            }
          }}
        >
          Delete Friend
        </button>
      </div>
    </form>
  );
};

export default UpdateFriend;
