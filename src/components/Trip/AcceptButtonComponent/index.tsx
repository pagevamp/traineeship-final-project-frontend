"use client"
import { Button } from '@/components/common/Button';
import { AcceptRideProps } from '@/core/types/trip-types';
import React, { useState } from 'react'

export const AcceptButton = ({id, onAccept, onCancel}:AcceptRideProps) => {
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
              <button
                className="w-full px-4 py-2 text-light-text-100 hover:bg-secondary-100/20 text-left"
                onClick={() => {
                  onAccept(id, 'two_wheeler');
                  setPopoverOpen(false);
                }}
              >
                Two-Wheeler
              </button>
              <button
                className="w-full px-4 py-2 text-light-text-100 hover:bg-secondary-100/20 text-left"
                onClick={() => {
                  onAccept(id, 'four_wheeler');
                  setPopoverOpen(false);
                }}
              >
                Four-Wheeler
              </button>
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
