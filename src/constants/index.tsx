import { TripStatus } from "@/core/types/trip-types";
import { Routes } from "@/routes";

export const links = [
    { href: Routes.DIRECTORY, icon: 'bxs:food-menu', label: 'Directory' },
    { href: Routes.RIDES, icon: 'mdi:bike-fast', label: 'View Rides' },
    { href: Routes.TRIPS, icon: 'mdi:account-pending', label: 'View Pending Trips' },
    { href: Routes.ABOUT, icon: 'ix:about', label: 'About Us' },
  ];

export const tripStatusUpdates = [
   { status:TripStatus.NOT_STARTED, icon: 'ic:twotone-not-started', label: 'Not Started' },
   { status:TripStatus.ON_THE_WAY, icon: 'fluent:highway-24-filled', label: 'On The Way' },
    { status:TripStatus.REACHED_PICKUP, icon: 'stash:location-duotone', label: 'Reached Pickup' },
    { status:TripStatus.REACHED_DESTINATION, icon: 'duo-icons:location', label: 'Reached Destination' },
]

export const STATUS_STYLES: Record<
  TripStatus,
  {
    border: string;
    badgeBg: string;
    badgeText: string;
    label: string;
  }
> = {
  [TripStatus.NOT_STARTED]: {
    border: 'border-blue-500/70',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    label: 'NOT STARTED',
  },
  [TripStatus.ON_THE_WAY]: {
    border: 'border-amber-500/70',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    label: 'ON THE WAY',
  },
  [TripStatus.REACHED_PICKUP]: {
    border: 'border-green-500/70',
    badgeBg: 'bg-green-500/10',
    badgeText: 'text-green-400',
    label: 'REACHED PICKUP',
  },
  [TripStatus.REACHED_DESTINATION]: {
    border: 'border-green-500/70',
    badgeBg: 'bg-green-500/10',
    badgeText: 'text-green-400',
    label: 'REACHED DESTINATION',
  },
};
