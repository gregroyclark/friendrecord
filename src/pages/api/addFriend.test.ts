import handler from "./addFriend";
import { createFriend } from "../../../prisma/prismaService";
import { type NextApiRequest, type NextApiResponse } from "next";

/*
    ==========================================

    test suites for addFriend.ts
    API route to hit prismaService, addFriend
    should create a friend object of type Friend

    ==========================================

  */

// create a mock function for createFriend
jest.mock("../../../prisma/prismaService", () => ({
  createFriend: jest.fn(),
}));
describe("addFriend.ts", () => {
  // happy path, addFriend.ts API call
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

  // edge case, invalid request
  it("should return an error when the request is invalid", async () => {
    (createFriend as jest.Mock).mockRejectedValue(
      new Error("Test error - invalid request"),
    );

    const req: Partial<NextApiRequest> = {
      method: "POST",
      body: {},
    };

    const res: Partial<NextApiResponse> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  // edge case, method is not POST
  it("should return a 405 status code when the request method is not POST", async () => {
    const req: Partial<NextApiRequest> = {
      method: "GET",
      body: {},
    };

    const res: Partial<NextApiResponse> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method Not Allowed" });
  });

  // edge case, body is missing required fields
  // no fields are currently required (this will eventually change)

  // edge case, createFriend throws an error
  it("should return an error when createFriend throws an error", async () => {
    (createFriend as jest.Mock).mockRejectedValue(new Error("Test error"));

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

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
