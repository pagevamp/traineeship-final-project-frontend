'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HistoryTab } from '@/core/types/history-types';
import { RideTable } from '../RideHistoryTable';
import { TripTable } from '../TripHistoryTable';

export const HistoryTabComponent = () => {
  const tabs: HistoryTab[] = ['Rides', 'Trips'];
  const [activeTab, setActiveTab] = useState<HistoryTab>('Rides');
  return (
    <div className="flex flex-col gap-3.75">
      <div className="flex items-end justify-end md:justify-between w-full flex-wrap md:flex-nowrap">
        <div className="flex flex-col w-full md:w-auto">
          <motion.div
            className="flex gap-20.25 w-full md:w-fit border-b border-secondary-100 overflow-x-auto no-scrollbar"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'relative whitespace-nowrap text-2xl font-semibold text-text-one-100/70 pb-3 transition-all duration-300 overflow-visible cursor-pointer',
                  activeTab === tab && 'font-bold text-secondary-100',
                )}
              >
                <span className="relative font-secondary font-normal">{tab}</span>
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-0.75 bg-tertiary-100 rounded-t-xl transition-all duration-300 z-0" />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className={cn('w-full rounded-2xl overflow-auto', activeTab === 'Trips' && 'max-w-fit')}>
        <div key={activeTab} className="min-w-150">
          <div className="p-4 md:p-6 bg-card-bg-100 rounded-xl shadow-lg">
            {activeTab === 'Rides' ? (
              <>
                <RideTable />
              </>
            ) : (
              <TripTable />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
