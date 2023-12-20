import { type NextApiRequest, type NextApiResponse } from "next";

import { deleteFriend } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await deleteFriend(Number(id));
      res.status(200).json({ message: "Friend deleted successfully" });
    } catch (error) {
      console.error("Error deleting friend:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
