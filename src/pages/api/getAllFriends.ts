/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";

import { getAllFriends } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const friends = await getAllFriends();
      res.status(200).json(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
