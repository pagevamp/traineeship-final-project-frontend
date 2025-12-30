"use client"
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { tripStatusUpdates } from '@/constants';
import { AcceptRideProps } from '@/core/types/trip-types';
import { Icon } from '@iconify/react';
import { useState } from 'react'


export const UpdateStatus = ({trip, onStatusUpdate, onCancel}:AcceptRideProps) => {
      const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mt-auto gap-3">

      {/* Cancel Button */}
        <Button
        variant={'popper'}
           onClick={() => {
              onCancel(trip.id);
            }}
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

          </div> 


          {popoverOpen && (
          <Modal title='Update Trip Status' open={popoverOpen} onOpenChange={()=>setPopoverOpen(false)}>
            <div className='flex flex-col gap-2 w-full p-2 '>
              {tripStatusUpdates.map((update)=>(
                <Button
                key={update.label}
                className="w-full px-4 py-2 text-light-text-100 bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 to-75% hover:bg-secondary-100/20 text-left"
                onClick={() => {
                  onStatusUpdate(trip.id, update.status);
                  setPopoverOpen(false);
                }}

              >
               <Icon icon={update.icon}/> {update.label}
              </Button>
              ))}
              
              </div>
            </Modal>
          )}
        
    </div>
  )
}
