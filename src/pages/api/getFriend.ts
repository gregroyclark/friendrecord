/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type NextApiRequest, type NextApiResponse } from "next";

import { getFriend } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  console.log("getFriend id", id);
  try {
    const friend = await getFriend(Number(id));
    console.log("getFriend Friend: ", typeof friend, friend);
    res.status(200).json(friend);
  } catch (error) {
    res.status(500).json({ error: "Error fetching friend" });
  }
}
