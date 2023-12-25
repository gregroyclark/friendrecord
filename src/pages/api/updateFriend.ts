/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { updateFriend } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  if (req.method === "PUT") {
    try {
      const { id, firstName, lastName, phoneNumber, email, notes } = req.body;
      console.log(req.body);
      const updatedFriend = await updateFriend(Number(id), {
        firstName,
        lastName,
        phoneNumber,
        email,
        notes,
      });
      res.status(200).json(updatedFriend);
      console.log(updatedFriend);
    } catch (error) {
      console.error("Error updating friend:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
