/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
      terminal: API resolved without sending a response for /api/auth, this may result in stalled requests.
      probably need to split auth methods into different files and call the specific route
      oh. duh. i'm using a prisma service, not the auth API.
      use the auth API. can't use bcrypt (in prismaService) on the frontend.
      */

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      void router.push("/");
    } else {
      console.log("there was an error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-[#e4e2DD] p-8 shadow-md">
      <h1 className="m-4 flex justify-center text-lg font-semibold text-gray-600">
        Welcome to friendrecord!
      </h1>
      <div className="w-full">
        <hr />
      </div>
      <div className="flex w-full items-center justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
          <button
            type="submit"
            className="bg--blue-700 m-1 rounded-md bg-blue-700 p-1.5 text-white hover:bg-blue-800"
          >
            Sign Up
          </button>
        </form>
      </div>
      {/* <button>Sign up with Google</button> */}
      <div className="">
        <div className="w-full">
          <hr />
        </div>
        <div>
          <p className="m-4 flex justify-center text-lg font-semibold text-gray-600">
            Already have an account?
            <span>
              <Link href={"/Login"}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
