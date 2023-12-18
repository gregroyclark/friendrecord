import React, { useState } from "react";
import axios, { type AxiosResponse } from "axios";

interface FriendInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}

const AddFriend: React.FC = () => {
  const [formData, setFormData] = useState<FriendInfo>({
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
      const response: AxiosResponse<FriendInfo | undefined> = await axios.post<
        FriendInfo | undefined
      >("/api/addFriend", formData);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        item
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        item
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        item
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        item
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        item
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>
    </form>
  );
};

export default AddFriend;
