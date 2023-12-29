/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from "react";
// import { signIn } from "next-auth/react";
import { login } from "prisma/prismaService";
import Link from "next/link";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      void login(email, password);
    } else {
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
            className="bg--blue-700 m-1 rounded-md bg-green-700 p-1.5 text-white hover:bg-green-800"
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
