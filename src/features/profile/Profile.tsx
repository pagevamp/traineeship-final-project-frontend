'use client';
import { Button } from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';

export const ProfileForm = () => {
  const { error, formData, handleChange, loading, handleSubmit } = useUpdateProfile();

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          name="contactNumber"
          labelName="Contact Number"
          icon="bxs:contact"
          placeholder="+9_ _ _ _ _ _ _ _ _"
          value={formData.contactNumber}
          variant="card"
          error={error?.contactNumber}
          onChange={handleChange}
        />

        <InputField
          name="primaryLocation"
          labelName="Primary Location"
          icon="material-symbols:location-away-outline"
          placeholder="Kathmandu, Naikap"
          value={formData.primaryLocation}
          variant="card"
          error={error?.primaryLocation}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="submit"
          className="flex-1 h-11 bg-secondary-100 text-light-text-100 hover:scale-102 hover:opacity-95 active:scale-95 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? 'Updating Profile ' : 'Update'}
        </Button>
      </div>
    </form>
  );
};
