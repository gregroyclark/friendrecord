import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="m-4 flex flex-col items-center justify-center space-y-4 bg-white p-16 shadow-md">
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
