'use client';
import { Icon } from '@iconify/react';
import { SignInButton } from '@clerk/nextjs';

export const SignInComponent = () => {
  return (
    <article className="flex flex-col gap-8 items-start mx-8">
      <p className="whitespace-pre-wrap text-5xl text-text-two-100 font-semibold text-shadow-sm text-shadow-card-bg-100 ">
        Welcome to{' '}
        <span className="text-text-one-100 text-shadow-sm text-shadow-text-two-100">
          Outside Shares.
        </span>
        We&apos;re happy to have you on board!
      </p>
      <p className="text-text-one-100 text-3xl font-normal ">
        {' '}
        Please use your Outside Google Account to login.
      </p>
      <section className="bg-white rounded-xl px-5 w-fit h-full backdrop-blur-3xl shadow-2xl shadow-card-bg-100 cursor-pointer">
        <SignInButton mode="modal" forceRedirectUrl={'/rides'}>
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
