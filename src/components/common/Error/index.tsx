'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorPageProps {
  message?: string;
  retry?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ message, retry }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-2xl shadow-md">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-semibold text-gray-700">Oops! Something went wrong</h2>
        <p className="text-gray-500 text-center max-w-xs">
          {message || 'We could not load the content. Please try again later.'}
        </p>
        {retry && (
          <button
            onClick={retry}
            className="mt-3 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};
