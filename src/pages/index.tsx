import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      void router.push("/Login");
    }
  }, [session]);

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 bg-[#E4E2DD] p-8 shadow-md">
        <h1 className="m-4 flex justify-center text-lg font-semibold text-gray-600">
          Welcome to friendrecord!
        </h1>
        <div className="w-full">
          <hr />
        </div>
        <div className="flex w-full items-center justify-center">
          <button className="m-1 rounded-md bg-blue-700 p-1.5 text-white hover:bg-blue-800">
            <Link href={"/AddFriend"}>Add a Friend</Link>
          </button>

          <button className="m-1 rounded-md bg-gray-500 p-1.5 text-white hover:bg-gray-600">
            <Link href={"/FriendList"}>Friends List</Link>
          </button>
        </div>
      </div>
    </>
  );
}
