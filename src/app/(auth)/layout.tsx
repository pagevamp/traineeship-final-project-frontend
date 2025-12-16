'use client';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-(--color-undraw-primary-100) h-[90%] rounded-3xl shadow-2xl shadow-lime-950 md:w-150 sm:min-w-100 xs:min-w-[200px]">
      {children}
    </div>
  );
};

export default Layout;
