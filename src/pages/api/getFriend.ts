import { type NextApiRequest, type NextApiResponse } from "next";

import { getFriend } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET")
    try {
      const { id } = req.query;
      console.log("getFriend.ts id", id);

      const friend = await getFriend(Number(id));
      console.log("getFriend Friend: ", typeof friend, friend);
      res.status(200).json(friend);
    } catch (error) {
      res.status(500).json({ error: "Error fetching friend" });
    }
}
