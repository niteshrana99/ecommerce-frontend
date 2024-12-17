import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';
import {
  CldUploadWidget,
} from 'next-cloudinary';
import React from 'react';
export const ImageUpload = ({
  onChange,
  uploadedImages,
}: {
  onChange: (value: string) => void;
  uploadedImages: any;
}) => {
  return (
    <div>
      <CldUploadWidget
        uploadPreset='a3tfwnst'
        onSuccess={(result) => {
          if (
            result.info &&
            typeof result.info === 'object' &&
            'secure_url' in result.info
          ) {
            const url = result.info.secure_url;
            uploadedImages((prev: any) => [...prev, url]);
            onChange(url);
          }
        }}
      >
        {({ open }) => {
          return (
            <Button
              className='text-muted-foreground w-full'
              variant='secondary'
              onClick={() => open()}
              type='button'
            >
              <FilePlus className='h-4 w-4 mr-1' /> Upload
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
