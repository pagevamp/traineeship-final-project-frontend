"use client"
import { Button } from '@/components/common/Button';
import { AcceptRideProps } from '@/core/types/trip-types';
import { useState } from 'react'

export const UpdateStatus = ({id, onStatusUpdate, onCancel}:AcceptRideProps) => {
      const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mt-auto gap-3">

      {/* Cancel Button */}
        <Button
        variant={'popper'}
          onClick={() => onCancel(id)}
        >
          Cancel
        </Button>

        {/* Accept Button with Popover */}    
        <div className="relative">
          <Button
           variant={'popper'}
            onClick={() => setPopoverOpen(!popoverOpen)}
          >
            Trip Status
          </Button>

          {popoverOpen && (
            <article className="absolute left-0 top-full mt-2 w-40 bg-card-bg-100 border border-secondary-100 rounded-lg shadow-lg">
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
            </article>
          )}
        </div>  
    </div>
  )
}
