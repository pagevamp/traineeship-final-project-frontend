'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { setTokenGetter } from '@/lib/private-axios';

export default function ClientAuthInitializer() {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenGetter(() => getToken({ template: 'backend' }));
  }, [getToken]);

  return null;
}
