'use client'
import React, { useState, useRef, useCallback } from "react";
import { Button, Card, CardBody, Input, Select, SelectItem, Slider } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import {
  Upload,
  Download,
  Trash,
  AlertTriangle,
  Info,
  BookOpen,
  Lightbulb,
  Scissors,
  SlidersHorizontal,
  Eye,
  RefreshCw,
  Smartphone,
  Lock,
  RefreshCcw,
} from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import NextImage from "next/image";

interface ConversionMethod {
    value: "default" | "traced" | "pixel";
    label: string;
  }
  
  interface ColorReduction {
    value: string;
    label: string;
  }
  
  const conversionMethodOptions: ConversionMethod[] = [
    { value: "default", label: "Default" },
    { value: "traced", label: "Traced Outlines" },
    { value: "pixel", label: "Pixel Perfect" },
  ];
  
  const colorReductionOptions: ColorReduction[] = [
    { value: "2", label: "2 colors" },
    { value: "16", label: "16 colors" },
    { value: "64", label: "64 colors" },
    { value: "128", label: "128 colors" },
    { value: "256", label: "256 colors" },
  ];
  
  export default function PNGtoSVGConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [svgData, setSvgData] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [colorReduction, setColorReduction] = useState<string>("16");
    const [smoothing, setSmoothing] = useState<number>(0);
    const [conversionMethod, setConversionMethod] = useState<ConversionMethod["value"]>("default");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile && selectedFile.type === "image/png") {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setSvgData(null);
        setError(null);
        toast.success("PNG file uploaded successfully!");
      } else {
        toast.error("Please select a valid PNG file.");
      }
    };
  
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile && droppedFile.type === "image/png") {
        setFile(droppedFile);
        setPreviewUrl(URL.createObjectURL(droppedFile));
        setSvgData(null);
        setError(null);
        toast.success("PNG file uploaded successfully!");
      } else {
        toast.error("Please drop a valid PNG file.");
      }
    };
  
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };
  
    const convertToSVG = useCallback(async () => {
      if (!file) {
        toast.error("Please select a PNG file first.");
        return;
      }
  
      setIsLoading(true);
      setError(null);
  
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("colorReduction", colorReduction);
        formData.append("smoothing", smoothing.toString());
        formData.append("conversionMethod", conversionMethod);
  
        const response = await fetch("/api/convertToSvg", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Conversion failed");
        }
  
        const data = await response.text();
        setSvgData(data);
        toast.success("PNG converted to SVG successfully!");
      } catch (error) {
        console.error("Conversion error:", error);
        setError(error instanceof Error ? error.message : "Error during conversion");
        toast.error("Conversion failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, [file, colorReduction, smoothing, conversionMethod]);
  
    const downloadSVG = () => {
      if (!svgData) {
        toast.error("No SVG data available. Please convert a PNG file first.");
        return;
      }
  
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("SVG file downloaded successfully!");
    };
  
    const resetConverter = () => {
      setFile(null);
      setSvgData(null);
      setPreviewUrl(null);
      setColorReduction("16");
      setSmoothing(0);
      setConversionMethod("default");
      setError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Converter reset successfully!");
    };
  
    return (
      <ToolLayout
        title="PNG to SVG Converter"
        description="Convert PNG images to scalable vector graphics (SVG) format with customizable options"
        toolId="678f382b26f06f912191bc95"
      >
  
        <div className="flex flex-col gap-8">
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <div className="flex items-center mb-2">
                <Lock className="w-4 h-4 inline-block mr-1" />
                <strong className="text-sm">Secure Conversion:</strong>
                <span className="text-sm ml-1">All processing is done locally</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Upload PNG</h2>
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".png,image/png"
                className="hidden"
                id="png-upload"
              />
              <div
                className="flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <Upload size={32} />
                <span className="mt-2 text-sm sm:text-base text-center leading-normal">
                  Select PNG file or drag and drop
                </span>
              </div>
            </CardBody>
          </Card>
  
          {error && (
            <Card className="bg-danger-50 dark:bg-danger-100">
              <CardBody className="p-4 flex items-center">
                <AlertTriangle className="mr-2 text-danger" />
                <p className="text-danger">{error}</p>
              </CardBody>
            </Card>
          )}
  
          {previewUrl && (
            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4">PNG Preview</h3>
                <div className="relative h-64 bg-default-200 dark:bg-default-50 rounded-lg overflow-hidden mb-4">
                  <NextImage src={previewUrl} alt="PNG Preview" fill style={{ objectFit: "contain" }} />
                </div>
  
                <h3 className="text-xl font-bold mb-4">Conversion Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Conversion Method"
                    selectedKeys={[conversionMethod]}
                    onChange={(e) => setConversionMethod(e.target.value as ConversionMethod["value"])}
                    className="w-full"
                    variant="bordered"
                  >
                    {conversionMethodOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
  
                  <Select
                    label="Color Reduction"
                    selectedKeys={[colorReduction]}
                    onChange={(e) => setColorReduction(e.target.value)}
                    className="w-full"
                    variant="bordered"
                  >
                    {colorReductionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
  
                  <div className="col-span-2">
                    <Slider
                      label="Smoothing"
                      step={1}
                      maxValue={10}
                      minValue={0}
                      value={smoothing}
                      onChange={(value) => setSmoothing(Number(value))}
                      className="max-w-md"
                    />
                  </div>
                </div>
  
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Button color="primary" onPress={convertToSVG} isLoading={isLoading}>
                    <RefreshCcw className="h-5 w-5 mr-2" />
                    {isLoading ? "Converting..." : "Convert to SVG"}
                  </Button>
                  <Button color="danger" onPress={resetConverter}>
                    <Trash className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
  
          {svgData && (
            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4">Generated SVG</h3>
                <div className="bg-white p-4 rounded-lg relative">
                  <div
                    dangerouslySetInnerHTML={{ __html: svgData }}
                    className="text-sm overflow-x-auto"
                    style={{ maxWidth: "100%", maxHeight: "400px", overflow: "auto" }}
                  />
                  <Button color="primary" size="sm" onPress={downloadSVG} className="absolute top-2 right-2">
                    <Download className="h-4 w-4 mr-2" />
                    Download SVG
                  </Button>
                </div>
              </CardBody>
            </Card>
        )}

         {/* Info Section */}
         <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Image to Base64 Converter?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Image to Base64 Converter is a powerful tool designed to transform image files into Base64 encoded
                strings. This conversion process is essential for developers and designers who need to embed image data
                directly into their HTML, CSS, or JavaScript files, or for those who need to transmit image data as plain
                text in various applications.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Base64 encoding is a method of representing binary data using a set of 64 characters. This makes it possible
                to include image data within text-based formats, which is particularly useful in web development and data
                transmission scenarios where binary data cannot be directly used.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/ImagetoBase64Preview.png?height=400&width=600"
                  alt="Screenshot of the Image to Base64 Converter"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2
                id="how-to-use"
                className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the Image to Base64 Converter
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Navigate to the "Upload" tab.</li>
                <li>Click on the upload area to select image files or drag and drop image files into the designated zone.</li>
                <li>The tool will automatically convert your images to Base64 format.</li>
                <li>Switch to the "Converted Images" tab to view and manage your converted images.</li>
                <li>For each converted image, you can:</li>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>Copy the Base64 string to your clipboard.</li>
                  <li>Download the Base64 string as a text file.</li>
                  <li>View a preview of the image.</li>
                  <li>Remove individual images as needed.</li>
                </ul>
                <li>Use the "Sort By" dropdown to organize your converted images.</li>
                <li>Download all Base64 strings as a ZIP file or clear all converted images using the respective buttons.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Support for multiple image file uploads.</li>
                <li>Drag and drop functionality for easy file selection.</li>
                <li>Preview converted images before copying or downloading.</li>
                <li>Copy Base64 encoded strings directly to your clipboard.</li>
                <li>Download individual Base64 encoded strings as text files.</li>
                <li>Batch download all converted Base64 strings as a ZIP file.</li>
                <li>Sort converted images by name, size, or file type.</li>
                <li>Remove individual images or clear all converted images.</li>
                <li>10MB file size limit per image for optimal performance.</li>
                <li>Responsive design for seamless use on desktop and mobile devices.</li>
              </ul>
            </div>
          </CardBody>
        </Card>

      </div>
    </ToolLayout>
  )
}

