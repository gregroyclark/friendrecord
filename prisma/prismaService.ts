/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  friendId: number,
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
      where: { id: friendId },
      data,
    });
    return updatedFriend;
  } catch (error) {
    console.error("Error updating friend:", error);
    throw error;
  }
};