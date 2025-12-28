'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isValid } from 'date-fns';

interface DateTimePickerProps {
  labelName: string;
  value: Date | null;
  disabled?: boolean;
  onChange: (value: Date | null) => void;
  error?: string;
}

export function DateTimePicker({
  labelName,
  value,
  disabled,
  onChange,
  error,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  const currentDate = value ? new Date(value) : undefined;
  const isDateValid = currentDate && isValid(currentDate);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) return;

    const updatedDate = isDateValid ? currentDate : new Date();
    updatedDate.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());

    onChange(updatedDate);
    setOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    const [hours, minutes, seconds] = time.split(':').map(Number);

    const updatedDate = isDateValid ? new Date(currentDate) : new Date();
    updatedDate.setHours(hours, minutes, seconds || 0);

    onChange(updatedDate);
  };

  const timeValue = isDateValid ? format(currentDate, 'HH:mm:ss') : '10:30:00';

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="px-1 text-xs uppercase text-tertiary-100 font-bold tracking-wider">
        {labelName}
      </Label>
      <div className="flex gap-2">
        {/* Date Part */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className="flex-1 justify-between font-normal bg-card-bg-100 border-tertiary-100/20 text-sm h-11 cursor-pointer"
            >
              {isDateValid ? format(currentDate, 'PPP') : 'Select date'}
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-card-bg-100" align="start">
            <Calendar
              disabled={disabled ? true : { before: new Date() }}
              mode="single"
              selected={currentDate}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          step="1"
          disabled={disabled}
          value={timeValue}
          onChange={handleTimeChange}
          className="w-30 h-11 bg-card-bg-100 border-secondary-100/20 text-sm cursor-pointer"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
}
