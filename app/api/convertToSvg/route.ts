// /api/convertToSvg/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import * as Potrace from 'potrace';
import { SVGBuilder } from 'svg-builder';

// Type definitions
interface ColorPoint {
  r: number;
  g: number;
  b: number;
}

interface QuantizationResult {
  quantizedColors: ColorPoint[];
  colorMap: Map<number, number>;
}

// Custom trace function with Promise
const trace = (buffer: Buffer, options: Potrace.PotraceOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    Potrace.trace(buffer, options, (err, svg) => {
      if (err) reject(err);
      else if (!svg) reject(new Error('No SVG generated'));
      else resolve(svg);
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
  // Log file details for debugging
  console.log('File received:', {
    name: file.name,
    type: file.type,
    size: file.size
  });

  const colorReduction = formData.get('colorReduction') as string || '16';
  const smoothing = Number(formData.get('smoothing')) || 0;

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Process image with sharp with error handling
  let processedImage;
  try {
    processedImage = await sharp(buffer)
      .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
      .png()
      .toBuffer({ resolveWithObject: true });
  } catch (sharpError) {
    console.error('Sharp processing error:', sharpError);
    return NextResponse.json({ 
      error: 'Error processing image with Sharp',
      details: sharpError instanceof Error ? sharpError.message : 'Unknown error'
    }, { status: 500 });
  }

  const { info, data } = processedImage;
  const { width = 0, height = 0 } = info;

  if (!width || !height) {
    return NextResponse.json({ error: 'Invalid image dimensions' }, { status: 400 });
  }

  // Create SVG builder
  const svgBuilder = new SVGBuilder();
  svgBuilder
    .width(width)
    .height(height)
    .viewBox(`0 0 ${width} ${height}`);

  // Potrace options
  const traceOptions: Potrace.PotraceOptions = {
    threshold: 128,
    turdSize: smoothing,
    optCurve: true,
    alphaMax: 1,
    optTolerance: 0.2,
  };

  try {
    // For color extraction, use color quantization
    const numColors = Math.min(parseInt(colorReduction), 256);
    const { quantizedColors, colorMap } = await quantizeColors(data, numColors);

    // Create color layers
    for (let i = 0; i < quantizedColors.length; i++) {
      const colorBuffer = await createColorLayer(data, width, height, colorMap, i);
      const svgPath = await trace(colorBuffer, traceOptions);
      const color = rgbToHex(quantizedColors[i]);
      
      svgBuilder.element('path', {
        d: svgPath,
        fill: color,
        'fill-opacity': '1',
      });
    }


     // Generate final SVG
     const svgOutput = svgBuilder.render();

     return new NextResponse(svgOutput, {
       headers: {
         'Content-Type': 'image/svg+xml',
       },
     });

   } catch (processingError) {
     console.error('SVG processing error:', processingError);
     return NextResponse.json({ 
       error: 'Error during SVG processing',
       details: processingError instanceof Error ? processingError.message : 'Unknown error'
     }, { status: 500 });
   }

 } catch (error) {
   console.error('Conversion error:', error);
   return NextResponse.json({ 
     error: 'Error converting image to SVG',
     details: error instanceof Error ? error.message : 'Unknown error'
   }, { status: 500 });
 }
}
async function quantizeColors(data: Buffer, numColors: number): Promise<QuantizationResult> {
  const pixels: ColorPoint[] = [];
  for (let i = 0; i < data.length; i += 4) {
    pixels.push({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
    });
  }

  const quantizedColors = await kMeans(pixels, numColors);
  const colorMap = new Map<number, number>();

  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    const closestColor = findClosestColor(pixel, quantizedColors);
    colorMap.set(i, closestColor);
  }

  return { quantizedColors, colorMap };
}

function createColorLayer(
  data: Buffer,
  width: number,
  height: number,
  colorMap: Map<number, number>,
  colorIndex: number
): Buffer {
  const layer = Buffer.alloc(width * height);

  for (let i = 0; i < data.length / 4; i++) {
    const mappedColorIndex = colorMap.get(i);
    if (typeof mappedColorIndex === 'number') {
      layer[i] = mappedColorIndex === colorIndex ? 255 : 0;
    }
  }

  return layer;
}

async function kMeans(pixels: ColorPoint[], k: number): Promise<ColorPoint[]> {
  let centroids = pixels.slice(0, k).map(pixel => ({ ...pixel }));

  for (let iteration = 0; iteration < 10; iteration++) {
    const clusters: ColorPoint[][] = Array.from({ length: k }, () => []);

    // Assign pixels to closest centroid
    pixels.forEach(pixel => {
      const closestCentroidIndex = findClosestCentroidIndex(pixel, centroids);
      clusters[closestCentroidIndex].push(pixel);
    });

    // Update centroids
    centroids = clusters.map(cluster => {
      if (cluster.length === 0) return centroids[0];
      return {
        r: Math.round(cluster.reduce((sum, p) => sum + p.r, 0) / cluster.length),
        g: Math.round(cluster.reduce((sum, p) => sum + p.g, 0) / cluster.length),
        b: Math.round(cluster.reduce((sum, p) => sum + p.b, 0) / cluster.length),
      };
    });
  }

  return centroids;
}

function findClosestColor(pixel: ColorPoint, colors: ColorPoint[]): number {
  return colors.reduce((closest, color, index) => {
    const distance = colorDistance(pixel, color);
    if (distance < closest.distance) {
      return { distance, index };
    }
    return closest;
  }, { distance: Infinity, index: 0 }).index;
}

function findClosestCentroidIndex(pixel: ColorPoint, centroids: ColorPoint[]): number {
  return centroids.reduce((closest, centroid, index) => {
    const distance = colorDistance(pixel, centroid);
    if (distance < closest.distance) {
      return { distance, index };
    }
    return closest;
  }, { distance: Infinity, index: 0 }).index;
}

function colorDistance(a: ColorPoint, b: ColorPoint): number {
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) +
    Math.pow(a.g - b.g, 2) +
    Math.pow(a.b - b.b, 2)
  );
}

function rgbToHex(color: ColorPoint): string {
    const { r, g, b } = color;
    return '#' + [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  }
  