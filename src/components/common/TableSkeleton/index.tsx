'use client';

export const TableSkeleton = ({columns,rows, message}:{ columns: number, rows: number, message:string }) => {
  return (
    <section className="w-full rounded-2xl overflow-auto py-2">
        <section className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-3">
            <h2 className="font-bold text-2xl text-text-one-100/70">
                Your {message} History with <span className="text-secondary-100 font-extrabold">MILERA</span>
            </h2>
        </section>
        
        <div className="overflow-x-auto w-full rounded-2xl">
            <table className="relative w-full overflow-x-auto rounded-2xl bg-card-bg-100 border border-tertiary-100/30 overflow-hidden bg-radial-[at_95%_85%] from-bg-card-bg-100 to-primary-100 to-90% min-w-[36vw] md:min-w-[66vw] lg:min-w-[86vw]">
                <thead>
                    <tr className='hover:bg-tertiary-100/20 transition-colors duration-200 [&>th:last-child]:border-r-0'>
                        {Array.from({ length: columns }).map((_, idx) => (
                        <th key={idx} className='text-center text-text-one-100/70 font-semibold text-sm uppercase tracking-wider py-4 h-10 px-2 align-middle max-w-fit md:max-w-20 lg:max-w-50 whitespace-nowrap border-r border-tertiary-100/30  [&_td:last-child]:border-r-0'>
                            <p className='h-5'></p>
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIdx) => (
                        <tr key={rowIdx} className='px-3 py-2 align-middle whitespace-nowrap border border-tertiary-100/30 max-w-fit md:max-w-20 lg:max-w-50 truncate text-center text-xs text-text-one-100/80 '>
                        {Array.from({ length: columns }).map((_, colIdx) => (
                            <td key={colIdx} className='px-3 py-4 align-middle whitespace-nowrap border border-tertiary-100/30 max-w-fit md:max-w-20 lg:max-w-50 truncate text-center text-xs text-text-one-100/80'>
                           <div className='h-5'/>
                            </td>
                        ))}
                        </tr>
                    ))}
                    <tr><p className='h-20'/></tr>
                </tbody>
            </table>
        </div>
    </section>
  );
};
