import Head from "next/head";
import Link from "next/link";
import Layout from "~/components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Welcome to MyFriendBook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="m-4 mt-8 w-2/3 space-y-4 bg-white p-4 shadow-md">
          <h1 className="m-4 flex justify-center text-lg font-semibold text-gray-600">
            Welcome to MyFriendBook!
          </h1>
          <hr />
          <div className="m-8 flex flex-row items-center justify-around">
            <Link
              href={"/AddFriend"}
              className="rounded-md bg-blue-700 p-2 text-white hover:bg-blue-800"
            >
              Add a Friend
            </Link>
            <Link
              href={"/MyFriends"}
              className="m-4 rounded-md bg-gray-500 p-2 text-white hover:bg-gray-600"
            >
              View Friends List
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
