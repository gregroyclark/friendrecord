import handler from "./addFriend";
import { createFriend } from "../../../prisma/prismaService";
import { type NextApiRequest, type NextApiResponse } from "next";

// create a mock function for createFriend
jest.mock("../../../prisma/prismaService", () => ({
  createFriend: jest.fn(),
}));
describe("addFriend.ts", () => {
  it("should return a new friend when the request is valid", async () => {
    const mockFriend = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      email: "john.doe@test.com",
      notes: "Test friend",
    };

    // createFriend mock function, allows use of mockResolvedValue
    (createFriend as jest.Mock).mockResolvedValue(mockFriend);

    const req: Partial<NextApiRequest> = {
      method: "POST",
      body: {
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "john.doe@test.com",
        notes: "Test friend",
      },
    };

    const res: Partial<NextApiResponse> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFriend);
  });
});
