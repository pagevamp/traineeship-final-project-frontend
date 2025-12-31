import { Icon } from '@iconify/react';
const Directory = () => {
  return (
    <div className="w-[25vw] md:w-[35vw] lg:w-[50vw] relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-card-bg-100 p-8 text-center shadow-2xl transition-all duration-500 hover:scale-[1.02] md:p-12">
      <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary-100/20 blur-3xl transition-all group-hover:bg-primary-100/40" />
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-secondary-100/10 text-secondary-100 ring-1 ring-secondary-100/20">
        <Icon icon="eos-icons:hourglass" className="animate-spin-slow" width={48} height={48} />
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-bold tracking-tight text-white">Under Development</h3>
        <p className="text-sm uppercase tracking-[0.2em] text-secondary-100/70 font-medium">
          Coming Soon • 2026
        </p>
      </div>
      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-2/3 rounded-full bg-linear-to-r from-secondary-100 to-primary-100 animate-pulse" />
      </div>
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-radial-[at_25%_25%] from-white/10 to-transparent opacity-0" />
    </div>
  );
};
export default Directory;