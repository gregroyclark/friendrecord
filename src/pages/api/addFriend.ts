/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";

import { createFriend } from "../../../prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { firstName, lastName, phoneNumber, email, notes } = req.body;
      const newFriend = await createFriend({
        firstName,
        lastName,
        phoneNumber,
        email,
        notes,
      });
      res.status(200).json(newFriend);
    } catch (error) {
      console.error("Error adding friend:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
