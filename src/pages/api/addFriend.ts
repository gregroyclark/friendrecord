/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type NextApiRequest, type NextApiResponse } from "next";
import getServerSession from "next-auth/next";

import { createFriend } from "../../../prisma/prismaService";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("Request method: ", req.method);
  console.log("Request headers: ", req.headers);
  console.log("Request body: ", req.body);

  const session = await getServerSession(req, res, authOptions);

  console.log("Session: ", session);

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
        userId: userId,
      });
      res.status(200).json(newFriend);
    } catch (error) {
      console.error("Error adding friend:", error);
      console.error(error.stack);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
