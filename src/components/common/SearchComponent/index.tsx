'use client';
import { useHistory } from '@/hooks/useHistory';
import { Icon } from '@iconify/react';

export const SearchComponent = () => {
  const { handleSearch, query } = useHistory();
  return (
    <div className="h-12 min-w-[40%] rounded-2xl border border-secondary-100 bg-amber-100/80 items-center px-2 py-4 flex flex-row text-black placeholder:text-gray-500">
      <input
        placeholder="Search for your url..."
        className="bg-transparent border-0 focus:outline-none focus:ring-0 overflow-hidden w-[90%]"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={query?.toString()}
      />
      <Icon icon="ic:round-search" width={22} height={22} className="text-black mx-2" />
    </div>
  );
};
