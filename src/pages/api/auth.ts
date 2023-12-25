/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { register, login } from "prisma/prismaService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, name, email, password } = req.body;

    if (req.url.includes("/SignUp")) {
      try {
        const user = await register({
          userId,
          name,
          email,
          password,
        });
        res.status(200).json({ status: "success", data: user });
      } catch (error) {
        res
          .status(500)
          .json({ status: "error", message: "Failed to register user" });
      }
    } else if (req.url.includes("/Login")) {
      try {
        const user = await login(email, password);
        // store userID in session or cookie
        res.status(200).json({ status: "success", data: user });
      } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to log in" });
      }
    }
  } else {
    res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}
