import handler from "./getFriend";
import { getFriend } from "../../../prisma/prismaService";
import { type NextApiRequest, type NextApiResponse } from "next";

/*
    ==========================================

    test suites for getFriend.ts
    API route to hit prismaService, getFriend
    should find and return a single friend by their id

    ==========================================

  */

// create mock function for getFriend
jest.mock("../../../prisma/prismaService", () => ({
  getFriend: jest.fn(),
}));

void describe("getFriend.ts", () => {
  // happy path, getFriend.ts API call
  it("should return a 200 status code and the friend when getFriend returns a friend", async () => {
    const mockFriend = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      email: "john.doe@test.com",
      notes: "Test friend",
    };

    (getFriend as jest.Mock).mockResolvedValue(mockFriend);

    const req: Partial<NextApiRequest> = {
      method: "GET",
      query: { id: "1" },
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
