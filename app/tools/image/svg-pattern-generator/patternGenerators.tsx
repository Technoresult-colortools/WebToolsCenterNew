export type PatternType =
  | 'circles'
  | 'squares'
  | 'triangles'
  | 'hexagons'
  | 'zigzag'
  | 'polkaDots'
  | 'stripes'
  | 'chevron'
  | 'brikwall1'
  | 'modernCircles'
  | 'concentricCircles'
  | 'nestedSquares'
  | 'triangleGrid'
  | 'waves'
  | 'dots3D'
  | 'crosshatch'
  | 'spiral'
  | 'flowerOfLife'
  | 'customImage'
  | 'mandala'
  | 'geometricMosaic'
  | 'celticKnot'
  | 'fractalTree'
  | 'opArt'
  | 'voronoiDiagram';

interface PatternProps {
  size: number;
  spacing: number;
  patternColor: string;
  secondaryColor: string;
  strokeWidth: number;
  complexity: number;
  customImage: string | null;
  skew: number; // Added skew property to fix TypeScript error
}

export const generatePattern = (type: PatternType, props: PatternProps): string => {
    const { size, spacing, patternColor, secondaryColor, strokeWidth, complexity, customImage, skew } = props;
    const svgSize = size + spacing;
    const complexityFactor = complexity / 100;

  switch (type) {
    case 'circles':
      return `<circle cx="${svgSize / 2}" cy="${svgSize / 2}" r="${size / 2}" fill="${patternColor}" />`;
    
    case 'squares':
      return `<rect x="${(svgSize - size) / 2}" y="${(svgSize - size) / 2}" width="${size}" height="${size}" fill="${patternColor}" />`;
    
    case 'triangles':
      return `<polygon points="${(svgSize - size) / 2},${svgSize - (svgSize - size) / 2} ${svgSize / 2},${(svgSize - size) / 2} ${svgSize - (svgSize - size) / 2},${svgSize - (svgSize - size) / 2}" fill="${patternColor}" />`;
    
    case 'hexagons': {
      const centerX = svgSize / 2;
      const centerY = svgSize / 2;
      const radius = size / 2;
      
      const points = Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return `${x},${y}`;
      }).join(' ');
      
      return `<polygon points="${points}" fill="${patternColor}" />`;
    }
    
    case 'zigzag': {
      const amplitude = size / 2;
      const points = Array.from({ length: 5 }).map((_, i) => {
        const x = i * (size / 2);
        const y = i % 2 === 0 ? 0 : amplitude;
        return `${x},${y}`;
      }).join(' ');
      
      return `<polyline points="${points}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />`;
    }
    
    case 'polkaDots':
      return `
        <circle cx="${svgSize / 4}" cy="${svgSize / 4}" r="${size / 6}" fill="${patternColor}" />
        <circle cx="${svgSize * 3 / 4}" cy="${svgSize / 4}" r="${size / 6}" fill="${secondaryColor}" />
        <circle cx="${svgSize / 4}" cy="${svgSize * 3 / 4}" r="${size / 6}" fill="${secondaryColor}" />
        <circle cx="${svgSize * 3 / 4}" cy="${svgSize * 3 / 4}" r="${size / 6}" fill="${patternColor}" />
      `;
    
    case 'stripes':
      return `
        <rect x="0" y="${(svgSize / 4) - (strokeWidth / 2)}" width="${svgSize}" height="${strokeWidth}" fill="${patternColor}" />
        <rect x="0" y="${(svgSize * 3 / 4) - (strokeWidth / 2)}" width="${svgSize}" height="${strokeWidth}" fill="${patternColor}" />
      `;
    
    case 'chevron': {
      const midX = svgSize / 2;
      const height = size / 2;
      return `
        <polyline points="0,${height} ${midX},0 ${svgSize},${height}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />
        <polyline points="0,${height * 2} ${midX},${height} ${svgSize},${height * 2}" fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}" />
      `;
    }
    
    case 'brikwall1':
      return `
        <rect x="0" y="0" width="${svgSize / 2 - strokeWidth / 2}" height="${svgSize / 2 - strokeWidth / 2}" fill="${patternColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" />
        <rect x="${svgSize / 2 + strokeWidth / 2}" y="0" width="${svgSize / 2 - strokeWidth}" height="${svgSize / 2 - strokeWidth / 2}" fill="${patternColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" />
        <rect x="${svgSize / 4 + strokeWidth / 4}" y="${svgSize / 2 + strokeWidth / 2}" width="${svgSize / 2 - strokeWidth / 2}" height="${svgSize / 2 - strokeWidth}" fill="${patternColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" />
      `;
    
    case 'modernCircles':
      return `
        <circle cx="${svgSize/2}" cy="${svgSize/2}" r="${size/2}" fill="${patternColor}" />
        <circle cx="${svgSize/2}" cy="${svgSize/2}" r="${size/3}" fill="${secondaryColor}" />
        <circle cx="${svgSize/2}" cy="${svgSize/2}" r="${size/5}" fill="${patternColor}" />
      `;
    
    case 'concentricCircles': {
      const numberOfCircles = Math.max(2, Math.floor(4 * complexityFactor));
      return Array.from({ length: numberOfCircles })
        .map((_, i) => {
          const radius = (size/2) * (1 - i/numberOfCircles);
          return `<circle cx="${svgSize/2}" cy="${svgSize/2}" r="${radius}" 
            fill="none" stroke="${i % 2 ? patternColor : secondaryColor}" 
            stroke-width="${strokeWidth}" />`;
        })
        .join('');
    }
    
    case 'nestedSquares': {
      const numberOfSquares = Math.max(2, Math.floor(4 * complexityFactor));
      return Array.from({ length: numberOfSquares })
        .map((_, i) => {
          const sizeReduction = (i * size) / numberOfSquares;
          const x = (svgSize - size) / 2 + sizeReduction / 2;
          const y = (svgSize - size) / 2 + sizeReduction / 2;
          const width = size - sizeReduction;
          const height = size - sizeReduction;
          return `<rect x="${x}" y="${y}" width="${width}" height="${height}"
            fill="none" stroke="${i % 2 ? patternColor : secondaryColor}"
            stroke-width="${strokeWidth}" />`;
        })
        .join('');
    }
    
    case 'triangleGrid': {
      const h = size * Math.sqrt(3) / 2;
      return `
        <path d="M${(svgSize-size)/2},${(svgSize-h)/2} L${(svgSize+size)/2},${(svgSize-h)/2} L${svgSize/2},${(svgSize+h)/2} Z" 
          fill="${patternColor}" />
        <path d="M${(svgSize-size)/2},${(svgSize+h)/2} L${(svgSize+size)/2},${(svgSize+h)/2} 
          L${svgSize/2},${(svgSize-h)/2} Z" fill="${secondaryColor}" />
      `;
    }
    
    case 'waves': {
      const amplitude = size / 4;
      const frequency = 2 * Math.PI / size;
      const points = Array.from({ length: Math.floor(svgSize) + 1 })
        .map((_, i) => {
          const x = i;
          const y = svgSize / 2 + amplitude * Math.sin(frequency * i);
          return `${x},${y}`;
        })
        .join(' ');
      return `<polyline points="${points}" 
        stroke="${patternColor}" fill="none" 
        stroke-width="${strokeWidth}" />`;
    }
    
    case 'dots3D':
      return `
        <circle cx="${svgSize/2}" cy="${svgSize/2 - size/6}" r="${size/3}" fill="${patternColor}" />
        <ellipse cx="${svgSize/2}" cy="${svgSize/2 + size/6}" rx="${size/3}" ry="${size/6}" fill="${secondaryColor}" opacity="0.6" />
      `;
    
    case 'crosshatch':
      return `
        <path d="M${(svgSize-size)/2},${(svgSize-size)/2} L${(svgSize+size)/2},${(svgSize+size)/2}" stroke="${patternColor}" stroke-width="${strokeWidth}" />
        <path d="M${(svgSize-size)/2},${(svgSize+size)/2} L${(svgSize+size)/2},${(svgSize-size)/2}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" />
      `;
    
    case 'spiral': {
      const centerX = svgSize / 2;
      const centerY = svgSize / 2;
      const maxRadius = size / 2;
      const turns = 3 * complexityFactor;
      const points = Array.from({ length: 100 })
        .map((_, i) => {
          const angle = 2 * Math.PI * turns * i / 99;
          const radius = maxRadius * i / 99;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          return `${x},${y}`;
        })
        .join(' ');
      return `<polyline points="${points}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />`;
    }
    
    case 'flowerOfLife': {
      const centerX = svgSize / 2;
      const centerY = svgSize / 2;
      const radius = size / 3;
      
      // Center circle
      let pattern = `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />`;
      
      // Surrounding circles
      const petals = Math.max(6, Math.floor(6 + 6 * complexityFactor));
      for (let i = 0; i < petals; i++) {
        const angle = (i * 2 * Math.PI) / petals;
        const cx = centerX + radius * Math.cos(angle);
        const cy = centerY + radius * Math.sin(angle);
        pattern += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${i % 2 ? patternColor : secondaryColor}" stroke-width="${strokeWidth}" />`;
      }
      
      return pattern;
    }
    
    case 'mandala': {
      const centerX = svgSize / 2;
      const centerY = svgSize / 2;
      const maxRadius = size / 2;
      
      let pattern = '';
      
      // Create concentric circles
      const circleCount = Math.max(2, Math.floor(3 * complexityFactor));
      for (let i = 0; i < circleCount; i++) {
        const radius = maxRadius * (1 - i / circleCount);
        pattern += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="${i % 2 ? patternColor : secondaryColor}" stroke-width="${strokeWidth}" />`;
      }
      
      // Add petals or geometric elements
      const petalCount = Math.max(6, Math.floor(12 * complexityFactor));
      for (let i = 0; i < petalCount; i++) {
        const angle = (i * 2 * Math.PI) / petalCount;
        const x1 = centerX + (maxRadius * 0.3) * Math.cos(angle);
        const y1 = centerY + (maxRadius * 0.3) * Math.sin(angle);
        const x2 = centerX + maxRadius * Math.cos(angle);
        const y2 = centerY + maxRadius * Math.sin(angle);
        
        pattern += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${i % 2 ? patternColor : secondaryColor}" stroke-width="${strokeWidth}" />`;
        
        // Add decorative elements at the ends of spokes
        pattern += `<circle cx="${x2}" cy="${y2}" r="${maxRadius * 0.1}" fill="${i % 3 === 0 ? patternColor : secondaryColor}" />`;
      }
      
      return pattern;
    }
    
    case 'geometricMosaic': {
      const tileSize = size / 4;
      let pattern = '';
      
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          const posX = (svgSize - size) / 2 + x * tileSize;
          const posY = (svgSize - size) / 2 + y * tileSize;
          const type = (x + y) % 4;
          
          if (type === 0) {
            pattern += `<rect x="${posX}" y="${posY}" width="${tileSize}" height="${tileSize}" fill="${patternColor}" />`;
          } else if (type === 1) {
            pattern += `<circle cx="${posX + tileSize/2}" cy="${posY + tileSize/2}" r="${tileSize/2}" fill="${secondaryColor}" />`;
          } else if (type === 2) {
            pattern += `<polygon points="${posX},${posY} ${posX+tileSize},${posY} ${posX+tileSize/2},${posY+tileSize}" fill="${patternColor}" />`;
          } else {
            pattern += `<rect x="${posX}" y="${posY}" width="${tileSize}" height="${tileSize}" fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}" />`;
          }
        }
      }
      
      return pattern;
    }
    
    case 'celticKnot': {
      const centerX = svgSize / 2;
      const centerY = svgSize / 2;
      const radius = size / 2;
      
      let pattern = '';
      
      // Create base knot structure
      const knotPoints = Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        return {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        };
      });
      
      // Draw the knot paths
      pattern += `<path d="M${knotPoints[0].x},${knotPoints[0].y} C${knotPoints[1].x},${knotPoints[1].y} ${knotPoints[3].x},${knotPoints[3].y} ${knotPoints[4].x},${knotPoints[4].y}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />`;
      pattern += `<path d="M${knotPoints[2].x},${knotPoints[2].y} C${knotPoints[3].x},${knotPoints[3].y} ${knotPoints[5].x},${knotPoints[5].y} ${knotPoints[6].x},${knotPoints[6].y}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />`;
      pattern += `<path d="M${knotPoints[0].x},${knotPoints[0].y} C${knotPoints[7].x},${knotPoints[7].y} ${knotPoints[5].x},${knotPoints[5].y} ${knotPoints[4].x},${knotPoints[4].y}" fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}" />`;
      pattern += `<path d="M${knotPoints[2].x},${knotPoints[2].y} C${knotPoints[1].x},${knotPoints[1].y} ${knotPoints[7].x},${knotPoints[7].y} ${knotPoints[6].x},${knotPoints[6].y}" fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}" />`;
      
      return pattern;
    }
    
    case 'fractalTree': {
      const centerX = svgSize / 2;
      const startY = svgSize * 3 / 4;
      const branchLength = size / 3;
      const branchLevels = Math.max(1, Math.floor(3 * complexityFactor));
      
      const drawBranch = (x: number, y: number, length: number, angle: number, level: number): string => {
        if (level === 0) return '';
        
        const endX = x + length * Math.sin(angle);
        const endY = y - length * Math.cos(angle);
        
        const color = level % 2 === 0 ? patternColor : secondaryColor;
        let branch = `<line x1="${x}" y1="${y}" x2="${endX}" y2="${endY}" stroke="${color}" stroke-width="${strokeWidth * (level / branchLevels)}" />`;
        
        const newLength = length * 0.7;
        branch += drawBranch(endX, endY, newLength, angle - 0.5, level - 1);
        branch += drawBranch(endX, endY, newLength, angle + 0.5, level - 1);
        
        return branch;
      };
      
      return drawBranch(centerX, startY, branchLength, 0, branchLevels);
    }
    
    case 'opArt': {
      const centerX = svgSize / 2;
      const centerY = svgSize / 2;
      const maxRadius = size / 2;
      const steps = Math.max(5, Math.floor(20 * complexityFactor));
      
      let pattern = '';
      
      for (let i = 0; i < steps; i++) {
        const radius = maxRadius * (i / steps);
        const isEven = i % 2 === 0;
        
        if (isEven) {
          pattern += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />`;
        } else {
          // Create a distorted circle
          const points = Array.from({ length: 60 }).map((_, j) => {
            const angle = (j * 2 * Math.PI) / 60;
            const distortion = 1 + 0.1 * Math.sin(6 * angle);
            const x = centerX + radius * distortion * Math.cos(angle);
            const y = centerY + radius * distortion * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');
          
          pattern += `<polygon points="${points}" fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}" />`;
        }
      }
      
      return pattern;
    }
    
    case 'voronoiDiagram': {
      // Simplified Voronoi-like pattern
      const numPoints = Math.max(3, Math.floor(10 * complexityFactor));
      const points = Array.from({ length: numPoints }).map(() => ({
        x: Math.random() * size + (svgSize - size) / 2,
        y: Math.random() * size + (svgSize - size) / 2
      }));
      
      let pattern = '';
      
      // Draw cells as simple polygons
      points.forEach((point, i) => {
        const color = i % 2 === 0 ? patternColor : secondaryColor;
        pattern += `<circle cx="${point.x}" cy="${point.y}" r="${size / 10}" fill="${color}" />`;
        
        // Draw connections between some points
        if (i < points.length - 1) {
          pattern += `<line x1="${point.x}" y1="${point.y}" x2="${points[i+1].x}" y2="${points[i+1].y}" 
            stroke="${color}" stroke-width="${strokeWidth}" stroke-opacity="0.5" />`;
        }
      });
      
      return pattern;
    }
    
    case 'customImage':
      if (customImage) {
        return `<image href="${customImage}" x="${(svgSize - size) / 2}" y="${(svgSize - size) / 2}" width="${size}" height="${size}" />`;
      }
      return '';
      
    default:
      return `<circle cx="${svgSize/2}" cy="${svgSize/2}" r="${size/2}" fill="${patternColor}" />`;
  }
};