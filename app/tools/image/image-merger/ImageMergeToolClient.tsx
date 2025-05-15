"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"
import {
  Card,
  CardBody,
  Button,
  Slider,
  Checkbox,
  Input,
  RadioGroup,
  Radio,
  ButtonGroup,
  Spinner,
  Image as NextUiImage, 
} from "@nextui-org/react"
import {
  Upload,
  Download,
  RefreshCw,
  Settings2,
  Move,
  Image as ImageIconLucide,
  Palette,
  LayoutGrid,
  X,
  PlusCircle,
  Zap as ZapIcon,
  ChevronsLeftRightIcon,
  GripVertical,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout" // Assuming you have this component
import NextImage from "next/image" 
import InfoSection from "./info-section"

interface ImageData {
  src: string;
  file: File;
  width: number;
  height: number;
  id: string;
}

type OrientationType = "horizontal" | "vertical";
type SizeAdjustmentType = "crop" | "doNotAdjust" | "magnify" | "reduce";
type DownloadFormatType = "png" | "jpeg" | "webp";

const MAX_IMAGES = 5;

export default function ImageMergeTool() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [mergedImage, setMergedImage] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<OrientationType>("horizontal");
  const [borderThickness, setBorderThickness] = useState<number>(0);
  const [borderColor, setBorderColor] = useState<string>("#000000");
  const [constrainProportions, setConstrainProportions] = useState<boolean>(true);
  const [sizeAdjustment, setSizeAdjustment] = useState<SizeAdjustmentType>("reduce");
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormatType>("png");

  const foregroundFileInputRef = useRef<HTMLInputElement>(null);
  const dragImageId = useRef<string | null>(null); 
  const dragOverImageId = useRef<string | null>(null); 

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const newImagesPromises: Promise<ImageData>[] = [];
      for (let i = 0; i < files.length; i++) {
        if (images.length + newImagesPromises.length >= MAX_IMAGES) {
          toast.error(`Maximum ${MAX_IMAGES} images allowed. Some files were not added.`);
          break;
        }
        const file = files[i];
        if (!file.type.match("image.*")) {
          toast.error(`File "${file.name}" is not an image and was skipped.`);
          continue;
        }
        newImagesPromises.push(
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
              const img = new Image();
              img.onload = () => {
                resolve({
                  src: event.target?.result as string,
                  file: file,
                  width: img.width,
                  height: img.height,
                  id: crypto.randomUUID(),
                });
              };
              img.onerror = (err) => reject(new Error(`Could not load image: ${file.name}. Error: ${err.toString()}`));
              img.src = event.target?.result as string;
            };
            reader.onerror = (err) => reject(new Error(`Could not read file: ${file.name}. Error: ${err.toString()}`));
            reader.readAsDataURL(file);
          })
        );
      }
      Promise.all(newImagesPromises)
        .then(resolvedImages => {
            setImages((prevImages) => [...prevImages, ...resolvedImages]);
            if (resolvedImages.length > 0) {
                toast.success(`${resolvedImages.length} image(s) added.`);
            }
        })
        .catch(error => {
            toast.error(`Error processing images: ${error.message}`);
        });
      if (e.target) e.target.value = "";
    },
    [images.length]
  );

  const handleRemoveImage = useCallback((idToRemove: string) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== idToRemove));
    toast.success("Image removed.");
  }, []);
  
  const handleSwapImages = useCallback(() => {
    if (images.length < 2) {
      toast.error("Need at least two images to reverse order.");
      return;
    }
    setImages((prevImages) => [...prevImages].reverse());
    toast.success("Image order reversed.");
  }, [images.length]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    dragImageId.current = id;
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragging'); 
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault(); 
    dragOverImageId.current = id;
    e.currentTarget.classList.add('drag-over');
  };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add('drag-over');
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
     e.currentTarget.classList.remove('drag-over');
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    if (dragImageId.current === null || dragOverImageId.current === null || dragImageId.current === dragOverImageId.current) return;
    const draggedImageIndex = images.findIndex(img => img.id === dragImageId.current);
    const targetImageIndex = images.findIndex(img => img.id === dragOverImageId.current);
    if (draggedImageIndex === -1 || targetImageIndex === -1) return;
    const newImages = [...images];
    const [draggedItem] = newImages.splice(draggedImageIndex, 1);
    newImages.splice(targetImageIndex, 0, draggedItem);
    setImages(newImages);
    dragImageId.current = null;
    dragOverImageId.current = null;
    toast.success("Image order changed.");
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
  };

  const mergeImages = useCallback(async () => {
    if (images.length === 0) {
      setMergedImage(null);
      return;
    }
    setIsMerging(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      toast.error("Could not create canvas context.");
      setIsMerging(false);
      return;
    }
    try {
      const imageElements: HTMLImageElement[] = await Promise.all(
        images.map(imgData => 
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.onerror = (errEvent) => reject(new Error(`Failed to load image: ${imgData.file.name}. Error: ${errEvent.toString()}`));
            img.src = imgData.src;
          })
        )
      );
      let adjustedImageDims = imageElements.map((img, index) => ({
        img,
        originalWidth: images[index].width,
        originalHeight: images[index].height,
        width: images[index].width,
        height: images[index].height,
      }));
      if (constrainProportions && images.length > 0 && sizeAdjustment !== "doNotAdjust") {
        let targetDimValue: number | undefined;
        if (orientation === "horizontal") {
            if (sizeAdjustment === "reduce" || sizeAdjustment === "crop") targetDimValue = Math.min(...adjustedImageDims.map(d => d.originalHeight));
            if (sizeAdjustment === "magnify") targetDimValue = Math.max(...adjustedImageDims.map(d => d.originalHeight));
        } else { 
            if (sizeAdjustment === "reduce" || sizeAdjustment === "crop") targetDimValue = Math.min(...adjustedImageDims.map(d => d.originalWidth));
            if (sizeAdjustment === "magnify") targetDimValue = Math.max(...adjustedImageDims.map(d => d.originalWidth));
        }
        if (targetDimValue !== undefined) {
            adjustedImageDims = adjustedImageDims.map(d => {
                const aspectRatio = d.originalWidth / d.originalHeight;
                if (orientation === "horizontal") {
                    return { ...d, height: targetDimValue as number, width: (targetDimValue as number) * aspectRatio };
                } else { 
                    return { ...d, width: targetDimValue as number, height: (targetDimValue as number) / aspectRatio };
                }
            });
        }
      }
      let canvasWidth: number, canvasHeight: number;
      const numFgImages = adjustedImageDims.length;
      const totalBorderThickness = numFgImages > 1 ? (numFgImages - 1) * borderThickness : 0;
      if (orientation === "horizontal") {
        canvasWidth = adjustedImageDims.reduce((sum, d) => sum + d.width, 0) + totalBorderThickness;
        canvasHeight = Math.max(0, ...adjustedImageDims.map(d => d.height));
      } else { 
        canvasWidth = Math.max(0, ...adjustedImageDims.map(d => d.width));
        canvasHeight = adjustedImageDims.reduce((sum, d) => sum + d.height, 0) + totalBorderThickness;
      }
      canvas.width = Math.max(1, Math.round(canvasWidth));
      canvas.height = Math.max(1, Math.round(canvasHeight));

      ctx.fillStyle = "rgba(0,0,0,0)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let currentX = 0;
      let currentY = 0;
      adjustedImageDims.forEach((dim, index) => {
        const drawWidth = Math.round(dim.width); 
        const drawHeight = Math.round(dim.height);
        if (orientation === "horizontal") {
          const yOffset = (canvas.height - drawHeight) / 2;
          ctx.drawImage(dim.img, Math.round(currentX), Math.round(yOffset > 0 ? yOffset : 0), drawWidth, drawHeight);
          currentX += drawWidth;
          if (borderThickness > 0 && index < numFgImages - 1) {
            ctx.fillStyle = borderColor;
            ctx.fillRect(Math.round(currentX), 0, borderThickness, canvas.height);
            currentX += borderThickness;
          }
        } else { 
          const xOffset = (canvas.width - drawWidth) / 2;
          ctx.drawImage(dim.img, Math.round(xOffset > 0 ? xOffset : 0), Math.round(currentY), drawWidth, drawHeight);
          currentY += drawHeight;
          if (borderThickness > 0 && index < numFgImages - 1) {
            ctx.fillStyle = borderColor;
            ctx.fillRect(0, Math.round(currentY), canvas.width, borderThickness);
            currentY += borderThickness;
          }
        }
      });
      setMergedImage(canvas.toDataURL('image/png')); 
      if (images.length > 0) toast.success("Merge successful!");
    } catch (error) {
        console.error("Error merging images:", error);
        toast.error(`Error during merge: ${(error as Error).message || "Unknown error"}`);
        setMergedImage(null);
    } finally {
        setIsMerging(false);
    }
  }, [
    images, orientation, borderThickness, borderColor, 
    constrainProportions, sizeAdjustment
  ]);

  const handleClear = useCallback(() => {
    setImages([]);
    setMergedImage(null);
    setBorderThickness(0);
    setBorderColor("#000000");
    setOrientation("horizontal");
    setConstrainProportions(true);
    setSizeAdjustment("reduce");
    setDownloadFormat("png");
    if (foregroundFileInputRef.current) foregroundFileInputRef.current.value = "";
    toast.success("All settings cleared.");
  }, []);

  const handleDownload = useCallback(() => {
    if (!mergedImage) {
      toast.error("No merged image to download.");
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (downloadFormat === 'jpeg') {
            ctx!.fillStyle = '#FFFFFF'; 
            ctx!.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx!.drawImage(img, 0, 0);
        const mimeType = `image/${downloadFormat}`;
        const quality: number | undefined = downloadFormat === 'png' ? undefined : 0.92;
        const dataUrl = canvas.toDataURL(mimeType, quality);
        const link = document.createElement('a');
        link.download = `fused-image.${downloadFormat}`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Image downloaded as ${downloadFormat.toUpperCase()}.`);
    };
    img.onerror = () => {
        toast.error("Failed to process image for download.");
    }
    img.src = mergedImage; 
  }, [mergedImage, downloadFormat]);

  useEffect(() => {
    if (images.length > 0) {
      const debounceMerge = setTimeout(() => mergeImages(), 300); 
      return () => clearTimeout(debounceMerge);
    } else {
      setMergedImage(null); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    images, orientation, borderThickness, borderColor, 
    constrainProportions, sizeAdjustment 
  ]);

  return (
    <ToolLayout
      title="Image Merger"
        description={`Merge up to ${MAX_IMAGES} images into a single, high-quality composition. Easily align, layer, and download your fused images in seconds.`}
        toolId="678f383226f06f912191bcdc"
    >
      <style jsx global>{`
        .dragging { opacity: 0.5; border: 2px dashed #0070f3 !important; transform: scale(0.95); }
        .drag-over { border: 2px solid #0070f3 !important; background-color: rgba(0, 112, 243, 0.1) !important; }
        .drag-handle { cursor: grab; }
        .drag-handle:active { cursor: grabbing; }
      `}</style>
      <div className="flex flex-col gap-5"> 
        <input 
          type="file" accept="image/*" multiple className="hidden" 
          ref={foregroundFileInputRef} onChange={handleImageUpload} 
        />

        <Card className="bg-default-50/70 dark:bg-default-100/60">
          <CardBody className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
                <h3 className="text-md sm:text-lg font-bold text-primary-500 dark:text-primary-400 flex items-center mb-2 sm:mb-0">
                <ImageIconLucide className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Image Matrix ({images.length}/{MAX_IMAGES})
                </h3>
                <Button
                    size="sm" variant="ghost" color="primary"
                    onPress={() => foregroundFileInputRef.current?.click()}
                    startContent={<PlusCircle size={16}/>}
                    isDisabled={images.length >= MAX_IMAGES}
                    className="font-semibold"
                > Add Layers </Button>
            </div>
            {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2.5"> 
                {images.map((img, index) => (
                  <div 
                    key={img.id} draggable 
                    onDragStart={(e) => handleDragStart(e, img.id)}
                    onDragOver={(e) => handleDragOver(e, img.id)}
                    onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
                    onDrop={handleDrop} onDragEnd={handleDragEnd}
                    className="relative aspect-square group rounded-lg overflow-hidden shadow-lg border border-transparent hover:border-primary-500/50 dark:hover:border-primary-400/50 transition-all duration-200 ease-in-out"
                    title="Drag to reorder"
                  >
                    <NextUiImage 
                        src={img.src} alt={`Image Layer ${index + 1}`} radius="md"
                        className="w-full h-full object-cover" removeWrapper
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-1">
                        <Button 
                            isIconOnly color="danger" size="sm" variant="light" 
                            onPress={() => handleRemoveImage(img.id)}
                            aria-label="Remove image layer"
                            className="absolute top-1 right-1 opacity-80 hover:opacity-100 z-10"
                        ><X size={16} /></Button>
                        <div 
                            className="drag-handle absolute top-1 left-1 p-0.5 bg-black/30 rounded-sm text-white/70 hover:text-white z-10"
                            aria-label="Drag to reorder"
                        ><GripVertical size={14} /></div>
                    </div>
                     <div className="absolute bottom-0.5 left-0.5 bg-black/60 text-white text-[9px] px-1 py-0.5 rounded-sm">
                        {index + 1} | {img.width}x{img.height}
                    </div>
                  </div>
                ))}
                {images.length < MAX_IMAGES && (
                  <Card 
                    isPressable onPress={() => foregroundFileInputRef.current?.click()}
                    className="aspect-square flex items-center justify-center border-2 border-dashed border-primary-500/30 dark:border-primary-400/30 hover:border-primary-500/70 dark:hover:border-primary-400/70 cursor-pointer transition-all duration-200 bg-transparent hover:bg-primary-500/5"
                    shadow="none"
                  ><CardBody className="flex flex-col items-center justify-center text-primary-500/70 dark:text-primary-400/70 p-2">
                      <PlusCircle size={24} />
                      <p className="mt-1 text-[10px] text-center font-medium">Add Layer</p>
                    </CardBody></Card>
                )}</div>
            ) : ( <div 
                    className="flex flex-col items-center justify-center w-full min-h-[120px] sm:min-h-[150px] border-2 border-dashed border-primary-500/30 dark:border-primary-400/30 rounded-xl p-4 sm:p-6 cursor-pointer hover:border-primary-500/70 dark:hover:border-primary-400/70 transition-colors bg-transparent hover:bg-primary-500/5"
                    onClick={() => foregroundFileInputRef.current?.click()}
                ><Upload size={32} className="text-primary-500/70 dark:text-primary-400/70 mb-2"/>
                    <p className="text-default-500 text-center text-xs sm:text-sm">
                        Click or Drag & Drop image layers <br/>
                        <span className="text-[10px] sm:text-xs">(Up to {MAX_IMAGES} layers, reorder by dragging)</span>
                    </p></div>
            )}</CardBody></Card>

        <Card className="bg-default-50/70 dark:bg-default-100/60">
          <CardBody className="p-4 sm:p-5">
            <h3 className="text-md sm:text-lg font-bold text-primary-500 dark:text-primary-400 mb-4 flex items-center">
              <Settings2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Fusion Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4"> 
              <div className="flex flex-col gap-4">
                <div className="bg-black/5 dark:bg-white/5 p-2.5 rounded-lg"> 
                  <h4 className="font-semibold text-default-700 mb-1.5 flex items-center">
                    <LayoutGrid className="w-3.5 h-3.5 mr-1.5 opacity-80" /> Composition Axis
                  </h4>
                  <ButtonGroup fullWidth size="sm" variant="flat">
                    <Button className={orientation === "vertical" ? "bg-primary text-primary-foreground" : ""} onPress={() => setOrientation("vertical")}>Vertical Stack</Button>
                    <Button className={orientation === "horizontal" ? "bg-primary text-primary-foreground" : ""} onPress={() => setOrientation("horizontal")}>Horizontal Array</Button>
                  </ButtonGroup>
                </div>
                <div className="bg-black/5 dark:bg-white/5 p-2.5 rounded-lg">
                  <h4 className="font-semibold text-default-700 mb-1.5 flex items-center">
                    <Move className="w-3.5 h-3.5 mr-1.5 opacity-80" /> Layer Scaling Protocol
                  </h4>
                  <RadioGroup value={sizeAdjustment} onValueChange={(v) => setSizeAdjustment(v as SizeAdjustmentType)} color="primary" orientation="vertical" size="sm">
                    <Radio value="reduce" classNames={{label:"text-xs"}}>Reduce to Smallest</Radio>
                    <Radio value="magnify" classNames={{label:"text-xs"}}>Magnify to Largest</Radio>
                    <Radio value="crop" classNames={{label:"text-xs"}}>Match & Fit</Radio>
                    <Radio value="doNotAdjust" classNames={{label:"text-xs"}}>Preserve Original Scale</Radio>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="bg-black/5 dark:bg-white/5 p-2.5 rounded-lg">
                  <h4 className="font-semibold text-default-700 mb-1.5 flex items-center">
                    <Palette className="w-3.5 h-3.5 mr-1.5 opacity-80" /> Inter-Layer Separator
                  </h4>
                  <Input 
                    type="number" 
                    labelPlacement="outside-left" 
                    placeholder="0" 
                    label="Thickness (px):"
                    value={String(borderThickness)} 
                    onValueChange={(val) => setBorderThickness(Math.max(0, Math.min(50, Number(val))))} 
                    min={0} max={50} step={1} 
                    size="sm"
                    className="mb-1.5"
                    classNames={{ label: "text-[11px] sm:text-xs whitespace-nowrap mr-1", inputWrapper: "h-8" }}
                  />
                  <Slider value={borderThickness} onChange={(v) => setBorderThickness(Array.isArray(v) ? v[0] : v)} minValue={0} maxValue={50} step={1} color="primary" size="sm" className="mb-2" />
                  <div className="flex items-center gap-1.5">
                    <label htmlFor="borderColorInput" className="text-[11px] sm:text-xs text-default-700">Color:</label>
                    <input id="borderColorInput" type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="w-7 h-7 rounded-md border border-default-300 dark:border-default-600 cursor-pointer p-0.5 bg-transparent" title="Select separator color" />
                    <Input type="text" aria-label="Border color hex" placeholder="#000000" value={borderColor} onValueChange={setBorderColor} size="sm" className="flex-grow" classNames={{inputWrapper: "h-8"}} />
                  </div>
                </div>
                <div className="bg-black/5 dark:bg-white/5 p-2.5 rounded-lg mt-auto">
                  <Checkbox isSelected={constrainProportions} onValueChange={setConstrainProportions} size="sm" color="primary">
                    <span className="text-[11px] sm:text-xs text-default-700">Maintain Aspect Ratio (Recommended)</span>
                  </Checkbox>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card className="shadow-2xl bg-default-50/70 dark:bg-default-100/60 ">
          <CardBody className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-md font-bold text-primary-500 dark:text-primary-400 mb-2.5 text-center">System Control Interface</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button 
                color="primary" 
                onPress={mergeImages} 
                startContent={isMerging ? <Spinner color="white" size="sm"/> : <ZapIcon size={16} />}
                size="sm" 
                variant="shadow"
                isDisabled={isMerging || images.length === 0 }
                className="font-semibold"
              >
                {isMerging ? "Fusing..." : "Initiate Fusion"}
              </Button>
              <Button 
                color="success" 
                onPress={handleDownload} 
                startContent={<Download size={16} />} 
                disabled={!mergedImage || isMerging}
                size="sm"
                variant="shadow"
                 className="font-semibold"
              >
                Extract Result
              </Button>
               <Button 
                color="warning" 
                onPress={handleSwapImages} 
                startContent={<ChevronsLeftRightIcon size={16} />} 
                disabled={isMerging || images.length < 2}
                size="sm"
                variant="flat"
                className="font-semibold"
              >
                Reverse Sequence
              </Button>
              <Button 
                color="danger" 
                onPress={handleClear} 
                startContent={<RefreshCw size={16} />}
                size="sm"
                variant="flat"
                isDisabled={isMerging}
                className="font-semibold"
              >
                Reset
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100 shadow-lg">
          <CardBody className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center mb-2 sm:mb-0">
                <ImageIconLucide className="w-6 h-6 mr-3" /> 
                Merged Result
                </h3>
                {mergedImage && !isMerging && (
                    <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
                        <label className="text-xs text-default-500 mb-1 self-start sm:self-end">Download Format:</label>
                        <ButtonGroup size="sm" variant="flat" className="w-full sm:w-auto">
                            <Button 
                                onPress={() => setDownloadFormat("png")} 
                                className={`flex-1 sm:flex-initial ${downloadFormat === "png" ? "bg-primary text-primary-foreground" : ""}`}
                            >PNG</Button>
                            <Button 
                                onPress={() => setDownloadFormat("jpeg")}
                                className={`flex-1 sm:flex-initial ${downloadFormat === "jpeg" ? "bg-primary text-primary-foreground" : ""}`}
                            >JPEG</Button>
                            <Button 
                                onPress={() => setDownloadFormat("webp")}
                                className={`flex-1 sm:flex-initial ${downloadFormat === "webp" ? "bg-primary text-primary-foreground" : ""}`}
                            >WEBP</Button>
                        </ButtonGroup>
                    </div>
                )}
            </div>
            <div 
              className="flex items-center justify-center w-full bg-gradient-to-br from-default-100 to-default-200 dark:from-default-50 dark:to-default-100 rounded-xl mb-4 p-4 relative border border-default-200 dark:border-default-700"
              style={{ minHeight: "350px" }} 
            >
              {isMerging && <Spinner label="Processing fusion matrix..." size="lg" color="primary"/>}
              {!isMerging && mergedImage && (
                <NextImage
                  src={mergedImage} alt="Merged output image" width={800} height={600} 
                  className="max-w-full max-h-[50vh] object-contain rounded-md shadow-medium" 
                  style={{ width: "auto", height: "auto" }} unoptimized priority
                />
              )}
              {!isMerging && !mergedImage && (
                <div className="text-center text-default-500 flex flex-col items-center">
                  <ImageIconLucide className="w-16 h-16 opacity-30 mb-3" /> 
                  <p className="font-medium text-lg">Your merged image will appear here</p>
                  <p className="text-sm text-default-400">Add image layers and configure options to begin.</p>
                </div>
              )}
            </div>
            {!isMerging && mergedImage && (
              <div className="text-center mt-4">
                <Button
                  color="success" onPress={handleDownload} startContent={<Download size={20} />}
                  size="lg" variant="solid" className="shadow-lg font-bold"
                >Download Merged Image</Button>
              </div>
            )}
          </CardBody></Card>
          <InfoSection />
      </div></ToolLayout>
  );
}