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

/*
    ==========================================

    test suites for prismaService.ts

    ==========================================

  */
void describe("prismaService", async () => {
  /*
    ==========================================

    test suites for createFriend prismaService

    ==========================================

  */

  void describe("createFriend", async () => {
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
  });

  /*
    ==========================================

    test suites for getAllFriends prismaService

    ==========================================

  */

  void describe("getAllFriends", () => {
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
  });

  /*
    ==========================================

    test suites for getFriend prismaService

    ==========================================

  */

  void describe("getFriend", async () => {
    // happy path for getFriend service
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

    // edge case, query is null
    it("should return null when friend does not exist", async () => {
      prisma.friend.findUniqueOrThrow = jest.fn().mockResolvedValue(null);
      const friend = await getFriend(1);
      expect(friend).toBeNull();
    });

    // edge case, id is NaN
    it("should return an error when id is not a number", async () => {
      try {
        await getFriend("invalidId");
      } catch (error) {
        expect(error).toBeInstanceOf(error);
      }
    });

    // edge case, database error
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

  /*
    ==========================================

    test suites for updateFriend prismaService

    ==========================================

  */

  void describe("updateFriend", async () => {
    // test cases
  });

  /*
    ==========================================

    test suites for deletesFriend prismaService

    ==========================================

  */

  void describe("deleteFriend", async () => {
    // test cases
  });
});
