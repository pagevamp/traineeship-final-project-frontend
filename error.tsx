'use client';

import Link from 'next/link';

//a simple static page to show page load error
const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-4">
      <article className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <section className="p-8 text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-linear-to-r from-primary-100 to-emerald-800 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-secondary-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-primary">
              Access Denied
            </h1>
            <div className="space-y-2">
              <p className="text-md text-gray-700 font-secondary">Unauthorized Access</p>
              <p className="text-sm text-gray-500 leading-relaxed font-secondary font-light">
                You don&apos;t have permission to access this resource in the Ride Sharing service.
                Please contact support at
                <Link
                  href="mailto:istutiupreti805@gmail.com"
                  className="ml-2 font-bold text-shadow-emerald-400"
                >
                  istutiupreti805@gmail.com
                </Link>{' '}
                if you believe this is an error.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 font-secondary">Error Code: 403 - Forbidden</p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-secondary tracking-wide">
              Outside goes Outside
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default UnauthorizedPage;
