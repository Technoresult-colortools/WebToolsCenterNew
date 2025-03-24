"use client"

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardBody, Button, Input, Slider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch } from "@nextui-org/react";
import { Download, Code, Info, BookOpen, Lightbulb, Sliders, Palette, FileImage, Eye, ShuffleIcon, ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import ToolLayout from "@/components/ToolLayout";
import NextImage from "next/image"

export default function SVGBlobGenerator() {
    // Basic blob parameters
    const [fillColor, setFillColor] = useState("#474bff");
    const [growth, setGrowth] = useState(6);
    const [edgeCount, setEdgeCount] = useState(8);
    const [complexity, setComplexity] = useState(0.7);
    const [smoothness, setSmoothness] = useState(0.5);
    
    // Advanced blob parameters
    const [frequency, setFrequency] = useState(4);
    const [amplitude, setAmplitude] = useState(0.5);
    const [randomSeed, setRandomSeed] = useState(Math.random() * 1000);
    
    // Path generation method
    const [pathMethod, setPathMethod] = useState("advanced"); // "simple" or "advanced"
    
    // Animation state
    const [isShaking, setIsShaking] = useState(false);
    
    // Image background settings
    const [useImageBackground, setUseImageBackground] = useState(false);
    const [backgroundUrl, setBackgroundUrl] = useState("https://picsum.photos/seed/781/600/400");
    
    // SVG state
    const [svgPath, setSvgPath] = useState("");
    const svgRef = useRef<SVGSVGElement>(null);
    
    // Generate blob points using advanced algorithm
    const generateBlobPoints = useCallback(() => {
        const size = 480;
        const center = size / 2;
        const points: [number, number][] = [];
        const angleStep = (Math.PI * 2) / edgeCount;
        
        // Maximum radius to prevent edge collision
        const maxRadius = center * 0.8;
        const minRadius = center * 0.2;
        const baseRadius = minRadius + (maxRadius - minRadius) * (growth / 10);
        
        // Generate points at consistent angles
        for (let i = 0; i < edgeCount; i++) {
            const angle = i * angleStep;
            
            // Add high-frequency detail using sine waves
            const sineWave = Math.sin(angle * frequency) * amplitude;
            
            // Create randomness based on angle and seed
            const randomFactor = (Math.sin(angle * randomSeed) + Math.cos(angle * randomSeed * 0.7)) * 0.5;
            
            // Scale randomness based on available space
            const maxRandomness = (maxRadius - baseRadius) * complexity;
            const randomness = (randomFactor * maxRandomness) + (sineWave * maxRandomness);
            
            // Apply smoothness to radius calculation
            const wobble = Math.sin(angle * 3) * smoothness * (maxRadius - baseRadius) * 0.2;
            
            // Ensure radius stays within bounds
            const radius = Math.min(Math.max(baseRadius + randomness + wobble, minRadius), maxRadius);
            
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            points.push([x, y]);
        }
        
        return points;
    }, [growth, edgeCount, complexity, smoothness, frequency, amplitude, randomSeed]);

    // Generate path using advanced curve method (from first code)
    const generateAdvancedPath = useCallback((points: [number, number][]) => {
        let path = `M${points[0][0]},${points[0][1]} `;
        
        // Handle each point with proper curve control to create rounded, flowing blob
        for (let i = 0; i < points.length; i++) {
            const currentPoint = points[i];
            const nextPoint = points[(i + 1) % points.length];
            
            // Calculate control points for quadratic bezier curve
            const dx = nextPoint[0] - currentPoint[0];
            const dy = nextPoint[1] - currentPoint[1];
            
            // Create smooth, flowing curves by placing control points along the curve
            const controlX = nextPoint[0] - dx * smoothness;
            const controlY = nextPoint[1] - dy * smoothness;
            
            // Use Q (quadratic bezier) for smoother, more natural curves
            path += `Q${controlX},${controlY} ${nextPoint[0]},${nextPoint[1]} `;
        }
        
        path += "Z";
        return path;
    }, [smoothness]);

    // Generate path using simple method (from second code)
    const generateSimplePath = useCallback((points: [number, number][]) => {
        let path = `M${points[0][0]},${points[0][1]} `;
        
        points.forEach((point, i) => {
            const nextPoint = points[(i + 1) % points.length];
            const controlX = (point[0] + nextPoint[0]) / 2;
            const controlY = (point[1] + nextPoint[1]) / 2;
            path += `Q${point[0]},${point[1]} ${controlX},${controlY} `;
        });
        
        path += "Z";
        return path;
    }, []);

    // Main function to generate blob
    const generateBlob = useCallback(() => {
        const points = generateBlobPoints();
        
        // Use selected path generation method
        if (pathMethod === "simple") {
            setSvgPath(generateSimplePath(points));
        } else {
            setSvgPath(generateAdvancedPath(points));
        }
    }, [generateBlobPoints, generateAdvancedPath, generateSimplePath, pathMethod]);

    useEffect(() => {
        generateBlob();
    }, [generateBlob]);
    
    // Trigger blob regeneration with a new seed
    const handleShuffle = () => {
        // Update the random seed with a new value
        const newSeed = Math.random() * 1000;
        setRandomSeed(newSeed);
        
        // Start shaking animation
        setIsShaking(true);
        
        // Stop shaking after animation completes
        setTimeout(() => {
            setIsShaking(false);
        }, 500);
        
        toast.success("New blob shape generated!");
    };
    
    const handleRandomizeAll = () => {
        setIsShaking(true);
        
        // Use rounded numbers for better UX
        setEdgeCount(Math.floor(Math.random() * 12) + 5);
        setComplexity(Math.round((Math.random() * 0.8 + 0.2) * 100) / 100);
        setSmoothness(Math.round((Math.random() * 0.8 + 0.2) * 100) / 100);
        setFrequency(Math.floor(Math.random() * 10) + 1);
        setAmplitude(Math.round((Math.random() * 0.7 + 0.3) * 100) / 100);
        setGrowth(Math.round((Math.random() * 5 + 4) * 10) / 10);
        setRandomSeed(Math.random() * 1000);
        
        // Stop shaking after animation completes
        setTimeout(() => {
            setIsShaking(false);
        }, 500);
        
        toast.success("All parameters randomized!");
    };
    
    const handleShuffleImage = () => {
        const randomId = Math.floor(Math.random() * 1000);
        setBackgroundUrl(`https://picsum.photos/seed/${randomId}/600/400`);
        toast.success("New background image applied!");
    };
    
    const getSVGContent = () => {
        return `<svg id="blob-generator" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                            {/* Blob preview with shaking animation */}
                            <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                                <svg
                                    ref={svgRef}
                                    className={`w-full h-full transition-all duration-300 ease-in-out ${isShaking ? 'animate-blob-shake' : ''}`}
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
                            
                            {/* Controls section */}
                            <div className="space-y-4">
                                {/* Action buttons */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <Button 
                                        color="primary" 
                                        onPress={handleShuffle}
                                        startContent={<ShuffleIcon className="w-4 h-4" />}
                                    >
                                        Shuffle Blob
                                    </Button>
                                    
                                    <Button 
                                        color="secondary" 
                                        onPress={handleRandomizeAll}
                                        startContent={<Sliders className="w-4 h-4" />}
                                    >
                                        Randomize All
                                    </Button>
                                    
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button color="primary">
                                                <Download className="w-4 h-4 mr-1" />
                                                Export
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Export options"
                                            onAction={(key) => handleExport(key as string)}
                                        >
                                            <DropdownItem key="svg" className="text-default-700">Export SVG</DropdownItem>
                                            <DropdownItem key="png" className="text-default-700">Export PNG</DropdownItem>
                                            <DropdownItem key="code" className="text-default-700" startContent={<Code className="w-4 h-4" />}>
                                                Copy SVG Code
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                
                                {/* Main controls */}
                                <div className="space-y-6">
                                    {/* Color picker */}
                                    <div className="flex items-center gap-3">
                                        <Palette className="w-5 h-5 opacity-70" />
                                        <Input
                                            label="Blob Fill Color"
                                            type="color"
                                            value={fillColor}
                                            onChange={(e) => setFillColor(e.target.value)}
                                            className="w-full"
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                    </div>
                                    
                                    {/* Path Method Selector */}
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="text-md font-medium">Curve Style:</span>
                                        <Switch
                                            isSelected={pathMethod === "simple"}
                                            onValueChange={(checked) => setPathMethod(checked ? "simple" : "advanced")}
                                        />
                                        <span>{pathMethod === "simple" ? "Simple Curves" : "Advanced Curves"}</span>
                                    </div>
                                    
                                    {/* Sliders section */}
                                    <div className="space-y-3">
                                        <h3 className="text-md font-medium">Shape Controls</h3>
                                        
                                        <Slider
                                            label="Growth"
                                            step={0.1}
                                            maxValue={10}
                                            minValue={1}
                                            value={growth}
                                            onChange={(value) => setGrowth(Number(value))}
                                            className="max-w-md mb-3"
                                            showSteps={true}
                                        />
                                        
                                        <Slider
                                            label="Edge Count"
                                            step={1}
                                            maxValue={20}
                                            minValue={3}
                                            value={edgeCount}
                                            onChange={(value) => setEdgeCount(Number(value))}
                                            className="max-w-md mb-3"
                                            showSteps={true}
                                        />
                                        
                                        <Slider
                                            label="Complexity"
                                            step={0.01}
                                            maxValue={1}
                                            minValue={0}
                                            value={complexity}
                                            onChange={(value) => setComplexity(Number(value))}
                                            className="max-w-md mb-3"
                                        />
                                        
                                        <Slider
                                            label="Smoothness"
                                            step={0.01}
                                            maxValue={1}
                                            minValue={0}
                                            value={smoothness}
                                            onChange={(value) => setSmoothness(Number(value))}
                                            className="max-w-md mb-3"
                                        />
                                    </div>
                                    
                                    {/* Advanced controls section */}
                                    <div className="space-y-3">
                                        <h3 className="text-md font-medium">Wave Controls</h3>
                                        
                                        <Slider
                                            label="Wave Frequency"
                                            step={1}
                                            maxValue={10}
                                            minValue={1}
                                            value={frequency}
                                            onChange={(value) => setFrequency(Number(value))}
                                            className="max-w-md mb-3"
                                            showSteps={true}
                                        />
                                        
                                        <Slider
                                            label="Wave Amplitude"
                                            step={0.01}
                                            maxValue={1}
                                            minValue={0}
                                            value={amplitude}
                                            onChange={(value) => setAmplitude(Number(value))}
                                            className="max-w-md mb-3"
                                        />
                                    </div>
                                    
                                    {/* Image background controls */}
                                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Switch
                                                isSelected={useImageBackground}
                                                onValueChange={setUseImageBackground}
                                            />
                                            <span>Use Image Background</span>
                                        </div>
                                        
                                        {useImageBackground && (
                                            <div className="pt-2">
                                                <Button 
                                                    color="primary" 
                                                    onPress={handleShuffleImage}
                                                    startContent={<ImageIcon className="w-4 h-4" />}
                                                >
                                                    Random Image
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            
            {/* Add animation keyframes */}
            <style jsx global>{`
                @keyframes blob-shake {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    10% { transform: translate(-5px, -5px) rotate(-2deg); }
                    20% { transform: translate(3px, 2px) rotate(1deg); }
                    30% { transform: translate(5px, -2px) rotate(2deg); }
                    40% { transform: translate(-3px, 4px) rotate(-1deg); }
                    50% { transform: translate(-5px, -1px) rotate(2deg); }
                    60% { transform: translate(3px, 3px) rotate(-1deg); }
                    70% { transform: translate(2px, -4px) rotate(1deg); }
                    80% { transform: translate(-2px, 2px) rotate(2deg); }
                    90% { transform: translate(4px, -3px) rotate(-2deg); }
                }
                
                .animate-blob-shake {
                    animation: blob-shake 0.5s ease;
                }
            `}</style>

            <Card className="mt-6 bg-default-50 dark:bg-default-100 p-4 md:p-8">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the SVG Blob Generator?
                </h2>
                <p className="text-sm md:text-base text-default-600 mb-4">
                The SVG Blob generator is a powerful and intuitive device designed to create unique, organic drop shapes for your design projects. These smooth, flowing shapes add a modern and playful aesthetics for websites, presentations and graphic designs. With our generator, you can create a custom SVG blob which are fully scalable, light and ready to use in any digital project.
                </p>
                <p className="text-sm md:text-base text-default-600 mb-4">
                Unlike static design elements, our drop generator gives you complete control over every aspect of the presence of your drop. Adjust parameters such as growth, edge count, complexity and lubrication to create anything from simple, round shapes to complex, uncontrolled forms. You can also fill your drops with images for creative masking effects or use solid colors for clean, minimal designs.
                </p>

                <div className="my-8">
              <NextImage 
                src="/Images/InfosectionImages/SVGBlobGeneratorPreview.png?height=400&width=600"
                alt="Screenshot of the PNG to WebP Converter interface showing image conversion and optimization options" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

                <h2 id="how-to-use" className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the SVG Blob Generator?
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Start by exploring the default blob shape in the preview area.</li>
                <li>
                    Adjust the <strong>Growth</strong> slider to control the overall size of your blob.
                </li>
                <li>
                    Use the <strong>Edge Count</strong> slider to determine how many points form your blob's outline.
                </li>
                <li>
                    Modify <strong>Complexity</strong> to add more variation and detail to your blob's edges.
                </li>
                <li>
                    Adjust <strong>Smoothness</strong> to control how rounded or sharp the curves appear.
                </li>
                <li>
                    Fine-tune the <strong>Wave Frequency</strong> and <strong>Wave Amplitude</strong> for additional texture.
                </li>
                <li>
                    Choose between <strong>Simple Curves</strong> or <strong>Advanced Curves</strong> for different path generation
                    methods.
                </li>
                <li>
                    Select a fill color using the color picker, or toggle <strong>Use Image Background</strong> to fill your blob
                    with an image.
                </li>
                <li>
                    Click <strong>Shuffle Blob</strong> to generate a new random shape while keeping your current settings.
                </li>
                <li>
                    Use <strong>Randomize All</strong> to completely change all parameters for quick exploration.
                </li>
                <li>
                    When satisfied with your design, use the <strong>Export</strong> dropdown to save as SVG, PNG, or copy the SVG
                    code.
                </li>
                </ol>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                    <Sliders className="w-4 h-4 inline-block mr-1" /> <strong>Comprehensive Controls:</strong> Fine-tune every
                    aspect of your blob with intuitive sliders
                </li>
                <li>
                    <ShuffleIcon className="w-4 h-4 inline-block mr-1" /> <strong>Randomization Options:</strong> Quickly generate
                    new shapes with shuffle and randomize features
                </li>
                <li>
                    <Palette className="w-4 h-4 inline-block mr-1" /> <strong>Flexible Styling:</strong> Choose between solid colors
                    or image backgrounds for versatile designs
                </li>
                <li>
                    <Eye className="w-4 h-4 inline-block mr-1" /> <strong>Real-time Preview:</strong> See changes instantly as you
                    adjust parameters
                </li>
                <li>
                    <Download className="w-4 h-4 inline-block mr-1" /> <strong>Multiple Export Formats:</strong> Save your creations
                    as SVG or PNG files
                </li>
                <li>
                    <Code className="w-4 h-4 inline-block mr-1" /> <strong>Code Access:</strong> Copy the SVG code directly for easy
                    integration into your projects
                </li>
                <li>
                    <FileImage className="w-4 h-4 inline-block mr-1" /> <strong>Image Masking:</strong> Create unique visual effects
                    by clipping images to your blob shape
                </li>
                </ul>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Creative Tips and Tricks
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                    <strong>For smooth, cloud-like blobs:</strong> Use higher edge counts (10-15) with high smoothness (0.7-1.0) and
                    low complexity (0.2-0.4).
                </li>
                <li>
                    <strong>For abstract, angular shapes:</strong> Try lower edge counts (3-6) with low smoothness (0-0.3) and high
                    complexity (0.7-1.0).
                </li>
                <li>
                    <strong>For subtle background elements:</strong> Create large, gentle blobs with high growth (8-10) and moderate
                    smoothness (0.5-0.7).
                </li>
                <li>
                    <strong>For dynamic, flowing shapes:</strong> Increase wave frequency (6-10) and amplitude (0.6-0.9) with
                    moderate edge count (8-12).
                </li>
                <li>
                    <strong>For consistent brand elements:</strong> Save your favorite parameter combinations to recreate similar
                    blob styles across projects.
                </li>
                <li>
                    <strong>For layered designs:</strong> Export multiple blobs with slight variations and stack them with different
                    opacities in your design software.
                </li>
                <li>
                    <strong>For animated websites:</strong> Export several blob variations and use CSS or JavaScript to morph
                    between them.
                </li>
                <li>
                    <strong>For creative image displays:</strong> Use the image background feature with photos to create unique,
                    organic image frames.
                </li>
                </ul>

                <p className="text-sm md:text-base text-default-600 mt-6">
                Ready to add organic, fluid shapes to your design toolkit? Our SVG Blob Generator makes it easy to create custom,
                scalable vector graphics that can enhance any project. Whether you're looking for subtle background elements or
                bold, eye-catching shapes, the possibilities are endless. Start experimenting with different parameters to
                discover unique blob designs that perfectly complement your creative vision!
                </p>
            </div>
            </Card>
     
    </ToolLayout>
  )
}

