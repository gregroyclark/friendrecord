/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Attempting to sign in with email: ", email);

    if (session) {
      void router.push("/");
    }

    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      console.log("Sign-in result: ", result);

      if (result?.error) {
        console.log("Error signing in: ");
        void router.push("/Login");
      } else {
        console.log("Login successful");
        void router.push("/");
      }
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-[#e4e2DD] p-8 shadow-md">
      <h1 className="m-4 flex text-lg font-semibold text-gray-600">
        Welcome to friendrecord!
      </h1>
      <div className="w-full">
        <hr />
      </div>
      <div className="flex w-full items-center justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
          <button
            type="submit"
            className="m-1 rounded-md bg-blue-700 p-1.5 text-white hover:bg-blue-800"
          >
            Log In
          </button>
        </form>
        {/* <button
          type="submit"
          className="m-1 rounded-md bg-green-700 p-1.5 text-white hover:bg-green-800"
        >
          Sign in with Google
        </button> */}
      </div>
      <div className="">
        <div className="w-full">
          <hr />
        </div>
        <div className="">
          <p className="m-4 justify-center text-lg font-semibold text-gray-600">
            New? <Link href={"/SignUp"}>Sign up!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
