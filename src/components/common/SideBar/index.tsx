'use client';

import { Button } from "../Button";

export const SideBar = () => {

  return (
    <div className="absolute bottom-10 h-[80vh] w-[35vh] mx-8 rounded-lg bg-card-bg-100 shadow-lg shadow-gray-800 place-content-start flex flex-col gap-5 items-center justify-items-stretch text-undraw-secondary-100">
      
      <h2 className="text-text-one-100 ">
        Welcome to Milera
      </h2>
      
      <Button
      variant={'navigation'}
      >Directory</Button>
      <Button
      variant={'navigation'}
      >View Rides</Button>
      <Button
      variant={'navigation'}
      >Your Pending Trips</Button>
    </div>
  );
};
