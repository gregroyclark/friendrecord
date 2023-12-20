import Link from "next/link";
import Layout from "~/components/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="m-4 mt-8 h-1/2 w-full space-y-4 bg-white p-4 shadow-md md:w-2/3">
          <h1 className="m-4 flex justify-center text-lg font-semibold text-gray-600">
            Welcome to MyFriendBook!
          </h1>
          <hr />
          <div className="m-8 flex flex-col items-center justify-around md:flex-row">
            <Link href={"/AddFriend"}>
              <button className="rounded-md bg-blue-700 p-2 text-white hover:bg-blue-800">
                Add a Friend
              </button>
            </Link>
            <Link href={"/MyFriends"}>
              <button className="m-4 rounded-md bg-gray-500 p-2 text-white hover:bg-gray-600">
                Friends List
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
