/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe } from "node:test";
// import { expect, jest } from "@jest/globals";

import {
  createFriend,
  getAllFriends,
  getFriend,
  updateFriend,
  deleteFriend,
} from "./prismaService";

import prisma from "./prisma";

void describe("prismaService", async () => {
  it("should create a friend", async () => {
    const friendData = {
      firstName: "Greg",
      lastName: "Clark",
      phoneNumber: "1234567890",
      email: "test@email.com",
      notes: "This is a jest unit test",
    };
    const newFriend = await createFriend(friendData);
    expect(newFriend).toEqual(expect.objectContaining(friendData));
  });

  it("should get all friends", async () => {
    prisma.friend.findMany = jest.fn().mockResolvedValue([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "john.doe@email.com",
        notes: "This is John Doe.",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        phoneNumber: "0987654321",
        email: "jane.doe@email.com",
        notes: "This is Jane Doe.",
      },
    ]);

    const friends = await getAllFriends();
    expect(friends).toEqual([
      expect.objectContaining({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "john.doe@email.com",
        notes: "This is John Doe.",
      }),
      expect.objectContaining({
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        phoneNumber: "0987654321",
        email: "jane.doe@email.com",
        notes: "This is Jane Doe.",
      }),
    ]);
  });

  it("should get a friend", async () => {
    // mock the prisma.friend.findUniqueOrThrow function
    prisma.friend.findUniqueOrThrow = jest.fn().mockResolvedValue({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      email: "john.doe@email.com",
      notes: "This is John Doe.",
    });

    const friend = await getFriend(1);
    expect(friend).toEqual(
      expect.objectContaining({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "john.doe@email.com",
        notes: "This is John Doe.",
      }),
    );
  });

  it("should return null when friend does not exist", async () => {
    prisma.friend.findUniqueOrThrow = jest.fn().mockResolvedValue(null);
    const friend = await getFriend(1);
    expect(friend).toBeNull();
  });

  it("should return an error when id is not a number", async () => {
    try {
      await getFriend("invalidId");
    } catch (error) {
      expect(error).toBeInstanceOf(error);
    }
  });

  it("should return an error when there is a database error", async () => {
    prisma.friend.findUniqueOrThrow = jest
      .fn()
      .mockResolvedValue(new Error("Database error"));
  });
  try {
    await getFriend(1);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});
