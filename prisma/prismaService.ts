/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "./prisma";

export const createUser = async (data: {
  id: string;
  name: string;
  email: string;
}) => {
  try {
    const newUser = await prisma.user.create({
      data,
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user: ", error);
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

export const updateFriend = async (
  // friendId: number,
  id: number,
  data: {
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

export const deleteFriend = async (id) => {
  try {
    await prisma.friend.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error("error deleting friend: ", error);
    throw error;
  }
};
