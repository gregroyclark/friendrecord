/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { signIn } from "next-auth/react";
import { type NextApiRequest, type NextApiResponse } from "next";

// import { login } from "prisma/prismaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (typeof window !== "undefined") {
      try {
        await signIn("credentials", {
          email: email,
          password: password,
        });
        res.status(200).json({ status: "Login successful" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
    } else {
      res
        .status(400)
        .json({ error: "Sign in must be performed on the client-side" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === "POST") {
//     const { email, password } = req.body;
//     try {
//       const { user } = await login(email, password);
//       res.status(200).json({ user });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: error });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
