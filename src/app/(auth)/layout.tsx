'use client';

import { ImageSlider } from '@/components/common/ImageSlider';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right" />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-screen px-6 lg:px-16">
        <div className="hidden lg:flex items-center">
          <ImageSlider />
        </div>

        <div className="flex items-center justify-center">{children}</div>
      </section>
    </div>
  );
};

export default SignInLayout;
