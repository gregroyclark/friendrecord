/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "./prisma";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

/* 
    this is the "register/sign up" function.
    consider if HTTP or UI resemblance is an easier mental model.
    leaning toward refactoring createUser => register.
*/
export const register = async (data: {
  id;
  userId: string;
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await hash(data.password, 10);
  try {
    const newUser = await prisma.user.create({
      data: { ...data, hashedPassword },
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY);
    return { user: newUser, token };
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("No user found with this email");
  }

  const validPassword = await compare(password, user.hashedPassword);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
  return { user, token };
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
      data: { ...data, userId: data.userId },
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
