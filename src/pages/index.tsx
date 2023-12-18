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
        <div>
          <h1 className="m-2">Welcome to MyFriendbook!</h1>
          <Link href={"/AddFriend"} className="m-2">
            Add a Friend
          </Link>
          <Link href={"/MyFriends"} className="m-2">
            View Friends List
          </Link>
        </div>
      </Layout>
    </>
  );
}
