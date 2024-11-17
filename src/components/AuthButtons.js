"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <button className="btn" disabled>...</button>
  }

  if (session && session.user) {
    return (
      <div className="space-x-4">
        {/* <Link href={`/schedule-email`}>
          <button
            className="btn text-gray-200"
          >Schedule Email</button>
        </Link> */}
        <button
          onClick={() => signOut()}
          className="btn text-gray-200"

        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      className="btn text-gray-200"
      onClick={() => {
        signIn("google", {
          callbackUrl: "/app",
        });
      }}
    >
      Sign In
    </button>
  );
};

export default AuthButtons
