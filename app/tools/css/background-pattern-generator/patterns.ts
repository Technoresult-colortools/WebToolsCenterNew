// Define the pattern interface
interface Pattern {
    value: string;
    label: string;
    supportsLineWidth?: boolean;
    supportsDotSize?: boolean;
    generateCSS: (
      patternColor: string, 
      backgroundColor: string, 
      patternSize: number,
      lineWidth?: number,
      dotSize?: number
    ) => {
      backgroundImage: string;
      backgroundPosition: string;
      backgroundSize: string;
      backgroundColor: string;
    };
  }
  

  export const patterns: Pattern[] = [
    {
      value: "checks",
      label: "Checkered Pattern",
      supportsLineWidth: true,
      generateCSS: (patternColor, backgroundColor, patternSize, lineWidth = 2) => {
        return {
          backgroundImage: `
            linear-gradient(45deg, ${patternColor} 25%, transparent 25%), 
            linear-gradient(135deg, ${patternColor} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${patternColor} 75%),
            linear-gradient(135deg, transparent 75%, ${patternColor} 75%)
          `,
          backgroundPosition: `0 0, ${lineWidth}px 0, ${lineWidth}px -${lineWidth}px, 0 ${lineWidth}px`,
          backgroundSize: `${patternSize}px ${patternSize}px`,
          backgroundColor: backgroundColor
        };
      }
    },
    {
      value: "dots",
      label: "Polka Dots",
      supportsDotSize: true,
      generateCSS: (patternColor, backgroundColor, patternSize, _, dotSize = 5) => {
        return {
          backgroundImage: `radial-gradient(${patternColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundPosition: "0 0",
          backgroundSize: `${patternSize}px ${patternSize}px`,
          backgroundColor: backgroundColor
        };
      }
    },
    {
      value: "stripes",
      label: "Diagonal Stripes",
      supportsLineWidth: true,
      generateCSS: (patternColor, backgroundColor, patternSize = 2) => {
        return {
          backgroundImage: `
            linear-gradient(
              45deg, 
              ${patternColor} 25%, 
              transparent 25%, 
              transparent 50%, 
              ${patternColor} 50%, 
              ${patternColor} 75%, 
              transparent 75%, 
              transparent
            )
          `,
          backgroundPosition: "0 0",
          backgroundSize: `${patternSize}px ${patternSize}px`,
          backgroundColor: backgroundColor
        };
      }
    },
    {
      value: "grid",
      label: "Grid Lines",
      supportsLineWidth: true,
      generateCSS: (patternColor, backgroundColor, patternSize, lineWidth = 2) => {
        return {
          backgroundImage: `
            linear-gradient(${patternColor} ${lineWidth}px, transparent ${lineWidth}px),
            linear-gradient(90deg, ${patternColor} ${lineWidth}px, transparent ${lineWidth}px)
          `,
          backgroundPosition: "0 0, 0 0",
          backgroundSize: `${patternSize}px ${patternSize}px`,
          backgroundColor: backgroundColor
        };
      }
    },
    {
      value: "waves",
      label: "Wavy Pattern",
      supportsLineWidth: true,
      generateCSS: (patternColor, backgroundColor, patternSize, lineWidth = 2) => {
        return {
          backgroundImage: `
            radial-gradient(circle at 100% 50%, transparent ${lineWidth}px, ${patternColor} ${lineWidth}px, ${patternColor} ${lineWidth + 2}px, transparent ${lineWidth + 2}px),
            radial-gradient(circle at 0% 50%, transparent ${lineWidth}px, ${patternColor} ${lineWidth}px, ${patternColor} ${lineWidth + 2}px, transparent ${lineWidth + 2}px)
          `,
          backgroundPosition: "0 0",
          backgroundSize: `${patternSize}px ${patternSize}px`,
          backgroundColor: backgroundColor
        };
      }
    },
    {
      value: "zigzag",
      label: "Zigzag Pattern",
      supportsLineWidth: true,
      generateCSS: (patternColor, backgroundColor, patternSize = 2) => {
        return {
          backgroundImage: `
            linear-gradient(135deg, ${patternColor} 25%, transparent 25%) 0 ${patternSize / 2}px,
            linear-gradient(225deg, ${patternColor} 25%, transparent 25%) 0 ${patternSize / 2}px,
            linear-gradient(315deg, ${patternColor} 25%, transparent 25%),
            linear-gradient(45deg, ${patternColor} 25%, transparent 25%)
          `,
          backgroundPosition: "0 0",
          backgroundSize: `${patternSize}px ${patternSize}px`,
          backgroundColor: backgroundColor
        };
      }
    },
    {
      value: "conicalPatterns",
      label: "Conic Patterns",
      generateCSS: (patternColor, backgroundColor, patternSize) => {
        // Calculate the size for background-size based on patternSize
        const bgSize = `${patternSize * 5}px ${patternSize * 5}px`;
        
        return {
          backgroundImage: `
            conic-gradient(at 10% 50%, #0000 75%, ${patternColor} 0),
            conic-gradient(at 10% 50%, #0000 75%, ${patternColor} 0) calc(1*${patternSize}px) calc(3*${patternSize}px),
            conic-gradient(at 10% 50%, #0000 75%, ${patternColor} 0) calc(2*${patternSize}px) calc(1*${patternSize}px),
            conic-gradient(at 10% 50%, #0000 75%, ${patternColor} 0) calc(3*${patternSize}px) calc(4*${patternSize}px),
            conic-gradient(at 10% 50%, #0000 75%, ${patternColor} 0) calc(4*${patternSize}px) calc(2*${patternSize}px),
            conic-gradient(at 50% 10%, #0000 75%, ${patternColor} 0) 0 calc(4*${patternSize}px),
            conic-gradient(at 50% 10%, #0000 75%, ${patternColor} 0) calc(1*${patternSize}px) calc(2*${patternSize}px),
            conic-gradient(at 50% 10%, #0000 75%, ${patternColor} 0) calc(2*${patternSize}px) 0,
            conic-gradient(at 50% 10%, #0000 75%, ${patternColor} 0) calc(3*${patternSize}px) calc(3*${patternSize}px),
            conic-gradient(at 50% 10%, #0000 75%, ${patternColor} 0) calc(4*${patternSize}px) calc(1*${patternSize}px)
          `,
          backgroundPosition: "0 0",
          backgroundSize: bgSize,
          backgroundColor: backgroundColor
        };
      }
    },
    {
      value: "honeycomb",
      label: "Honeycomb",
      supportsLineWidth: true,
      generateCSS: (patternColor, backgroundColor, patternSize = 2) => {
        return {
          backgroundImage: `
            radial-gradient(circle farthest-side at 0% 50%, ${backgroundColor} 23.5%, ${patternColor} 0),
            radial-gradient(circle farthest-side at 0% 50%, ${backgroundColor} 24%, ${patternColor} 0),
            radial-gradient(circle farthest-side at 100% 50%, ${backgroundColor} 23.5%, ${patternColor} 0),
            radial-gradient(circle farthest-side at 100% 50%, ${backgroundColor} 24%, ${patternColor} 0),
            radial-gradient(circle farthest-side at 50% 0%, ${backgroundColor} 23.5%, ${patternColor} 0),
            radial-gradient(circle farthest-side at 50% 0%, ${backgroundColor} 24%, ${patternColor} 0),
            radial-gradient(circle farthest-side at 50% 100%, ${backgroundColor} 23.5%, ${patternColor} 0),
            radial-gradient(circle farthest-side at 50% 100%, ${backgroundColor} 24%, ${patternColor} 0)
          `,
          backgroundPosition: `0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0`,
          backgroundSize: `${patternSize}px ${patternSize * 1.732}px`,
          backgroundColor: patternColor
        };
      }
    },
    {
      value: "herringbone",
      label: "Herringbone",
      supportsLineWidth: true,
      generateCSS: (patternColor, backgroundColor, patternSize, lineWidth = 2) => {
        return {
          backgroundImage: `
            linear-gradient(45deg, ${patternColor} ${lineWidth}px, transparent 0),
            linear-gradient(135deg, ${patternColor} ${lineWidth}px, transparent 0)
          `,
          backgroundPosition: "0 0, 0 0",
          backgroundSize: `${patternSize}px ${patternSize}px`,
          backgroundColor: backgroundColor
        };
      }
    },
    {
        value: "crosses",
        label: "Crosses Pattern",
        supportsLineWidth: false,
        generateCSS: (patternColor, backgroundColor, patternSize) => {
          return {
            backgroundImage: `
              conic-gradient(at 10% 50%, transparent 75%, ${patternColor} 0),
              conic-gradient(at 10% 50%, transparent 75%, ${patternColor} 0) calc(1*${patternSize/5}px) calc(3*${patternSize/5}px),
              conic-gradient(at 10% 50%, transparent 75%, ${patternColor} 0) calc(2*${patternSize/5}px) calc(1*${patternSize/5}px),
              conic-gradient(at 10% 50%, transparent 75%, ${patternColor} 0) calc(3*${patternSize/5}px) calc(4*${patternSize/5}px),
              conic-gradient(at 10% 50%, transparent 75%, ${patternColor} 0) calc(4*${patternSize/5}px) calc(2*${patternSize/5}px),
              conic-gradient(at 50% 10%, transparent 75%, ${patternColor} 0) 0 calc(4*${patternSize/5}px),
              conic-gradient(at 50% 10%, transparent 75%, ${patternColor} 0) calc(1*${patternSize/5}px) calc(2*${patternSize/5}px),
              conic-gradient(at 50% 10%, transparent 75%, ${patternColor} 0) calc(2*${patternSize/5}px) 0,
              conic-gradient(at 50% 10%, transparent 75%, ${patternColor} 0) calc(3*${patternSize/5}px) calc(3*${patternSize/5}px),
              conic-gradient(at 50% 10%, transparent 75%, ${patternColor} 0) calc(4*${patternSize/5}px) calc(1*${patternSize/5}px)
            `,
            backgroundPosition: "0 0",
            backgroundSize: `${patternSize}px ${patternSize}px`,
            backgroundColor: backgroundColor
          };
        }
      }
  ];