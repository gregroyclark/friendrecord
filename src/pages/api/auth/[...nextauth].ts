/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

console.log("NEXTAUTH_URL: ", process.env.NEXTAUTH_URL);
console.log("NEXTAUTH_API_URL: ", process.env.NEXTAUTH_API_URL);

import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<any> {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          console.log("Calling API with email: ", email);

          const response = await fetch(process.env.NEXTAUTH_API_URL!, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            const errorMessage = await response.text();
            console.error(
              `API call failed with status ${response.status}: ${errorMessage}`,
            );
            throw new Error(errorMessage);
          }

          const user = await response.json();

          if (!user) {
            const errorMessage = "No user found with this email";
            console.error(
              `API call failed with status ${response.status}: ${errorMessage}`,
            );
            throw new Error("No user found with this email");
          }

          console.log("Received user from API: ", user);

          return user;
        } catch (error) {
          console.error("Error occurred during authorization: ", error);
          throw new Error("Next Auth - Authorize: Authentication error", error);
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if ("id" in token) {
        (session.user as any).id = token.id;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
