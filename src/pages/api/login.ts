/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { type NextApiRequest, type NextApiResponse } from "next";

import { login } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const { user, token } = await login(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
