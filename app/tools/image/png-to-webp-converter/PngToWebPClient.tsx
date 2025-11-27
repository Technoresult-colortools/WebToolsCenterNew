'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Card, CardBody, Button,  Input, Slider, Checkbox } from "@nextui-org/react";
import InfoSectionPngConverter from './info-section';
import {  Download, Trash2, Upload, ImageIcon,  Settings,  ImagePlus, } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ToolLayout from '@/components/ToolLayout';

interface ConversionOptions {
  quality: number;
  lossless: boolean;
  reducedSize: boolean;
  resizeWidth: number | null;
  resizeHeight: number | null;
  maintainAspectRatio: boolean;
}

const defaultOptions: ConversionOptions = {
  quality: 80,
  lossless: false,
  reducedSize: true,
  resizeWidth: null,
  resizeHeight: null,
  maintainAspectRatio: true,
};

export default function PngToWebpConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<{ name: string, url: string, originalSize: number, newSize: number }[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [options, setOptions] = useState<ConversionOptions>(defaultOptions);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [convertedCount, setConvertedCount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [batchProgress, setBatchProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(selectedFiles).forEach(file => {
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      toast.error(`Some files were not accepted: ${invalidFiles.join(', ')}. Only PNG and JPEG files are supported.`);
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      setPreviewImage(URL.createObjectURL(validFiles[0]));
      toast.success(`${validFiles.length} files added for conversion`);
    }
  }, []);

  const convertToWebP = useCallback(async () => {
    if (files.length === 0) {
      toast.error('Please add files to convert');
      return;
    }

    setIsConverting(true);
    setConvertedFiles([]);
    setBatchProgress(0);
    let totalSaved = 0;
    let converted = 0;

    try {
      const results = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const originalSize = file.size;
        
        // Create a canvas to render the image
        const img = new Image();
        const loadPromise = new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = URL.createObjectURL(file);
        });
        
        await loadPromise;
        
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Handle resizing if necessary
        if (options.resizeWidth || options.resizeHeight) {
          if (options.maintainAspectRatio) {
            const aspectRatio = width / height;
            if (options.resizeWidth && options.resizeHeight) {
              // Both dimensions specified
              width = options.resizeWidth;
              height = options.resizeHeight;
            } else if (options.resizeWidth) {
              // Only width specified
              width = options.resizeWidth;
              height = width / aspectRatio;
            } else if (options.resizeHeight) {
              // Only height specified
              height = options.resizeHeight || height;
              width = height * aspectRatio;
            }
          } else {
            // No aspect ratio maintenance
            width = options.resizeWidth || width;
            height = options.resizeHeight || height;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to WebP
        const webpDataUrl = canvas.toDataURL('image/webp', options.lossless ? 1.0 : options.quality / 100);
        
        // Get the WebP file size
        const byteString = atob(webpDataUrl.split(',')[1]);
        const newSize = byteString.length;
        
        const fileName = file.name.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        
        results.push({
          name: fileName,
          url: webpDataUrl,
          originalSize,
          newSize
        });
        
        totalSaved += (originalSize - newSize);
        converted++;
        setBatchProgress(Math.floor((i + 1) / files.length * 100));
        setConvertedCount(converted);
      }
      
      setConvertedFiles(results);
      setTotalSavings(totalSaved);
      toast.success(`Successfully converted ${files.length} files!`);
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('An error occurred during conversion');
    } finally {
      setIsConverting(false);
    }
  }, [files, options]);

  const handleDownloadAll = useCallback(() => {
    convertedFiles.forEach(file => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    toast.success('All files downloaded');
  }, [convertedFiles]);

  const handleDownloadSingle = useCallback((file: { name: string, url: string }) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${file.name} downloaded`);
  }, []);

  const handleClearAll = useCallback(() => {
    setFiles([]);
    setConvertedFiles([]);
    setPreviewImage(null);
    setConvertedCount(0);
    setTotalSavings(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('All files cleared');
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
    
    if (files.length === 1) {
      setPreviewImage(null);
    } else if (previewImage === URL.createObjectURL(files[index])) {
      setPreviewImage(files.length > 1 ? URL.createObjectURL(files[0]) : null);
    }
    toast.success('File removed');
  }, [files, previewImage]);

  const totalOriginalSize = files.reduce((sum, file) => sum + file.size, 0);
  const compressionRatio = convertedFiles.length > 0 ? 
    (1 - (convertedFiles.reduce((sum, file) => sum + file.newSize, 0) / totalOriginalSize)) * 100 : 0;

  return (
    <ToolLayout
      title="PNG to WebP Converter"
      description="Convert your PNG, JPG, and JPEG images to WebP format for faster websites and smaller file sizes. Support for batch conversion, quality adjustment, and more!"
      toolId="678f383126f06f912191bcd2"
    >
      <div className="flex flex-col gap-8">
        {/* Input Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <label className="block text-lg font-medium text-primary mb-2">Upload Images:</label>
            
            <div className="border-2 border-dashed border-default-200 rounded-xl p-8 text-center mb-4">
              <input
                type="file"
                multiple
                accept=".png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              
              <Button
                color="primary"
                onClick={() => fileInputRef.current?.click()}
                startContent={<Upload className="h-5 w-5" />}
                className="mb-4"
                size="lg"
              >
                Select PNG, JPG files
              </Button>
              
              <p className="text-default-500 text-sm">
                or drag and drop files here (max 10MB per file)
              </p>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-medium">Selected Files ({files.length})</h3>
                  <Button
                    color="danger"
                    variant="light"
                    onClick={handleClearAll}
                    size="sm"
                    startContent={<Trash2 className="h-4 w-4" />}
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="max-h-48 overflow-y-auto border border-default-200 rounded-lg">
                  {files.map((file, index) => (
                    <div key={index} className="flex justify-between items-center p-2 hover:bg-default-100">
                      <div className="flex items-center">
                        <ImageIcon className="h-4 w-4 mr-2 text-default-500" />
                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                        <span className="text-xs text-default-500 ml-2">({formatBytes(file.size)})</span>
                      </div>
                      <Button
                        color="danger"
                        variant="light"
                        size="sm"
                        isIconOnly
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Preview Section */}
            {previewImage && (
              <div className="mt-4">
                <h3 className="text-base font-medium mb-2">Preview:</h3>
                <div className="border border-default-200 rounded-lg p-2 text-center">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-64 max-w-full inline-block"
                  />
                </div>
              </div>
            )}

            {/* Options Section */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium text-primary">Conversion Options</h3>
                <Button
                  color="secondary"
                  variant="light"
                  size="sm"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  startContent={<Settings className="h-4 w-4" />}
                >
                  {showAdvancedOptions ? 'Hide Advanced' : 'Show Advanced'}
                </Button>
              </div>
              
              <Card className="p-4 bg-default-100">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Quality: {options.quality}%</label>
                  <Slider
                    size="sm"
                    step={1}
                    minValue={1}
                    maxValue={100}
                    defaultValue={options.quality}
                    value={options.quality}
                    onChange={(value) => setOptions({...options, quality: value as number})}
                    className="max-w-full"
                  />
                  <p className="text-xs text-default-500 mt-1">
                    Higher quality = larger file size (80% recommended)
                  </p>
                </div>
                
                <div className="mb-2">
                  <Checkbox
                    isSelected={options.lossless}
                    onChange={() => setOptions({...options, lossless: !options.lossless})}
                  >
                    <span className="text-sm">Lossless conversion (larger files but perfect quality)</span>
                  </Checkbox>
                </div>
                
                {showAdvancedOptions && (
                  <div className="mt-4 border-t border-default-200 pt-4">
                    <div className="mb-4">
                      <Checkbox
                        isSelected={options.maintainAspectRatio}
                        onChange={() => setOptions({...options, maintainAspectRatio: !options.maintainAspectRatio})}
                      >
                        <span className="text-sm">Maintain aspect ratio when resizing</span>
                      </Checkbox>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Width (px)</label>
                        <Input
                          type="number"
                          min="1"
                          variant='bordered'
                          placeholder="Original width"
                          value={options.resizeWidth?.toString() || ''}
                          onChange={(e) => setOptions({
                            ...options,
                            resizeWidth: e.target.value ? parseInt(e.target.value) : null
                          })}
                          size="sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Height (px)</label>
                        <Input
                          type="number"
                          min="1"
                           variant='bordered'
                          placeholder="Original height"
                          value={options.resizeHeight?.toString() || ''}
                          onChange={(e) => setOptions({
                            ...options,
                            resizeHeight: e.target.value ? parseInt(e.target.value) : null
                          })}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
            
            <Button
              onClick={convertToWebP}
              className="w-full mt-4"
              color="primary"
              isLoading={isConverting}
              startContent={!isConverting ? <ImagePlus className="h-5 w-5" /> : null}
              size="lg"
            >
              {isConverting ? `Converting... ${batchProgress}%` : 'Convert to WebP'}
            </Button>
          </CardBody>
        </Card>
        
        {/* Stats Section */}
        {convertedFiles.length > 0 && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <h3 className="text-lg font-medium text-default-700 mb-4">Conversion Statistics</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <div className="text-sm text-default-500">Files Converted</div>
                  <div className="text-xl font-bold">{convertedCount}</div>
                </div>
                
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <div className="text-sm text-default-500">Original Size</div>
                  <div className="text-xl font-bold">{formatBytes(totalOriginalSize)}</div>
                </div>
                
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <div className="text-sm text-default-500">Space Saved</div>
                  <div className="text-xl font-bold">{formatBytes(totalSavings)}</div>
                </div>
                
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <div className="text-sm text-default-500">Compression Ratio</div>
                  <div className="text-xl font-bold">{compressionRatio.toFixed(1)}%</div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
        
        {/* Result Section */}
        {convertedFiles.length > 0 && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-lg font-medium text-default-700">Converted Files:</label>
                <Button
                  color="primary"
                  onClick={handleDownloadAll}
                  startContent={<Download className="h-4 w-4" />}
                >
                  Download All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {convertedFiles.map((file, index) => (
                  <Card key={index} className="border border-default-200">
                    <CardBody className="p-4">
                      <div className="text-center mb-2">
                        <img 
                          src={file.url} 
                          alt={file.name} 
                          className="max-h-32 inline-block"
                        />
                      </div>
                      
                      <div className="text-sm truncate font-medium mb-1">{file.name}</div>
                      
                      <div className="grid grid-cols-2 gap-1 text-xs text-default-500 mb-2">
                        <div>Original: {formatBytes(file.originalSize)}</div>
                        <div>WebP: {formatBytes(file.newSize)}</div>
                        <div>Saved: {formatBytes(file.originalSize - file.newSize)}</div>
                        <div>Reduction: {((1 - (file.newSize / file.originalSize)) * 100).toFixed(1)}%</div>
                      </div>
                      
                      <Button
                        color="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => handleDownloadSingle(file)}
                        startContent={<Download className="h-4 w-4" />}
                      >
                        Download
                      </Button>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
        
     
      </div>
         {/* Info Section */}
       <InfoSectionPngConverter />
    </ToolLayout>
  );
}