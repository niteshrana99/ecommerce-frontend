import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  images: string[];
  isMultiUpload?: boolean
  setImages?: any
}

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  isMultiUpload,
  setImages, 
  images
}: ImageUploadProps) => {

    const [mounted, setIsMounted] = useState(false);
    const form = useFormContext();
  
    useEffect(() => {
      setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
      if (
        result.info &&
        typeof result.info === 'object' &&
        'secure_url' in result.info
      ) {
        onChange(result.info.secure_url);
        isMultiUpload ? setImages((prev: string[]) => [...prev, result.info.secure_url]) : setImages([result.info.secure_url]);
      }
    };

    useEffect(() => {
      form.setValue('images', images);
    }, [images])
  
    if (!mounted) {
      return null;
    }

  return (
    <div>
      <div className='flex items-center gap-4 flex-wrap mb-4'>
        {Array.isArray(images) && images.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
          >
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='destructive'
                size='icon'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image
              fill
              src={url}
              alt='image'
              className='object-cover'
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset='a3tfwnst'
        onSuccess={onUpload}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              className='text-muted-foreground w-full'
              variant='secondary'
              onClick={onClick}
              disabled={disabled}
              type='button'
            >
              <ImagePlus className='h-4 w-4 mr-1' /> Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};