"use client"

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardBody, Button, Input, Slider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch } from "@nextui-org/react";
import { Download, Code,  Palette,  Shuffle, Upload, Trash2, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import ToolLayout from "@/components/ToolLayout";
import InfoSectionSVGBlob from "./info-section";

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
    
    // Animation state
    const [isShaking, setIsShaking] = useState(false);
    
    // Image background settings
    const [useImageBackground, setUseImageBackground] = useState(false);
    const [backgroundUrl, setBackgroundUrl] = useState("");
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    
    // Unsplash API key - replace with your own
    const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    
    // SVG state
    const [svgPath, setSvgPath] = useState("");
    const svgRef = useRef<SVGSVGElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
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

    // Generate path using advanced curve method
    const generateAdvancedPath = useCallback((points: [number, number][]) => {
        if (points.length === 0) return "";
        
        let path = `M${points[0][0]},${points[0][1]} `;
        
        // Create smooth curves using cubic bezier for better smoothness
        for (let i = 0; i < points.length; i++) {
            const current = points[i];
            const next = points[(i + 1) % points.length];
            const prev = points[(i - 1 + points.length) % points.length];
            const afterNext = points[(i + 2) % points.length];
            
            // Calculate control points for smoother curves
            const cp1x = current[0] + (next[0] - prev[0]) * smoothness * 0.25;
            const cp1y = current[1] + (next[1] - prev[1]) * smoothness * 0.25;
            
            const cp2x = next[0] - (afterNext[0] - current[0]) * smoothness * 0.25;
            const cp2y = next[1] - (afterNext[1] - current[1]) * smoothness * 0.25;
            
            // Use cubic bezier for smoother curves
            path += `C${cp1x},${cp1y} ${cp2x},${cp2y} ${next[0]},${next[1]} `;
        }
        
        path += "Z";
        return path;
    }, [smoothness]);

    // Main function to generate blob
    const generateBlob = useCallback(() => {
        const points = generateBlobPoints();
        setSvgPath(generateAdvancedPath(points));
    }, [generateBlobPoints, generateAdvancedPath]);

    useEffect(() => {
        generateBlob();
    }, [generateBlob]);
    
    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setUploadedImage(result);
                setBackgroundUrl(result);
                setUseImageBackground(true);
                toast.success("Image uploaded successfully!");
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleRemoveImage = () => {
        setUploadedImage(null);
        setBackgroundUrl("");
        setUseImageBackground(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        toast.success("Image removed");
    };
    
    const handleShuffleImage = async () => {
        try {
            setIsLoadingImage(true);
            const response = await fetch(
                `https://api.unsplash.com/photos/random?orientation=landscape&w=600&h=400`,
                {
                    headers: {
                        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
            
            const data = await response.json();
            setBackgroundUrl(data.urls.regular);
            setUploadedImage(null); // Clear uploaded image when using Unsplash
            setUseImageBackground(true);
            toast.success("New Unsplash image loaded!");
        } catch (error) {
            console.error('Error fetching Unsplash image:', error);
            toast.error('Failed to load image from Unsplash');
        } finally {
            setIsLoadingImage(false);
        }
    };
    
    // Trigger blob regeneration with a new seed
    const handleShuffle = () => {
        const newSeed = Math.random() * 1000;
        setRandomSeed(newSeed);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        toast.success("New blob shape generated!");
    };
    
    const handleRandomizeAll = () => {
        setIsShaking(true);
        setEdgeCount(Math.floor(Math.random() * 12) + 5);
        setComplexity(Math.round((Math.random() * 0.8 + 0.2) * 100) / 100);
        setSmoothness(Math.round((Math.random() * 0.8 + 0.2) * 100) / 100);
        setFrequency(Math.floor(Math.random() * 10) + 1);
        setAmplitude(Math.round((Math.random() * 0.7 + 0.3) * 100) / 100);
        setGrowth(Math.round((Math.random() * 5 + 4) * 10) / 10);
        setRandomSeed(Math.random() * 1000);
        setTimeout(() => setIsShaking(false), 500);
        toast.success("All parameters randomized!");
    };
    
    const getSVGContent = () => {
        // Escape special characters in URLs for proper XML format
        const escapedUrl = backgroundUrl
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
            
        return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    ${useImageBackground && backgroundUrl ? `
    <defs>
      <clipPath id="blob-shape">
        <path d="${svgPath}" />
      </clipPath>
    </defs>
    <image href="${escapedUrl}" width="480" height="480" clip-path="url(#blob-shape)" preserveAspectRatio="xMidYMid slice" />
    ` : `<path fill="${fillColor}" d="${svgPath}" />`}
  </svg>`;
    };
    
    const handleExport = async (key: string) => {
        const svgContent = getSVGContent();
        
        switch (key) {
            case "svg":
                try {
                    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "blob.svg";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    toast.success("SVG exported successfully!");
                } catch (error) {
                    console.error("SVG export error:", error);
                    toast.error("Failed to export SVG");
                }
                break;
            
            case "png":
                try {
                    const canvas = document.createElement("canvas");
                    canvas.width = 480;
                    canvas.height = 480;
                    const ctx = canvas.getContext("2d");
                    
                    if (!ctx) {
                        toast.error("Failed to create canvas context");
                        return;
                    }
                    
                    const img = new Image();
                    
                    img.onload = () => {
                        ctx.fillStyle = "white";
                        ctx.fillRect(0, 0, 480, 480);
                        ctx.drawImage(img, 0, 0, 480, 480);
                        
                        canvas.toBlob((blob) => {
                            if (blob) {
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = "blob.png";
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                                toast.success("PNG exported successfully!");
                            } else {
                                toast.error("Failed to create PNG blob");
                            }
                        }, "image/png");
                    };
                    
                    img.onerror = () => {
                        toast.error("Failed to load SVG for PNG export");
                    };
                    
                    // Use encodeURIComponent for better compatibility
                    const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
                    const svgUrl = URL.createObjectURL(svgBlob);
                    img.src = svgUrl;
                    
                    // Clean up the temporary URL after a delay
                    setTimeout(() => URL.revokeObjectURL(svgUrl), 100);
                } catch (error) {
                    console.error("PNG export error:", error);
                    toast.error("Failed to export PNG");
                }
                break;
            
            case "code":
                try {
                    await navigator.clipboard.writeText(svgContent);
                    toast.success("SVG code copied to clipboard!");
                } catch (error) {
                    console.error("Clipboard error:", error);
                    // Fallback method
                    const textArea = document.createElement("textarea");
                    textArea.value = svgContent;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-999999px";
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        toast.success("SVG code copied to clipboard!");
                    } catch (err) {
                        toast.error("Failed to copy to clipboard");
                    }
                    document.body.removeChild(textArea);
                }
                break;
        }
    };
  
    return (
        <ToolLayout
            title="SVG Blob Generator"
            description="Generate organic, customizable SVG blob shapes instantly. Perfect for modern web, presentations, and graphics—fully scalable, lightweight, and tailored to your style."
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
                                    {useImageBackground && backgroundUrl ? (
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
                                        startContent={<Shuffle className="w-4 h-4" />}
                                    >
                                        Shuffle Blob
                                    </Button>
                                    
                                    <Button 
                                        color="secondary" 
                                        onPress={handleRandomizeAll}
                                        startContent={<Sparkles className="w-4 h-4" />}
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
                                    {/* Image background controls - MOVED TO TOP */}
                                    <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Switch
                                                isSelected={useImageBackground}
                                                onValueChange={setUseImageBackground}
                                            />
                                            <span className="font-medium">Use Image Background</span>
                                        </div>
                                        
                                        {useImageBackground && (
                                            <div className="space-y-3">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                
                                                {/* Show preview if there's any image */}
                                                {(uploadedImage || backgroundUrl) && (
                                                    <div className="relative rounded-lg overflow-hidden border-2 border-primary/20 mb-3">
                                                        <img 
                                                            src={uploadedImage || backgroundUrl} 
                                                            alt="Background preview" 
                                                            className="w-full h-24 object-cover"
                                                        />
                                                    </div>
                                                )}
                                                
                                                <div className="flex gap-2">
                                                    <Button 
                                                        color="primary" 
                                                        variant="flat"
                                                        onPress={() => fileInputRef.current?.click()}
                                                        startContent={<Upload className="w-4 h-4" />}
                                                        className="flex-1"
                                                        isDisabled={isLoadingImage}
                                                    >
                                                        Upload Image
                                                    </Button>
                                                    <Button 
                                                        color="secondary" 
                                                        variant="flat"
                                                        onPress={handleShuffleImage}
                                                        startContent={<Shuffle className="w-4 h-4" />}
                                                        className="flex-1"
                                                        isLoading={isLoadingImage}
                                                    >
                                                        Random Image
                                                    </Button>
                                                </div>
                                                
                                                {(uploadedImage || backgroundUrl) && (
                                                    <Button 
                                                        color="danger" 
                                                        variant="flat"
                                                        size="sm"
                                                        onPress={handleRemoveImage}
                                                        startContent={<Trash2 className="w-4 h-4" />}
                                                        className="w-full"
                                                    >
                                                        Remove Image
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Color picker - only show when not using image */}
                                    {!useImageBackground && (
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
                                    )}
                                    
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
                
                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slide-out {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                .animate-slide-in {
                    animation: slide-in 0.3s ease;
                }
                
                .animate-slide-out {
                    animation: slide-out 0.3s ease;
                }
            `}</style>

            <InfoSectionSVGBlob />
        </ToolLayout>
    )
}