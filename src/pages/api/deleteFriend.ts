import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { deleteFriend } from "prisma/prismaService";
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

  if (req.method === "DELETE") {
    try {
      const { id, userId } = req.query;
      await deleteFriend(Number(id), userId);
      res.status(200).json({ message: "Friend deleted successfully" });
    } catch (error) {
      console.error("Error deleting friend:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
