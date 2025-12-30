'use client';
import { useHistory } from '@/hooks/useHistory';
import { Icon } from '@iconify/react';

export const SearchComponent = () => {
  const { handleSearch, query } = useHistory();
  return (
    <div className="h-12 min-w-[40%] rounded-2xl border border-secondary-100/40  bg-secondary-100/5 items-center pl-6 py-4 flex flex-row text-black placeholder:text-gray-500">
      <input
        placeholder="Search for your trips..."
        className="bg-transparent border-0 focus:outline-none focus:ring-0 overflow-hidden w-[90%] placeholder:text-text-one-100/60"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={query?.toString()}
      />
      <Icon icon="ic:round-search" width={22} height={22} className="text-text-one-100/60 mx-2" />
    </div>
  );
};
