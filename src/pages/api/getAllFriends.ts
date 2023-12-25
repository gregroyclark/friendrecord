/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { getAllFriends } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  if (req.method === "GET") {
    const { userId } = req.body;
    try {
      const friends = await getAllFriends(userId, userId);
      console.log("getAllFriends.ts", friends);
      res.status(200).json(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
