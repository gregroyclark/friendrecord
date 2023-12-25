/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { getFriend } from "../../../prisma/prismaService";

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
    try {
      const { id } = req.query;
      const { userId } = req.body;
      const friendId = Number(id);
      console.log("getFriend.ts id", id);

      const friend = await getFriend(friendId, userId);
      console.log("getFriend Friend: ", typeof friend, friend);
      res.status(200).json(friend);
    } catch (error) {
      res.status(500).json({ error: "Error fetching friend" });
    }
  }
}
