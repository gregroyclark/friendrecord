import { type NextApiRequest, type NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { deleteFriend } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

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
