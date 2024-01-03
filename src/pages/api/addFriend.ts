/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";
import getServerSession from "next-auth/next";

import { createFriend } from "../../../prisma/prismaService";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  if (req.method === "POST") {
    try {
      const { firstName, lastName, phoneNumber, email, notes, userId } =
        req.body;
      const newFriend = await createFriend({
        firstName,
        lastName,
        phoneNumber,
        email,
        notes,
        userId,
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
