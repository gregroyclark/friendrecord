/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { describe } from "node:test";

import prisma from "./prisma";
import {
  createFriend,
  getAllFriends,
  getFriend,
  updateFriend,
  deleteFriend,
  register,
} from "./prismaService";

/*
    ==========================================

    test suites for prismaService.ts
    separated by service

    ==========================================

  */

void describe("prismaService", async () => {
  /*

    ==========================================

    test suites for register prismaService

    ==========================================

  */

  void describe("register", async () => {
    it("should register a user", async () => {
      const userData = {
        id: 1,
        userId: "abc123",
        name: "John Doe",
        phone: "1234567890",
        email: "john.doe@example.com",
        password: "password",
      };

      prisma.user.create = jest.fn().mockResolvedValue(userData);

      const newUser = await register("john.dow@example.com", "password");
      expect(newUser).toEqual(expect.objectContaining(userData));
    });

    it("should throw an error when there is a database error", async () => {
      prisma.user.create = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
    });

    try {
      await register("john.dow@example.com", "password");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  /*

    ==========================================

    test suites for login prismaService

    ==========================================

  */

  // void describe("login", () => {
  //   it("should log in a user", async () => {
  //     const user = {
  //       id: 1,
  //       userId: "abc123",
  //       name: "John Doe",
  //       email: "john.doe@example.com",
  //       hashedPassword:
  //         "$2b$10$QY2WX9w9Zwu6C/Fq5RpL6UHkz9iK3JO9NKZQKqGhT8Z3y6jU2Z6a",
  //     };

  //     prisma.user.findUnique = jest.fn().mockResolvedValue(user);
  //     // bcrypt.
  //   });
  // });

  /*

    ==========================================

    test suites for createFriend prismaService

    ==========================================

  */

  void describe("createFriend", async () => {
    // happy path for createFriend service
    it("should create a friend", async () => {
      const friendData = {
        firstName: "Greg",
        lastName: "Clark",
        phoneNumber: "1234567890",
        email: "test@email.com",
        notes: "This is a jest unit test",
        userId: "",
      };
      const newFriend = await createFriend(friendData);
      expect(newFriend).toEqual(expect.objectContaining(friendData));
    });

    // edge case, missing data
    // fields aren't currently required - this test is just for fun
    // it("should return an error when data is missing", async () => {
    //   try {
    //     await createFriend({
    //       firstName: "",
    //       lastName: "",
    //       phoneNumber: "",
    //       email: "",
    //       notes: "",
    //     });
    //   } catch (error) {
    //     expect(error).toBeInstanceOf(Error);
    //   }
    // });

    // edge case, database error
    it("should return an error when there is a database error", async () => {
      const createSpy = jest.spyOn(prisma.friend, "create");
      createSpy.mockImplementation(() => {
        return Promise.reject(new Error("Database error")) as any;
      });
      try {
        await createFriend({
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          email: "john.doe@email.com",
          notes: "This is John Doe unit test.",
          userId: "",
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }

      createSpy.mockRestore(); // restore the original function after the test

      /*
      mocking prisma.friend.create directly affects all tests that follow in the same suite.
      it always rejects with an error. be careful with this!
      ex:
      prisma.friend.create = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));      
      */
    });
  });

  /*

    ==========================================

    test suites for getAllFriends prismaService

    ==========================================

  */

  void describe("getAllFriends", () => {
    // happy path for getAllFriends service
    it("should get all friends", async () => {
      prisma.friend.findMany = jest.fn().mockResolvedValue([
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          email: "john.doe@email.com",
          notes: "This is John Doe unit test",
          userId: "abc123",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Doe",
          phoneNumber: "0987654321",
          email: "jane.doe@email.com",
          notes: "This is Jane Doe. unit test",
          userId: "abc123",
        },
      ]);

      const friends = await getAllFriends({}, {});
      expect(friends).toEqual([
        expect.objectContaining({
          id: 1,
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          email: "john.doe@email.com",
          notes: "This is John Doe unit test",
          userId: "abc123",
        }),
        expect.objectContaining({
          id: 2,
          firstName: "Jane",
          lastName: "Doe",
          phoneNumber: "0987654321",
          email: "jane.doe@email.com",
          notes: "This is Jane Doe unit test",
          userId: "abc123",
        }),
      ]);
    });
    // edge cases for getAllFriends service
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
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "john.doe@email.com",
        notes: "This is John Doe unit test.",
        userId: "abc123",
      });

      const friend = await getFriend(1, "abc123");
      expect(friend).toEqual(
        expect.objectContaining({
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "1234567890",
          email: "john.doe@email.com",
          notes: "This is John Doe unit test.",
          userId: "abc123",
        }),
      );
    });

    // edge case, query is null
    it("should return null when friend does not exist", async () => {
      prisma.friend.findUniqueOrThrow = jest.fn().mockResolvedValue(null);
      const friend = await getFriend(1, "abc123");
      expect(friend).toBeNull();
    });

    // edge case, id is NaN
    it("should return an error when id is not a number", async () => {
      try {
        await getFriend("invalidId", "invalidUserId");
      } catch (error) {
        expect(error).toBeInstanceOf(error);
      }
    });

    // edge case, database error
    it("should return an error when there is a database error", async () => {
      prisma.friend.findUniqueOrThrow = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
      try {
        await getFriend(1, "abc123");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
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
        notes: "This is John Doe unit test.",
        userId: "abc123",
      });

      // update the friend
      const updatedFriend = await updateFriend(newFriend.id, newFriend.userId, {
        firstName: "Jane",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "jane.doe@email.com",
        notes: "This is Jane Doe unit test.",
      });

      // check if the friend was updated
      expect(updatedFriend).toEqual(
        expect.objectContaining({
          firstName: "Jane",
          lastName: "Doe",
          phoneNumber: "1234567890",
          email: "jane.doe@email.com",
          notes: "This is Jane Doe unit test.",
          userId: "abc123",
        }),
      );
    });

    // edge case, friend does not exist
    it("should return an error when friend does not exist", async () => {
      try {
        await updateFriend(1, "abc123", { firstName: "Jane" });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    //edge case, id is NaN
    it("should return an error when id is not a number", async () => {
      try {
        await updateFriend("invalidId" as any, "abc123", { firstName: "Jane" });
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
        await updateFriend(1, "abc123", { firstName: "Jane" });
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
    // happy path for deleteFriend service

    it("should delete a friend", async () => {
      // have to create a friend first, not connected to db
      const newFriend = await createFriend({
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "john.doe@email.com",
        notes: "This is John Doe unit test.",
        userId: "abc123",
      });

      // delete the friend
      await deleteFriend(newFriend.id, newFriend.userId);

      // check if the friend was deleted
      try {
        await getFriend(newFriend.id, newFriend.userId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    // edge case, friend does not exist
    it("should return an error when friend does not exist", async () => {
      try {
        await deleteFriend(1, "abc123");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    // edge case, id is NaN
    it("should return an error when id is not a number", async () => {
      try {
        await deleteFriend("invalidId" as any, "invalid" as any);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    // edge case, database error
    it("should return an error when there is a database error", async () => {
      prisma.friend.delete = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
      try {
        await deleteFriend(1, "");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});

/*
  this runs after each individual test case, resetting all mocks to their original state.
  this prevents any mocks set up in one test from affecting others.
*/

afterEach(() => {
  jest.clearAllMocks();
});
