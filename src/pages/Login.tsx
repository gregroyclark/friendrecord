/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const email = event.target.email.value;
    // const password = event.target.password.value;

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const { user, token } = await response.json();
      void router.push("/index.tsx");
    } else {
      console.log("error signing in");
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
            className="rounded-md border border-gray-300 bg-gray-50 p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
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
