"use client"

import React, { useState } from 'react'
import { Upload } from 'lucide-react'

interface FileUploaderProps {
  onFileSelect: (fileUrl: string) => void
  id: string
  label: string
  accept?: string
  maxSize?: number // in MB
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  id,
  label,
  accept = "image/*",
  maxSize = 2 // default 2MB
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (file: File) => {
    setError(null)
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size should be less than ${maxSize}MB`)
      return
    }
    
    // Create a URL for preview
    const fileUrl = URL.createObjectURL(file)
    setPreview(fileUrl)
    onFileSelect(fileUrl)
  }

  return (
    <div className="w-full">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium mb-1"
      >
        {label}
      </label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-opacity-5 hover:bg-gray-700 transition-all ${
          isDragging ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(id)?.click()}
      >
        <input 
          type="file" 
          id={id} 
          className="hidden" 
          accept={accept} 
          onChange={handleFileChange}
        />
        
        {preview ? (
          <div className="flex flex-col items-center">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-16 h-16 object-contain mb-2" 
            />
            <span className="text-xs text-gray-500">
              Click or drop to change
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Max size: {maxSize}MB
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}

export default FileUploader