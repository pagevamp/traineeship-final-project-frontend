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
