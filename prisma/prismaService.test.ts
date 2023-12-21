import { describe } from "node:test";
import {
  createFriend,
  getAllFriends,
  getFriend,
  updateFriend,
  deleteFriend,
} from "./prismaService";

void describe("prismaService", () => {
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
