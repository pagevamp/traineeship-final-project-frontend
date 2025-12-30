import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDepartureTime(departureTime: string) {
  const [start, end] = JSON.parse(departureTime);

  return {
    departureStart: start,
    departureEnd: end,
  };
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
