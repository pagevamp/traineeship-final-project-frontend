export const RidesHeader = () => (
  <div>
    <div className="flex items-center gap-2">
      <span className="h-1 w-8 bg-secondary-100 rounded-full" />
      <span className="text-xs font-bold uppercase tracking-widest text-secondary-100">
        For Daily Commuters
      </span>
    </div>

    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-light-text-100">
      Ride <span className="text-secondary-100">Dashboard</span>
    </h1>

    <p className="text-light-text-100 mt-2 max-w-md">Manage your personal requests and trips.</p>
  </div>
);
