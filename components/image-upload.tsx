import React, { useRef } from 'react';
import { ImageIcon } from 'lucide-react';
import { Button, Card, CardBody, Image } from '@nextui-org/react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
}

export function ImageUpload({ onImageUpload, uploadedImage }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-default-50 dark:bg-default-100 shadow-sm">
        <CardBody className="flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <ImageIcon className="w-10 h-10 mb-3 text-default-400" />
            <p className="text-sm text-default-500 dark:text-default-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-default-400 dark:text-default-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
          <Button
            className="mt-4"
            color="primary"
            variant="flat"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Image
          </Button>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
          />
        </CardBody>
      </Card>

      {uploadedImage && (
        <Card className="mt-4 bg-default-50 dark:bg-default-100 shadow-sm">
          <CardBody className="p-4">
            <Image
              src={uploadedImage}
              alt="Uploaded image"
              className="w-full h-auto rounded-lg"
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
}