/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";

import { createFriend } from "prisma/prismaService";

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes: string;
};

const AddFriend: React.FC = () => {
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
      const response = await createFriend(formData);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log("Response:", response);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };
  return (
    <div className="mx-auto mt-8 max-w-md bg-white p-4 shadow-md">
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
              className="rounded-md border border-gray-300 p-2"
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
              className="rounded-md border border-gray-300 p-2"
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
              className="rounded-md border border-gray-300 p-2"
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
              className="rounded-md border border-gray-300 p-2"
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
              className="rounded-md border border-gray-300 p-2"
            />
          </label>
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-700 p-2 text-white hover:bg-blue-800"
        >
          Add Friend
        </button>
      </form>
    </div>
  );
};

export default AddFriend;
