import { RideTab } from '@/core/types/Ride';
import { useState } from 'react';

export function useRideRequests() {
  const [activeTab, setActiveTab] = useState<RideTab>('all');

  return {
    activeTab,
    setActiveTab,
  };
}
