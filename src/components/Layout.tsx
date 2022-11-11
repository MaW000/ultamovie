
import Head from 'next/head';
import Link from 'next/link';
import React, {ReactNode} from 'react';

export default function Layout({ children } : { children: ReactNode }) {
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
            <div>
              <Link href="/moviedash" className="p-2">
                Saved Movies
              </Link>
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