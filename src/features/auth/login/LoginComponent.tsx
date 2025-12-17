'use client';

import { Icon } from '@iconify/react';
import { SignInButton } from '@clerk/nextjs';

export const LoginComponent = () => {
  return (
    <article className="flex flex-col gap-8 items-start mx-8">
      <p className="whitespace-pre-wrap text-5xl text-text-two-100 font-extrabold">
        Welcome to Outside Connect. We&apos;re happy to have you on board!
      </p>
      <p className='className="text-text-one-100 text-xl '>
        {' '}
        Please use your Outside Google Account to login.
      </p>
      <section className="bg-white rounded-xl px-10 w-fit h-full backdrop-blur-3xl shadow-2xl shadow-card-bg-100">
        <SignInButton mode="modal">
          <button
            className="
              flex items-center gap-2 text-2xl
              hover:opacity-90 transition
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-text-two-100 font-extrabold

            "
          >
            Sign in with your
            <Icon icon="logos:google" width={64} height={64} className="mx-1" />
            account
          </button>
        </SignInButton>
      </section>
    </article>
  );
};
