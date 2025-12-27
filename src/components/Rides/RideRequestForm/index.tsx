'use client';
import { Icon } from '@iconify/react';
import { Button } from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';
import { DateTimePicker } from '@/components/common/DateTimePicker';
import { useCreateRideRequest } from '@/hooks/useCreateRideRequest';
import { Ride } from '@/core/types/Ride';

interface RideRequestFormProps {
  ride?: Ride | null;
  onClose: () => void;
}

export const RideRequestForm = ({ onClose, ride }: RideRequestFormProps) => {
  const {
    formData,
    handleChange,
    setDepartureStart,
    setDepartureEnd,
    error,
    handleSubmit,
    loading,
  } = useCreateRideRequest(ride);

  return (
    <form onSubmit={(e) => handleSubmit(e, onClose)} className="space-y-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          name="pickupLocation"
          labelName="Pickup"
          icon="ic:sharp-wheelchair-pickup"
          placeholder="Where from?"
          value={formData.pickupLocation}
          variant="card"
          error={error?.pickupLocation}
          onChange={handleChange}
        />
        <InputField
          name="destination"
          labelName="Destination"
          icon="mdi:location-check"
          placeholder="Going to?"
          value={formData.destination}
          variant="card"
          error={error?.destination}
          onChange={handleChange}
        />
      </div>
      <InputField
        name="landmark"
        labelName="Landmark"
        icon="mdi:office-building-marker-outline"
        placeholder="e.g. Near the main gate (optional)"
        value={formData.landmark}
        variant="card"
        error={error?.landmark}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-6">
        <DateTimePicker
          labelName="Earliest Departure"
          value={formData.departureStart}
          error={error?.departureStart}
          onChange={setDepartureStart}
        />
        <DateTimePicker
          labelName="Latest Departure"
          value={formData.departureEnd}
          error={error?.departureEnd}
          onChange={setDepartureEnd}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs uppercase text-tertiary-100 font-bold tracking-wider mb-2 flex items-center gap-2 ml-1">
          <Icon icon="mdi:note-text-outline" width={16} /> Notes
        </label>
        <textarea
          name="notes"
          className="w-full p-3 rounded-xl border-2 border-secondary-100/20 bg-card-bg-100 text-light-text-100 text-sm focus:outline-none focus:border-secondary-100 transition-all placeholder:text-placeholder-100/70 h-24 resize-none"
          placeholder="Any extra details... (optional)"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          className="flex-1 h-11 bg-transparent border border-secondary-100/30 text-light-text-100 hover:bg-secondary-100/10 transition-all"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="flex-1 h-11 bg-secondary-100 text-light-text-100 hover:scale-102 hover:opacity-95 active:scale-95 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>{ride ? 'Saving...' : 'Requesting...'}</>
          ) : ride ? (
            'Save changes'
          ) : (
            'Request Ride'
          )}
        </Button>
      </div>
    </form>
  );
};
