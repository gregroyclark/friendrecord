/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "./prisma";

export const getAllFriends = async () => {
  try {
    const friends = await prisma.friend.findMany();
    return friends;
  } catch (error) {
    console.error("Error finding friends:", error);
    throw error;
  }
};

export const getFriend = async (id) => {
  console.log("getFriend id: ", id);
  try {
    const friend = await prisma.friend.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    console.log(friend);
    return friend;
  } catch (error) {
    console.error("Error finding friend:", error);
    throw error;
  }
};

export const createFriend = async (data: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}) => {
  try {
    const newFriend = await prisma.friend.create({
      data,
    });
    return newFriend;
  } catch (error) {
    console.error("Error creating friend:", error);
    throw error;
  }
};

export const updateFriend = async (
  // friendId: number,
  id: number,
  data: {
    id?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    notes?: string;
  },
) => {
  try {
    const updatedFriend = await prisma.friend.update({
      where: { id },
      data,
    });
    console.log(updatedFriend);
    return updatedFriend;
  } catch (error) {
    console.error("Error updating friend:", error);
    throw error;
  }
};
