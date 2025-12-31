'use client';

import { Icon } from '@iconify/react';

export const BufferComponent = ({message, icon}:{message:string, icon:string}) => {
  return (
    <div className="relative rounded-xl w-[25vw] md:w-[35vw] lg:w-[50vw] p-5 md:p-8 flex flex-col items-center justify-center gap-6 overflow-hidden border border-white/10 bg-card-bg-100 text-center shadow-2xl">
      <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary-100/20 blur-3xl transition-all group-hover:bg-primary-100/40" />
      <div className="relative flex w-24 h-24 md:w-26 md:h-26 lg:h-32 lg:w-32 items-center justify-center rounded-full bg-secondary-100/10 text-secondary-100 ring-1 ring-secondary-100/20">
        <Icon icon={icon} className="animate-spin-slow" width={64} height={64} />
      </div>
      <div className="space-y-2">
        <p className="text-text-one-100/80 text-center max-w-xs">
         {message}
        </p>
      </div>
      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-2/3 rounded-full bg-linear-to-r from-secondary-100 to-primary-100 animate-pulse" />
      </div>
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-radial-[at_25%_25%] from-white/10 to-transparent opacity-0 transition-opacity duration-500" />
    </div>
  );
};
