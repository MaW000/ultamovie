
import Head from 'next/head';
import Link from 'next/link';
import React, {ReactNode} from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
export default function Layout({ children } : { children: ReactNode }) {
  const { data: sessionData} = useSession();
  console.log(sessionData)
  return (
    <>
      <Head>
        <title>{'MovieDB'}</title>
        <meta name="MovieDB" content="Movie Database" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              MovieDB
            </Link>
            <div className='flex gap-2'>
              
              {sessionData && 
              <Link href="/moviedash" className="rounded-md border border-violet-50 bg-indigo-500 px-4 py-2 text-xl shadow-lg hover:bg-indigo-300">
                Saved Movies
              </Link>
              }
              <AuthShowcase />
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 MovieDB</p>
        </footer>
      </div>
    </>
  );
}

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="rounded-md border border-violet-50 bg-indigo-500 px-4 py-2 text-xl shadow-lg hover:bg-indigo-300"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};