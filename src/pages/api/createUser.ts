/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createUser } from "prisma/prismaService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email } = req.body;

    try {
      const user = await createUser({
        id: "",
        name,
        email,
      });

      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Failed to create user" });
    }
  } else {
    res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}
