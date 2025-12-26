"use client"
import { Button } from '@/components/common/Button';
import { AcceptRideProps } from '@/core/types/trip-types';
import React, { useState } from 'react'

export const UpdateStatus = ({id, onStatusUpdate, onCancel}:AcceptRideProps) => {
      const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mt-auto gap-3">
        {/* Accept Button with Popover */}    
        <div className="relative">
          <Button
            className="h-9 px-4 bg-green-600 text-white hover:opacity-90 hover:scale-102 transition-transform"
            onClick={() => setPopoverOpen(!popoverOpen)}
          >
            Accept
          </Button>

          {popoverOpen && (
            <dialog className="absolute left-0 top-full mt-2 w-40 bg-card-bg-100 border border-secondary-100 rounded-lg shadow-lg z-50">
              <Button
                className="w-full px-4 py-2 text-light-text-100 hover:bg-secondary-100/20 text-left"
                onClick={() => {
                  onStatusUpdate(id, 'not_started');
                  setPopoverOpen(false);
                }}
              >
                Not Started
              </Button>
              <Button
                className="w-full px-4 py-2 text-light-text-100 hover:bg-secondary-100/20 text-left"
                onClick={() => {
                  onStatusUpdate(id, 'on_the_way');
                  setPopoverOpen(false);
                }}
              >
                On My Way
              </Button>
              <Button
                className="w-full px-4 py-2 text-light-text-100 hover:bg-secondary-100/20 text-left"
                onClick={() => {
                  onStatusUpdate(id, 'reached_pickup');
                  setPopoverOpen(false);
                }}
              >
                Not Started
              </Button>
              <Button
                className="w-full px-4 py-2 text-light-text-100 hover:bg-secondary-100/20 text-left"
                onClick={() => {
                  onStatusUpdate(id, 'reached_destination');
                  setPopoverOpen(false);
                }}
              >
                On My Way
              </Button>
            </dialog>
          )}
        </div>
      

      {/* Cancel Button */}
      
        <Button
          className="h-9 px-4 bg-red-600 text-light-text-100 hover:opacity-90 hover:scale-102 transition-transform"
          onClick={() => onCancel(id)}
        >
          Cancel
        </Button>
      
    </div>
  )
}
