"use client"

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardBody, Button, Input,  Slider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch } from "@nextui-org/react";
import { Download, Code, Info, BookOpen, Lightbulb, Sliders, Palette, FileImage,  Eye, ShuffleIcon, ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import ToolLayout from "@/components/ToolLayout";
import NextImage from "next/image"

export default function SVGBlobGenerator() {
    const [fillColor, setFillColor] = useState("#474bff");
    const [growth, setGrowth] = useState(6);
    const [edgeCount, setEdgeCount] = useState(6);
    const [complexity, setComplexity] = useState(0.5);
    const [smoothness, setSmoothness] = useState(0.5);
    const [useImageBackground, setUseImageBackground] = useState(false);
    const [backgroundUrl, setBackgroundUrl] = useState("https://picsum.photos/seed/781/600/400");
    const [svgPath, setSvgPath] = useState("");
    const svgRef = useRef<SVGSVGElement>(null);
  
    const generateBlob = useCallback(() => {
      const size = 480;
      const center = size / 2;
      const points: [number, number][] = [];
      const angleStep = (Math.PI * 2) / edgeCount;
      
      // Adjust the maximum radius to prevent edge collision
      const maxRadius = center * 0.8; // 80% of distance to edge
      const minRadius = center * 0.2; // 20% of distance to edge
      const baseRadius = minRadius + (maxRadius - minRadius) * (growth / 10);
      
      for (let i = 0; i < edgeCount; i++) {
        const angle = i * angleStep;
        
        // Scale randomness based on available space
        const maxRandomness = (maxRadius - baseRadius) * complexity;
        const randomness = (Math.random() - 0.5) * maxRandomness;
        
        // Apply smoothness to radius calculation
        const wobble = Math.sin(angle * 4) * smoothness * (maxRadius - baseRadius) * 0.2;
        
        // Ensure radius stays within bounds
        const radius = Math.min(Math.max(baseRadius + randomness + wobble, minRadius), maxRadius);
        
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        points.push([x, y]);
      }
  
      // Generate smooth curve path
      let path = `M${points[0][0]},${points[0][1]} `;
      points.forEach((point, i) => {
        const nextPoint = points[(i + 1) % points.length];
        const controlX = (point[0] + nextPoint[0]) / 2;
        const controlY = (point[1] + nextPoint[1]) / 2;
        path += `Q${point[0]},${point[1]} ${controlX},${controlY} `;
      });
      path += "Z";
  
      setSvgPath(path);
    }, [growth, edgeCount, complexity, smoothness]);
  
    useEffect(() => {
      generateBlob();
    }, [generateBlob]);
  
    const handleShuffle = () => {
      generateBlob();
      toast.success("New blob shape generated!");
    };
  
    const handleShuffleImage = () => {
      const randomId = Math.floor(Math.random() * 1000);
      setBackgroundUrl(`https://picsum.photos/seed/${randomId}/600/400`);
      toast.success("New background image applied!");
    };
  
    const getSVGContent = () => {
      return `<svg id="blob-generator" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
    ${useImageBackground ? `
    <defs>
      <clipPath id="blob-shape">
        <path d="${svgPath}" />
      </clipPath>
    </defs>
    <image href="${backgroundUrl}" width="480" height="480" clip-path="url(#blob-shape)" preserveAspectRatio="xMidYMid slice" />
    ` : `<path fill="${fillColor}" d="${svgPath}" />`}
  </svg>`;
    };
  
    const handleExport = (key: string) => {
      const svgContent = getSVGContent();
      
      switch (key) {
        case "svg":
          const blob = new Blob([svgContent], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "blob.svg";
          a.click();
          URL.revokeObjectURL(url);
          toast.success("SVG exported successfully!");
          break;
        
        case "png":
          if (svgRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = 480;
            canvas.height = 480;
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
              if (ctx) {
                ctx.drawImage(img, 0, 0, 480, 480);
                canvas.toBlob((blob) => {
                  if (blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "blob.png";
                    a.click();
                    URL.revokeObjectURL(url);
                    toast.success("PNG exported successfully!");
                  }
                });
              }
            };
            img.src = `data:image/svg+xml;base64,${btoa(svgContent)}`;
          }
          break;
        
        case "code":
          navigator.clipboard.writeText(svgContent);
          toast.success("SVG code copied to clipboard!");
          break;
      }
    };
  
    return (
      <ToolLayout
        title="SVG Blob Generator"
        description="Create unique, organic blob shapes with ease"
        toolId="678f382a26f06f912191bc91"
      >
        <div className="flex flex-col gap-8">
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                  <svg
                    ref={svgRef}
                    className="w-full h-full transition-all duration-500 ease-in-out"
                    viewBox="0 0 480 480"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {useImageBackground ? (
                      <>
                        <defs>
                          <clipPath id="blob-shape">
                            <path d={svgPath} />
                          </clipPath>
                        </defs>
                        <image
                          href={backgroundUrl}
                          width="480"
                          height="480"
                          clipPath="url(#blob-shape)"
                          preserveAspectRatio="xMidYMid slice"
                        />
                      </>
                    ) : (
                      <path d={svgPath} fill={fillColor} />
                    )}
                  </svg>
                </div>
  
                <div className="space-y-6">
                  <Input
                    label="Blob Fill Color"
                    type="color"
                    value={fillColor}
                    onChange={(e) => setFillColor(e.target.value)}
                    className="w-full"
                    variant="bordered"
                    labelPlacement="outside"
                  />
  
                  <Slider
                    label="Growth"
                    step={0.1}
                    maxValue={10}
                    minValue={1}
                    value={growth}
                    onChange={(value) => setGrowth(Number(value))}
                    className="max-w-md"
                  />
  
                  <Slider
                    label="Edge Count"
                    step={1}
                    maxValue={20}
                    minValue={3}
                    value={edgeCount}
                    onChange={(value) => setEdgeCount(Number(value))}
                    className="max-w-md"
                  />
  
                  <Slider
                    label="Complexity"
                    step={0.01}
                    maxValue={1}
                    minValue={0}
                    value={complexity}
                    onChange={(value) => setComplexity(Number(value))}
                    className="max-w-md"
                  />
  
                  <Slider
                    label="Smoothness"
                    step={0.01}
                    maxValue={1}
                    minValue={0}
                    value={smoothness}
                    onChange={(value) => setSmoothness(Number(value))}
                    className="max-w-md"
                  />
  
                  <div className="flex items-center gap-4">
                    <Switch
                      isSelected={useImageBackground}
                      onValueChange={setUseImageBackground}
                    />
                    <span>Use Image Background</span>
                  </div>
  
                  {useImageBackground && (
                    <div className="space-y-2">
                      <Input
                        label="Background Image URL"
                        value={backgroundUrl}
                        onChange={(e) => setBackgroundUrl(e.target.value)}
                        className="w-full"
                        variant="bordered"
                      />
                      <Button 
                        color="primary" 
                        onPress={handleShuffleImage}
                        startContent={<ImageIcon className="w-4 h-4" />}
                      >
                        Random Image
                      </Button>
                    </div>
                  )}
  
                  <div className="flex gap-2">
                    <Button 
                      color="primary" 
                      onPress={handleShuffle}
                      startContent={<ShuffleIcon className="w-4 h-4" />}
                    >
                      Shuffle Blob
                    </Button>
                    
                    <Dropdown>
                      <DropdownTrigger>
                        <Button color="primary">
                          <Download className="w-4 h-4 " />
                          Export
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Export options"
                        onAction={(key) => handleExport(key as string)}
                      >
                        <DropdownItem key="svg"  className="text-default-700">Export SVG</DropdownItem>
                        <DropdownItem key="png"  className="text-default-700">Export PNG</DropdownItem>
                        <DropdownItem key="code"  className="text-default-700" startContent={<Code className="w-4 h-4" />}>
                          Copy SVG Code
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

        <Card className="mt-6 bg-default-50 dark:bg-default-100 p-4 md:p-8">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the SVG Blob Generator?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The SVG Blob Generator is a powerful and user-friendly tool designed to create unique, organic blob
                shapes for various design purposes. Whether you're a web designer, graphic artist, or just someone
                looking to add a touch of creativity to your projects, this tool provides an intuitive interface to
                craft custom, scalable vector graphics with ease.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                With a range of adjustable parameters and real-time preview, you can fine-tune your blob shapes to
                perfectly fit your design needs. The generator offers options for solid color fills or image
                backgrounds, allowing for versatile applications in web design, digital art, and more.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/SVGBlobPreview.png"
                  alt="Screenshot of the SVG Blob Generator interface showing blob customization options and a preview"
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
                How to Use the SVG Blob Generator?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Adjust the "Growth" slider to control the overall size and expansion of the blob.</li>
                <li>Use the "Edge Count" slider to determine the number of points that form the blob's shape.</li>
                <li>Modify "Complexity" to add more intricate details and variations to the blob's edges.</li>
                <li>Adjust "Smoothness" to control how rounded or sharp the blob's curves appear.</li>
                <li>Choose a fill color using the color picker or enter a hex code for precise color selection.</li>
                <li>Toggle "Use Image Background" to fill the blob with an image instead of a solid color.</li>
                <li>If using an image background, enter a URL or click "Random Image" for variety.</li>
                <li>Click "Shuffle Blob" to generate a new random shape based on your current settings.</li>
                <li>Use the export options to download your blob as an SVG or PNG file, or copy the SVG code.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <Sliders className="w-4 h-4 inline-block mr-1" /> <strong>Customizable Parameters:</strong> Fine-tune
                  growth, edge count, complexity, and smoothness
                </li>
                <li>
                  <Palette className="w-4 h-4 inline-block mr-1" /> <strong>Color Options:</strong> Choose any color for
                  your blob or use an image background
                </li>
                <li>
                  <FileImage className="w-4 h-4 inline-block mr-1" /> <strong>Image Background:</strong> Fill your blob
                  with images for unique effects
                </li>
                <li>
                  <ShuffleIcon className="w-4 h-4 inline-block mr-1" /> <strong>Randomization:</strong> Quickly generate new
                  shapes and apply random background images
                </li>
                <li>
                  <Download className="w-4 h-4 inline-block mr-1" /> <strong>Multiple Export Options:</strong> Save as
                  SVG, PNG, or copy the SVG code directly
                </li>
                <li>
                  <Code className="w-4 h-4 inline-block mr-1" /> <strong>SVG Code Access:</strong> Get the raw SVG code
                  for easy integration into your projects
                </li>
                <li>
                  <Eye className="w-4 h-4 inline-block mr-1" /> <strong>Real-time Preview:</strong> See changes
                  instantly as you adjust parameters
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Creative Tips and Tricks
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Combine low edge count with high complexity for interesting, organic shapes.</li>
                <li>Use high smoothness for cloud-like blobs, or low smoothness for more abstract designs.</li>
                <li>Experiment with image backgrounds for creative masking effects in your designs.</li>
                <li>Generate multiple blobs with similar settings for a cohesive design language.</li>
                <li>Layer multiple SVG blobs with different opacities for depth and texture in your designs.</li>
                <li>Use the SVG code to create animated blobs in web projects using CSS or JavaScript.</li>
                <li>Combine blob shapes with text for unique logo designs or headers.</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                Applications and Use Cases
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Web Design:</strong> Create unique background elements, headers, or section dividers
                </li>
                <li>
                  <strong>Graphic Design:</strong> Design abstract logos, icons, or decorative elements
                </li>
                <li>
                  <strong>Digital Art:</strong> Use as a base for digital illustrations or abstract art pieces
                </li>
                <li>
                  <strong>UI/UX Design:</strong> Craft organic shapes for buttons, avatars, or layout elements
                </li>
                <li>
                  <strong>Presentations:</strong> Add visual interest to slides with custom blob shapes
                </li>
                <li>
                  <strong>Social Media:</strong> Create eye-catching graphics for posts or profile pictures
                </li>
                <li>
                  <strong>Print Design:</strong> Incorporate organic shapes into brochures, posters, or packaging
                  designs
                </li>
                <li>
                  <strong>Educational Materials:</strong> Use blobs to create engaging visuals for learning resources
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                Ready to unleash your creativity with unique, organic shapes? Our SVG Blob Generator offers endless
                possibilities for your design projects. Whether you're creating web graphics, digital art, or print
                materials, this tool provides the flexibility and ease of use you need to bring your ideas to life.
                Start experimenting with blob shapes now and elevate your designs to the next level!
              </p>
            </div>

        </Card>
      </div>
    </ToolLayout>
  )
}

