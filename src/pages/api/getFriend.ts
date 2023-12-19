/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { getFriend } from "prisma/prismaService";

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const friend = await getFriend(Number(id));
    res.status(200).json(friend);
  } catch (error) {
    res.status(500).json({ error: "Error fetching friend" });
  }
}
