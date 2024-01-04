/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import prisma from "./prisma";

import { hash, compare } from "bcryptjs";
import { type Prisma } from "@prisma/client";

export const register = async (email: string, password: string) => {
  const hashedPassword = await hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, hashedPassword } as Prisma.userCreateInput,
    });

    return { user: user };
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { userId: true, email: true, name: true, hashedPassword: true },
  });

  if (!user) {
    console.log("No user found");
    throw new Error("No user found with this email");
  }

  console.log(`Found user: ${JSON.stringify(user)}`);

  const validPassword = await compare(password, user.hashedPassword);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  return { userId: user.userId, email: user.email, name: user.name };
};

export const createFriend = async (data: {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}) => {
  try {
    const newFriend = await prisma.friend.create({
      data: { ...data },
    });
    return newFriend;
  } catch (error) {
    console.error("Error creating friend:", error);
    throw error;
  }
};

export const getAllFriends = async (id, userId) => {
  try {
    const friends = await prisma.friend.findMany({
      where: {
        id,
        userId,
      },
    });
    return friends;
  } catch (error) {
    console.error("Error finding friends:", error);
    throw error;
  }
};

export const getFriend = async (id, userId) => {
  console.log("getFriend id: ", id);
  try {
    const friend = await prisma.friend.findUniqueOrThrow({
      where: {
        id: id,
        userId,
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
  userId,
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
      where: { id, userId },
      data,
    });
    console.log(updatedFriend);
    return updatedFriend;
  } catch (error) {
    console.error("Error updating friend:", error);
    throw error;
  }
};

export const deleteFriend = async (id, userId) => {
  try {
    await prisma.friend.delete({
      where: { id: id, userId },
    });
  } catch (error) {
    console.error("error deleting friend: ", error);
    throw error;
  }
};
