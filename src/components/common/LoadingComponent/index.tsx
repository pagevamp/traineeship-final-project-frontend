'use client';

import React from 'react';
import { Loader2 } from 'lucide-react'; 

export const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-2xl shadow-md">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="text-gray-500 text-center max-w-xs">
          Please wait while we fetch the data. This might take a few seconds.
        </p>
      </div>
    </div>
  );
};
