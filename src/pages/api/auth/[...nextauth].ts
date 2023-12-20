/* eslint-disable @typescript-eslint/no-unsafe-argument */
import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";

export default NextAuth(authOptions);
