/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // happy path for updateFriend service
    it("should update a friend", async () => {
      // have to create a friend first, not connected to db
      const newFriend = await createFriend({
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "john.doe@email.com",
        notes: "This is John Doe.",
      });

      // update the friend
      const updatedFriend = await updateFriend(newFriend.id, {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@email.com",
        notes: "This is Jane Doe.",
      });

      // check if the friend was updated
      expect(updatedFriend).toEqual(
        expect.objectContaining({
          firstName: "Jane",
          lastName: "Doe",
          phoneNumber: "1234567890",
          email: "jane.doe@email.com",
          notes: "This is Jane Doe.",
        }),
      );
    });

    // edge case, friend does not exist
    it("should return an error when friend does not exist", async () => {
      try {
        await updateFriend(1, { firstName: "Jane" });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    //edge case, id is NaN
    it("should return an error when id is not a number", async () => {
      try {
        await updateFriend("invalidId" as any, { firstName: "Jane" });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    // edge case, database error
    it("should return an error when there is a database error", async () => {
      prisma.friend.update = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
      try {
        await updateFriend(1, { firstName: "Jane" });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  /*
    ==========================================

    test suites for deleteFriend prismaService

    ==========================================

  */

  void describe("deleteFriend", async () => {
    // test cases
  });
});
