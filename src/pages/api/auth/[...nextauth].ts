/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

console.log("NEXTAUTH_URL: ", process.env.NEXTAUTH_URL);

import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const apiUrl = process.env.NEXTAUTH_API_URL;

        if (!apiUrl) {
          console.error("API URL is not defined");
          throw new Error("API URL is not defined");
        }

        console.log("Calling API with credentials: ", credentials);

        try {
          const res = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          console.log("Received response from API: ", res);

          if (!res.ok) {
            console.error("Failed to authenticate");
            throw new Error("Failed to authenticate");
          }

          const user = await res.json();

          console.log("Received user from API: ", user);

          if (user) {
            return Promise.resolve(user);
          } else {
            console.error("No user received from API");
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Error occurred during authorization: ", error);
          return Promise.resolve(null);
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
