/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { type NextApiRequest, type NextApiResponse } from "next";

import { Prisma } from "@prisma/client";
import { register } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const user = await register(email, password);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error });
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        console.error("Error creating user: Email already exists");
        throw new Error("Email already exists");
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
