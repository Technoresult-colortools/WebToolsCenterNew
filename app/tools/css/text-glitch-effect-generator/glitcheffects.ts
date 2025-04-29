// glitcheffects.ts
export type GlitchEffect = 'rgb-split' | 'color' | 'noise' | 'transformation' | 'glitch-clip' | 'distortion' | 'pixelate' | 'wave' | 'custom';

export const glitchEffects = {
  'rgb-split': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      animation: glitch-skew ${speed * 2}s infinite linear alternate-reverse;
    }
    .glitch::before,
    .glitch::after {
      content: "${text}";
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      left: 0;
      opacity: 0.8;
    }
    .glitch::before {
      color: ${color1};
      animation: glitch-effect ${speed}s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    }
    .glitch::after {
      color: ${color2};
      animation: glitch-effect ${speed * 1.1}s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
    }
    @keyframes glitch-effect {
      0% {
        transform: translate(0);
      }
      20% {
        transform: translate(-${intensity * 0.5}px, ${intensity * 0.5}px);
      }
      40% {
        transform: translate(-${intensity}px, -${intensity * 0.5}px);
      }
      60% {
        transform: translate(${intensity * 0.5}px, ${intensity}px);
      }
      80% {
        transform: translate(${intensity}px, -${intensity * 0.5}px);
      }
      100% {
        transform: translate(0);
      }
    }
    @keyframes glitch-skew {
      0% {
        transform: skew(0deg);
      }
      20% {
        transform: skew(${intensity * 0.2}deg);
      }
      40% {
        transform: skew(-${intensity * 0.1}deg);
      }
      60% {
        transform: skew(${intensity * 0.3}deg);
      }
      80% {
        transform: skew(-${intensity * 0.2}deg);
      }
      100% {
        transform: skew(0deg);
      }
    }`,
  'color': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      animation: glitch-color ${speed}s infinite linear alternate-reverse;
    }
    @keyframes glitch-color {
      0% { text-shadow: ${intensity * 0.2}px ${intensity * 0.2}px ${color1}, -${intensity * 0.2}px -${intensity * 0.2}px ${color2}; }
      25% { text-shadow: -${intensity * 0.2}px ${intensity * 0.2}px ${color2}, ${intensity * 0.2}px -${intensity * 0.2}px ${color1}; }
      50% { text-shadow: ${intensity * 0.2}px -${intensity * 0.2}px ${color1}, -${intensity * 0.2}px ${intensity * 0.2}px ${color2}; }
      75% { text-shadow: -${intensity * 0.2}px -${intensity * 0.2}px ${color2}, ${intensity * 0.2}px ${intensity * 0.2}px ${color1}; }
      100% { text-shadow: ${intensity * 0.2}px ${intensity * 0.2}px ${color1}, -${intensity * 0.2}px -${intensity * 0.2}px ${color2}; }
    }`,
  'noise': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
    }
    .glitch::before {
      content: "${text}";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABN0lEQVRoQ+2Y0Q6DIAxF6f//tBONMWZsA7pxN+ni8oC9pz1tYQr5Jn/lJjwsImWlvYjA7IjIIgJzAKa3iIAJwNRFpNZ6vgBwBmMuFb0bMzNaa8Xzr4GIyLGUcnwCxxhzqbV+9RBHEZELgKOUcuz7ftRa39cLEJHDGHOWUr4rpRwRsYvIEhFr7dlaey6lvMKfMeZsrX2dxVNrfRtjfDzfIgITXERABGAKIgIiAFMQERABmIKIgAjAFEQERABXcPgcubPWvkII9+0Td9OtR3rnXI/ILiKcc9Zae1prz2gfHZHRgqPnvXNuFBH9JGOMuYwx5+jZnUVGN/eej0YEZrCIwATX7+4wDZiCiIAIwBREBEQApiAiIAIwBREBEYApiAiIAExBREAEYAoiAiIAUxAREAGYwg9EvUE3nEfJPwAAAABJRU5ErkJggg==');
      opacity: ${intensity * 0.05};
      animation: glitch-noise ${speed}s infinite;
    }
    @keyframes glitch-noise {
      0% { transform: translate(0); }
      20% { transform: translate(-${intensity}px, ${intensity}px); }
      40% { transform: translate(-${intensity}px, -${intensity}px); }
      60% { transform: translate(${intensity}px, ${intensity}px); }
      80% { transform: translate(${intensity}px, -${intensity}px); }
      100% { transform: translate(0); }
    }`,
  'transformation': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      animation: glitch-transform ${speed}s infinite;
    }
    @keyframes glitch-transform {
      0% { transform: translate(0); }
      20% { transform: translate(-${intensity}px, ${intensity}px); }
      40% { transform: skew(${intensity}deg); }
      60% { transform: scale(1.${intensity}); }
      80% { transform: rotate(${intensity}deg); }
      100% { transform: translate(0); }
    }`,
  'glitch-clip': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
    }
    .glitch::before,
    .glitch::after {
      content: "${text}";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      clip: rect(0, 0, 0, 0);
    }
    .glitch::before {
      left: ${intensity * 0.2}px;
      text-shadow: -1px 0 ${color1};
      animation: glitch-clip-1 ${speed}s infinite linear alternate-reverse;
    }
    .glitch::after {
      left: -${intensity * 0.2}px;
      text-shadow: 1px 0 ${color2};
      animation: glitch-clip-2 ${speed * 1.5}s infinite linear alternate-reverse;
    }
    @keyframes glitch-clip-1 {
      0% { clip: rect(${intensity * 5}px, 9999px, ${intensity * 10}px, 0); }
      20% { clip: rect(${intensity * 15}px, 9999px, ${intensity * 20}px, 0); }
      40% { clip: rect(${intensity * 25}px, 9999px, ${intensity * 30}px, 0); }
      60% { clip: rect(${intensity * 35}px, 9999px, ${intensity * 40}px, 0); }
      80% { clip: rect(${intensity * 45}px, 9999px, ${intensity * 50}px, 0); }
      100% { clip: rect(${intensity * 55}px, 9999px, ${intensity * 60}px, 0); }
    }
    @keyframes glitch-clip-2 {
      0% { clip: rect(${intensity * 10}px, 9999px, ${intensity * 15}px, 0); }
      20% { clip: rect(${intensity * 20}px, 9999px, ${intensity * 25}px, 0); }
      40% { clip: rect(${intensity * 30}px, 9999px, ${intensity * 35}px, 0); }
      60% { clip: rect(${intensity * 40}px, 9999px, ${intensity * 45}px, 0); }
      80% { clip: rect(${intensity * 50}px, 9999px, ${intensity * 55}px, 0); }
      100% { clip: rect(${intensity * 60}px, 9999px, ${intensity * 65}px, 0); }
    }`,
  'distortion': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      animation: glitch-distort ${speed * 2}s infinite;
    }
    .glitch::before,
    .glitch::after {
      content: "${text}";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }
    .glitch::before {
      color: ${color1};
      animation: glitch-distort ${speed}s infinite;
      clip-path: polygon(0 ${intensity * 2}%, 100% 0%, 100% ${100 - intensity * 2}%, 0% 100%);
    }
    .glitch::after {
      color: ${color2};
      animation: glitch-distort ${speed * 1.5}s infinite reverse;
      clip-path: polygon(0 ${intensity}%, 100% ${intensity * 2}%, 100% ${100 - intensity}%, 0% ${100 - intensity * 2}%);
    }
    @keyframes glitch-distort {
      0% { transform: translate(0) skew(0deg); }
      25% { transform: translate(${intensity * 0.5}px, -${intensity * 0.5}px) skew(${intensity * 0.2}deg); }
      50% { transform: translate(-${intensity * 0.5}px, ${intensity * 0.5}px) skew(-${intensity * 0.2}deg); }
      75% { transform: translate(${intensity * 0.5}px, ${intensity * 0.5}px) skew(${intensity * 0.2}deg); }
      100% { transform: translate(0) skew(0deg); }
    }`,
  'pixelate': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      animation: glitch-pixelate ${speed}s infinite;
    }
    @keyframes glitch-pixelate {
      0% { transform: scale(1); filter: none; }
      25% { transform: scale(1.${intensity}); filter: blur(${intensity}px); }
      50% { transform: scale(1); filter: none; }
      75% { transform: scale(0.${100 - intensity}); filter: blur(${intensity * 2}px); }
      100% { transform: scale(1); filter: none; }
    }`,
  'wave': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      animation: glitch-wave ${speed}s ease infinite;
    }
    @keyframes glitch-wave {
      0% { transform: translateY(0); }
      25% { transform: translateY(-${intensity}px) skew(${intensity * 0.5}deg); }
      50% { transform: translateY(0) skew(-${intensity * 0.5}deg); }
      75% { transform: translateY(${intensity}px) skew(${intensity * 0.5}deg); }
      100% { transform: translateY(0); }
    }`,
    'scan-line': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      overflow: hidden;
    }
    .glitch::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: ${intensity}px;
      background-color: ${color1};
      mix-blend-mode: overlay;
      animation: scan-line ${speed}s linear infinite;
      opacity: 0.5;
      z-index: 1;
    }
    @keyframes scan-line {
      0% { top: -${intensity}px; }
      100% { top: 100%; }
    }`,
  
  'vhs-tracking': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      text-shadow: 0.${intensity}px 0 ${color1}, -0.${intensity}px 0 ${color2};
      animation: vhs-tracking ${speed}s infinite;
    }
    @keyframes vhs-tracking {
      0% { transform: translateY(0); filter: none; }
      10% { transform: translateY(-${intensity * 0.5}px); filter: brightness(1.2); }
      20% { transform: translateY(${intensity * 0.3}px); filter: brightness(0.9); }
      30% { transform: translateY(-${intensity * 0.2}px); filter: brightness(1.1) blur(${intensity * 0.1}px); }
      40% { transform: translateY(0); filter: none; }
      90% { transform: translateY(0); filter: none; }
      91% { transform: translateY(${intensity * 2}px); filter: brightness(1.3) blur(${intensity * 0.3}px); }
      92% { transform: translateY(-${intensity}px); filter: brightness(0.8); }
      100% { transform: translateY(0); filter: none; }
    }`,
  
  'data-corruption': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
    }
    .glitch::before,
    .glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      color: white;
      overflow: hidden;
    }
    .glitch::before {
      left: -${intensity * 0.3}px;
      text-shadow: ${intensity * 0.1}px 0 ${color1};
      animation: data-corruption-1 ${speed}s infinite linear alternate-reverse;
      background: rgba(0,0,0,0);
      z-index: -1;
    }
    .glitch::after {
      left: ${intensity * 0.3}px;
      text-shadow: -${intensity * 0.1}px 0 ${color2};
      animation: data-corruption-2 ${speed * 1.3}s infinite linear alternate-reverse;
      background: rgba(0,0,0,0);
      z-index: -2;
    }
    @keyframes data-corruption-1 {
      0% { transform: translate(0); }
      10% { transform: translate(-${intensity * 0.5}px, ${intensity * 0.3}px); }
      20% { transform: translate(${intensity * 0.3}px, -${intensity * 0.5}px); }
      30% { transform: translate(-${intensity * 0.2}px, ${intensity * 0.4}px); }
      40% { transform: translate(${intensity * 0.4}px, ${intensity * 0.2}px); }
      50% { transform: translate(-${intensity * 0.3}px, -${intensity * 0.3}px); }
      60% { transform: translate(${intensity * 0.2}px, ${intensity * 0.5}px); }
      70% { transform: translate(-${intensity * 0.5}px, -${intensity * 0.2}px); }
      80% { transform: translate(${intensity * 0.4}px, -${intensity * 0.4}px); }
      90% { transform: translate(-${intensity * 0.3}px, ${intensity * 0.5}px); }
      100% { transform: translate(0); }
    }
    @keyframes data-corruption-2 {
      0% { transform: translate(0); }
      15% { transform: translate(${intensity * 0.4}px, -${intensity * 0.3}px); }
      30% { transform: translate(-${intensity * 0.5}px, ${intensity * 0.4}px); }
      45% { transform: translate(${intensity * 0.3}px, ${intensity * 0.5}px); }
      60% { transform: translate(-${intensity * 0.4}px, -${intensity * 0.2}px); }
      75% { transform: translate(${intensity * 0.2}px, -${intensity * 0.5}px); }
      90% { transform: translate(-${intensity * 0.3}px, ${intensity * 0.3}px); }
      100% { transform: translate(0); }
    }`,

  'digital-decay': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      animation: digital-decay ${speed * 2}s infinite;
    }
    .glitch::before {
      content: "${text}";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      clip-path: polygon(
        ${intensity}% ${intensity}%, 
        ${100 - intensity}% ${intensity}%, 
        ${100 - intensity}% ${100 - intensity}%, 
        ${intensity}% ${100 - intensity}%
      );
      animation: digital-decay-mask ${speed}s infinite steps(${intensity});
      color: ${color1};
    }
    @keyframes digital-decay {
      0% { opacity: 1; filter: none; }
      50% { opacity: 1; filter: none; }
      51% { opacity: 0.${intensity}; filter: hue-rotate(${intensity * 5}deg); }
      52% { opacity: 1; filter: none; }
      70% { opacity: 1; filter: none; }
      72% { opacity: 0.${intensity}; filter: saturate(${intensity * 5}) hue-rotate(-${intensity * 5}deg); }
      73% { opacity: 1; filter: none; }
      100% { opacity: 1; filter: none; }
    }
    @keyframes digital-decay-mask {
      0% { clip-path: polygon(${intensity}% ${intensity}%, ${100 - intensity}% ${intensity}%, ${100 - intensity}% ${100 - intensity}%, ${intensity}% ${100 - intensity}%); }
      25% { clip-path: polygon(0% 0%, 100% 0%, 100% ${100 - intensity * 2}%, 0% 100%); }
      50% { clip-path: polygon(${intensity * 2}% 0%, 100% ${intensity}%, ${100 - intensity}% 100%, 0% ${100 - intensity * 2}%); }
      75% { clip-path: polygon(0% ${intensity}%, ${100 - intensity * 2}% 0%, 100% ${100 - intensity}%, ${intensity}% 100%); }
      100% { clip-path: polygon(${intensity}% ${intensity}%, ${100 - intensity}% ${intensity}%, ${100 - intensity}% ${100 - intensity}%, ${intensity}% ${100 - intensity}%); }
    }`,
    
  'terminal-error': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      animation: terminal-flicker ${speed * 0.5}s infinite;
    }
    .glitch::before {
      content: "_";
      position: absolute;
      right: -${intensity * 0.5}px;
      animation: terminal-cursor ${speed}s infinite;
      color: ${color1};
    }
    @keyframes terminal-flicker {
      0% { opacity: 1; }
      49% { opacity: 1; }
      50% { opacity: 0.8; }
      51% { opacity: 1; }
      59% { opacity: 1; }
      60% { opacity: 0.8; }
      61% { opacity: 1; }
      100% { opacity: 1; }
    }
    @keyframes terminal-cursor {
      0% { opacity: 1; }
      49% { opacity: 1; }
      50% { opacity: 0; }
      99% { opacity: 0; }
      100% { opacity: 1; }
    }`,
    
  'hologram': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      color: ${color1};
      text-shadow: 0 0 ${intensity * 0.5}px ${color1}, 0 0 ${intensity}px ${color1};
      animation: hologram-flicker ${speed * 0.5}s infinite alternate;
    }
    .glitch::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(transparent 50%, rgba(${color2}, 0.1) 50%);
      background-size: 100% ${intensity}px;
      animation: hologram-scan ${speed * 2}s infinite linear;
      z-index: -1;
      opacity: 0.5;
    }
    @keyframes hologram-flicker {
      0% { opacity: 1; text-shadow: 0 0 ${intensity * 0.5}px ${color1}, 0 0 ${intensity}px ${color1}; }
      90% { opacity: 1; text-shadow: 0 0 ${intensity * 0.5}px ${color1}, 0 0 ${intensity}px ${color1}; }
      91% { opacity: 0.8; text-shadow: 0 0 ${intensity * 0.3}px ${color1}, 0 0 ${intensity * 0.7}px ${color1}; } 
      92% { opacity: 1; text-shadow: 0 0 ${intensity * 0.5}px ${color1}, 0 0 ${intensity}px ${color1}; }
      93% { opacity: 0.9; text-shadow: 0 0 ${intensity * 0.4}px ${color1}, 0 0 ${intensity * 0.8}px ${color1}; }
      100% { opacity: 1; text-shadow: 0 0 ${intensity * 0.5}px ${color1}, 0 0 ${intensity}px ${color1}; }
    }
    @keyframes hologram-scan {
      0% { background-position: 0 0; }
      100% { background-position: 0 ${intensity * 10}px; }
    }`,
    
  'glitch-blur': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      animation: glitch-blur ${speed}s infinite;
    }
    .glitch::before,
    .glitch::after {
      content: "${text}";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }
    .glitch::before {
      color: ${color1};
      animation: glitch-blur-offset ${speed * 0.7}s infinite alternate-reverse;
      filter: blur(${intensity * 0.1}px);
    }
    .glitch::after {
      color: ${color2};
      animation: glitch-blur-offset ${speed * 0.9}s infinite alternate;
      filter: blur(${intensity * 0.1}px);
    }
    @keyframes glitch-blur {
      0% { filter: blur(0); }
      40% { filter: blur(0); }
      41% { filter: blur(${intensity * 0.2}px); }
      42% { filter: blur(0); }
      90% { filter: blur(0); }
      91% { filter: blur(${intensity * 0.3}px); }
      92% { filter: blur(0); }
      100% { filter: blur(0); }
    }
    @keyframes glitch-blur-offset {
      0% { transform: translate(0); }
      10% { transform: translate(${intensity * 0.2}px, -${intensity * 0.2}px); }
      20% { transform: translate(-${intensity * 0.2}px, ${intensity * 0.2}px); }
      30% { transform: translate(${intensity * 0.3}px, ${intensity * 0.1}px); }
      40% { transform: translate(-${intensity * 0.1}px, -${intensity * 0.3}px); }
      50% { transform: translate(${intensity * 0.2}px, ${intensity * 0.2}px); }
      60% { transform: translate(-${intensity * 0.3}px, ${intensity * 0.1}px); }
      70% { transform: translate(${intensity * 0.1}px, -${intensity * 0.1}px); }
      80% { transform: translate(-${intensity * 0.2}px, -${intensity * 0.2}px); }
      90% { transform: translate(${intensity * 0.3}px, -${intensity * 0.3}px); }
      100% { transform: translate(0); }
    }`,
    
  'crt-shutdown': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      transform-origin: center center;
      animation: crt-shutdown ${speed * 3}s infinite;
    }
    @keyframes crt-shutdown {
      0% { transform: scaleY(1); filter: brightness(1); }
      90% { transform: scaleY(1); filter: brightness(1); }
      95% { transform: scaleY(0.${intensity}); filter: brightness(${intensity * 0.1}) blur(${intensity * 0.1}px); }
      96% { transform: scaleY(0.${intensity * 0.8}); filter: brightness(${intensity * 0.05}) blur(${intensity * 0.15}px); }
      97% { transform: scaleY(0.${intensity * 0.6}); filter: brightness(${intensity * 0.02}) blur(${intensity * 0.2}px); }
      98% { transform: scaleY(0.${intensity * 0.3}); filter: brightness(${intensity * 0.01}) blur(${intensity * 0.3}px); }
      99% { transform: scaleY(0.1); filter: brightness(0) blur(${intensity * 0.5}px); }
      100% { transform: scaleY(1); filter: brightness(1); }
    }`,
    
  'magnetic-interference': (text: string, color1: string, color2: string, intensity: number, speed: number) => `
    .glitch {
      position: relative;
      animation: magnetic-wave ${speed}s infinite ease-in-out;
    }
    @keyframes magnetic-wave {
      0% { transform: skew(0deg, 0deg); filter: none; }
      20% { transform: skew(-${intensity * 0.1}deg, ${intensity * 0.05}deg); filter: none; }
      40% { transform: skew(${intensity * 0.15}deg, -${intensity * 0.025}deg); filter: none; }
      60% { transform: skew(-${intensity * 0.05}deg, ${intensity * 0.1}deg); filter: none; }
      80% { transform: skew(${intensity * 0.025}deg, -${intensity * 0.15}deg); filter: none; }
      82% { transform: skew(${intensity * 0.2}deg, ${intensity * 0.2}deg); filter: hue-rotate(${intensity * 3}deg); }
      84% { transform: skew(-${intensity * 0.2}deg, -${intensity * 0.2}deg); filter: hue-rotate(-${intensity * 3}deg); }
      86% { transform: skew(${intensity * 0.1}deg, ${intensity * 0.1}deg); filter: none; }
      100% { transform: skew(0deg, 0deg); filter: none; }
    }`,
  'custom': () => ''
};