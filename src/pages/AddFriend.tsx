/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { useSession } from "next-auth/react";

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes: string;
};

const AddFriend: React.FC = () => {
  const router = useRouter();
  // const { data: session } = useSession();
  const session = typeof window !== "undefined" ? useSession() : null;

  useEffect(() => {
    if (!session) {
      void router.push("/Login");
    }
  }, []);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });

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
      if (session && session.status === "authenticated" && session.data) {
        const response = await fetch("/api/addFriend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, userId: session.data.user.id }),
        });

        if (!response.ok) {
          throw new Error("Error adding friend");
        }
        const data = await response.json();
        console.log("Response:", data);

        void router.push(`/showFriend/${data.id}`);
      } else {
        throw new Error("No user session found");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };
  return (
    <>
      <div className="m-2 mt-8 w-full bg-[#E4E2DD] p-4 shadow-md md:w-1/2">
        <h1 className="mb-4 flex justify-center text-lg font-semibold text-gray-600">
          Add a new friend!
        </h1>
        <hr className="mb-4" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 flex flex-col text-sm font-semibold text-gray-600">
              First Name
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="rounded-md border border-gray-300 bg-gray-50 p-2"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 flex flex-col text-sm font-semibold text-gray-600">
              Last Name
              <input
                type="text"
                name="lastName"
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
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="rounded-md border border-gray-300 bg-gray-50 p-2"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 flex flex-col text-sm font-semibold text-gray-600">
              Email
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-md border border-gray-300 bg-gray-50 p-2"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 flex flex-col text-sm font-semibold text-gray-600">
              Notes
              <textarea
                name="notes"
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
              Add Friend
            </button>
            <Link href={"/FriendList"}>
              <button className="m-2 rounded-md bg-gray-500 p-2 text-white hover:bg-gray-600">
                Friend List
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFriend;
