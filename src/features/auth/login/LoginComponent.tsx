'use client';

import { Icon } from '@iconify/react';
import { SignInButton } from '@clerk/nextjs';

export const LoginComponent = () => {
  return (
    <article className="flex flex-col gap-8 items-start mx-8">
      <p className="whitespace-pre-wrap text-5xl text-text-two-100 font-extrabold text-shadow-sm text-shadow-card-bg-100 ">
        Welcome to Outside Shares. We&apos;re happy to have you on board!
      </p>
      <p className='className="text-text-one-100 text-xl '>
        {' '}
        Please use your Outside Google Account to login.
      </p>
      <section className="bg-white rounded-xl px-2 w-fit h-full backdrop-blur-3xl shadow-2xl shadow-card-bg-100 cursor-pointer">
        <SignInButton mode="modal">
          <button
            className="
              flex items-center gap-2 text-xl
              hover:opacity-90 transition
              focus:outline-none focus:ring-none
           text-text-two-100 font-extrabold

            "
          >
            Sign in with your
            <Icon icon="logos:google" width={54} height={54} />
            account
          </button>
        </SignInButton>
      </section>
    </article>
  );
};
