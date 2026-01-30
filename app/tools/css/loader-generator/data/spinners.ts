// src/app/tools/css-loader-generator/data/spinners.ts
import { LoaderDef } from "./types";

export const spinners: Record<string, LoaderDef> = {
  'Simple Spinner': {
    html: '<span class="loader"></span>',
    css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size}px;
        border: ${opts.size / 10}px solid ${opts.primaryColor};
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation ${opts.speed}s linear infinite;
      }
      @keyframes rotation {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
  },
  'Orbit Spinner': {
    html: '<div class="loader"></div>',
    css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size}px;
        position: relative;
        display: inline-block;
      }
      .loader::before, .loader::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${opts.size * 0.18}px;
        height: ${opts.size * 0.18}px;
        background-color: ${opts.primaryColor};
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: orbit ${opts.speed}s linear infinite;
      }
      .loader::after {
        animation-delay: -${opts.speed / 2}s;
      }
      @keyframes orbit {
        0% { transform: translate(-50%, -50%) rotate(0deg) translate(${opts.size * 0.35}px); }
        100% { transform: translate(-50%, -50%) rotate(360deg) translate(${opts.size * 0.35}px); }
      }
    `,
  },
  'Square Flip Spinner': {
    html: '<div class="loader"></div>',
    css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size}px;
        position: relative;
        display: inline-block;
        animation: flip ${opts.speed}s infinite ease;
        transform-style: preserve-3d;
      }
      .loader::before,
      .loader::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: ${opts.primaryColor};
      }
      .loader::before {
        transform: rotateX(0deg) translateZ(${opts.size * 0.35}px);
      }
      .loader::after {
        transform: rotateX(90deg) translateZ(${opts.size * 0.35}px);
        opacity: 0.5;
      }
      @keyframes flip {
        0% { transform: rotateX(0deg); }
        50% { transform: rotateX(180deg); }
        100% { transform: rotateX(360deg); }
      }
    `,
  },
  'Circle Orbit Spinner': {
    html: '<div class="loader"></div>',
    css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size}px;
        position: relative;
        display: inline-block;
      }
      .loader::before,
      .loader::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: ${Math.max(2, opts.size * 0.05)}px solid transparent;
        border-top-color: ${opts.primaryColor};
      }
      .loader::before {
        animation: spin ${opts.speed}s linear infinite;
      }
      .loader::after {
        border-top-color: ${opts.secondaryColor};
        animation: spin ${opts.speed}s linear infinite reverse;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
  },
  'Gradient Ring Spinner': {
    html: '<div class="loader"></div>',
    css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size}px;
        display: inline-block;
        position: relative;
        border-radius: 50%;
        background: conic-gradient(from 0deg, transparent 0%, ${opts.primaryColor} 100%);
        animation: rotate ${opts.speed}s linear infinite;
      }
      .loader::after {
        content: '';
        position: absolute;
        inset: ${Math.max(3, opts.size * 0.09)}px;
        border-radius: 50%;
        background: ${opts.backgroundColor};
      }
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
  },
  'Spinning Border': {
    html: '<div class="spinner"></div>',
    css: (opts) => `
    .spinner {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border: ${opts.size * 0.2}px ${opts.primaryColor} double;
      border-left-style: solid;
      border-radius: 50%;
      animation: spinner-rotate ${opts.speed}s infinite linear;
    }

    @keyframes spinner-rotate {
      to {
        transform: rotate(360deg);
      }
    }
  `,
  },

  'Double Ring': {
    html: '<div class="loader"></div>',
    css: (opts) => `
      .loader {
        position: relative;
        width: ${opts.size}px;
        height: ${opts.size}px;
      }
      .loader:before, .loader:after {
        content: '';
        border-radius: 50%;
        position: absolute;
        inset: 0;
        box-shadow: 0 0 0 ${Math.max(2, opts.size * 0.05)}px ${opts.primaryColor};
        animation: rotate ${opts.speed}s linear infinite;
      }
      .loader:after {
        box-shadow: 0 0 0 ${Math.max(2, opts.size * 0.05)}px ${opts.secondaryColor};
        animation: rotate ${opts.speed}s linear infinite reverse;
      }
      @keyframes rotate {
        0% { transform: rotate(0) }
        100% { transform: rotate(360deg) }
      }
    `,
  },
  'Circular Burst': {
    html: '<div class="loader"></div>',
    css: (opts) => `
      .loader {
        width: ${opts.size * 0.2}px;
        height: ${opts.size * 0.2}px;
        border-radius: 50%;
        animation: spinner-z355kx ${opts.speed}s infinite linear;
        /* Note: Box shadows are hardcoded ratios based on original 11.2px size */
        /* For a perfect generator, we approximate scaling or keep fixed ratios */
        box-shadow: 
          ${opts.size * 0.5}px 0px 0 0 ${opts.primaryColor}, 
          ${opts.size * 0.31}px ${opts.size * 0.39}px 0 0 ${opts.primaryColor}, 
          -${opts.size * 0.11}px ${opts.size * 0.48}px 0 0 ${opts.primaryColor}, 
          -${opts.size * 0.45}px ${opts.size * 0.21}px 0 0 ${opts.primaryColor}, 
          -${opts.size * 0.45}px -${opts.size * 0.21}px 0 0 ${opts.primaryColor}, 
          -${opts.size * 0.11}px -${opts.size * 0.48}px 0 0 ${opts.primaryColor}, 
          ${opts.size * 0.31}px -${opts.size * 0.39}px 0 0 ${opts.primaryColor};
      }

      @keyframes spinner-z355kx {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  },
  'Comet Spinner': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      background: conic-gradient(#0000 10%, ${opts.primaryColor});
      -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - ${Math.max(
      3,
      opts.size * 0.16
    )}px), #000 0);
      animation: comet-rotate ${opts.speed}s linear infinite;
    }

    @keyframes comet-rotate {
      to {
        transform: rotate(360deg);
      }
    }
  `,
  },
  'Dual Gradient Spinner': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      background:
        radial-gradient(circle at 50% 50%, ${opts.primaryColor} 45%, transparent 50%) 50% 0 /
        ${opts.size * 0.18}px ${opts.size * 0.18}px no-repeat,
        conic-gradient(${opts.primaryColor} 0deg, transparent 180deg, ${opts.primaryColor} 180deg);
      animation: dualGradientSpin ${opts.speed}s linear infinite;
    }

    @keyframes dualGradientSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
  },
  'Radial Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      padding: ${opts.size * 0.05}px;
      background:
        radial-gradient(farthest-side, ${opts.primaryColor} 95%, #0000) 50% 0 /
        ${opts.size * 0.22}px ${opts.size * 0.22}px no-repeat,
        radial-gradient(farthest-side, #0000 calc(100% - ${opts.size * 0.09}px), ${opts.primaryColor} calc(100% - ${opts.size * 0.07}px)) content-box;
      animation: radialSpin ${opts.speed}s linear infinite;
    }

    @keyframes radialSpin {
      to { transform: rotate(1turn); }
    }
  `,
  },
  'Quad Dot Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      --c: radial-gradient(farthest-side, ${opts.primaryColor} 92%, #0000);
      background:
        var(--c) 50% 0,
        var(--c) 50% 100%,
        var(--c) 100% 50%,
        var(--c) 0 50%;
      background-size: ${opts.size * 0.22}px ${opts.size * 0.22}px;
      background-repeat: no-repeat;
      animation: quadDotSpin ${opts.speed}s linear infinite;
    }

    @keyframes quadDotSpin {
      to { transform: rotate(.5turn); }
    }
  `,
  },
  'Cross Dot Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      --c: radial-gradient(farthest-side, ${opts.primaryColor} 92%, #0000);
      background:
        var(--c) 50% 0 / ${opts.size * 0.22}px ${opts.size * 0.22}px,
        var(--c) 50% 100% / ${opts.size * 0.22}px ${opts.size * 0.22}px,
        var(--c) 100% 50% / ${opts.size * 0.22}px ${opts.size * 0.22}px,
        var(--c) 0 50% / ${opts.size * 0.22}px ${opts.size * 0.22}px,
        var(--c) 50% 50% / ${opts.size * 0.22}px ${opts.size * 0.22}px,
        linear-gradient(${opts.primaryColor} 0 0) 50% 50% / 4px 100%,
        linear-gradient(${opts.primaryColor} 0 0) 50% 50% / 100% 4px;
      background-repeat: no-repeat;
      animation: crossDotSpin ${opts.speed}s linear infinite;
    }

    @keyframes crossDotSpin {
      to { transform: rotate(.5turn); }
    }
  `,
  },
  'Orbital Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      background:
        radial-gradient(farthest-side, ${opts.primaryColor} 95%, #0000) 50% 1px /
        ${opts.size * 0.22}px ${opts.size * 0.22}px no-repeat,
        radial-gradient(farthest-side, #0000 calc(100% - ${opts.size * 0.25}px), ${opts.secondaryColor || "#E4E4ED"} 0);
      animation: orbitalSpin ${opts.speed}s linear infinite;
    }

    @keyframes orbitalSpin {
      to { transform: rotate(1turn); }
    }
  `,
  },
  'Wheel Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      background:
        linear-gradient(${opts.primaryColor} 0 0) center / 100% 4px,
        linear-gradient(${opts.primaryColor} 0 0) center / 4px 100%,
        radial-gradient(farthest-side, #0000 calc(100% - ${opts.size * 0.1}px), ${opts.primaryColor} calc(100% - ${opts.size * 0.088}px)),
        radial-gradient(circle ${opts.size * 0.11}px, ${opts.primaryColor} 94%, #0000 0);
      background-repeat: no-repeat;
      animation: wheelSpin ${opts.speed}s linear infinite;
      position: relative;
    }

    .loader::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: inherit;
      transform: rotate(45deg);
    }

    @keyframes wheelSpin {
      to { transform: rotate(.5turn); }
    }
  `,
  },
  'Pac Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      padding: ${opts.size * 0.11}px;
      background:
        conic-gradient(from 135deg at top, ${opts.primaryColor} 90deg, #0000 0)
        0 calc(50% - ${opts.size * 0.07}px) / ${opts.size * 0.3}px ${opts.size * 0.15}px,
        radial-gradient(farthest-side at bottom left, #0000 calc(100% - ${opts.size * 0.11}px), ${opts.primaryColor} calc(100% - ${opts.size * 0.09}px) 99%, #0000)
        top right / 50% 50% content-box content-box,
        radial-gradient(farthest-side at top, #0000 calc(100% - ${opts.size * 0.11}px), ${opts.primaryColor} calc(100% - ${opts.size * 0.09}px) 99%, #0000)
        bottom / 100% 50% content-box content-box;
      background-repeat: no-repeat;
      animation: pacSpin ${opts.speed}s linear infinite;
    }

    @keyframes pacSpin {
      100% { transform: rotate(1turn); }
    }
  `,
  },
  'Half-Rotate Spinner': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      border: ${Math.max(2, opts.size * 0.07)}px solid;
      border-color: ${opts.primaryColor} #0000;
      animation: halfRotate ${opts.speed}s infinite linear;
    }

    @keyframes halfRotate {
      to { transform: rotate(180deg); }
    }
  `,
  },
  'Dual Orbit': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      display: grid;
    }

    .loader::before,
    .loader::after {
      content: "";
      grid-area: 1/1;
      --c: radial-gradient(farthest-side, ${opts.primaryColor} 92%, #0000);
      background:
        var(--c) 50% 0,
        var(--c) 50% 100%,
        var(--c) 100% 50%,
        var(--c) 0 50%;
      background-size: ${opts.size * 0.23}px ${opts.size * 0.23}px;
      background-repeat: no-repeat;
      animation: dualOrbit ${opts.speed}s infinite linear;
    }

    .loader::before {
      margin: ${opts.size * 0.07}px;
      filter: hue-rotate(45deg);
      background-size: ${opts.size * 0.16}px ${opts.size * 0.16}px;
    }

    @keyframes dualOrbit {
      100% { transform: rotate(.5turn) }
    }
  `,
  },
  'Dual Ring': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      display: grid;
    }

    .loader::before,
    .loader::after {
      content: "";
      grid-area: 1/1;
      border: ${Math.max(3, opts.size * 0.16)}px solid;
      border-radius: 50%;
      border-color: ${opts.primaryColor} ${opts.primaryColor} #0000 #0000;
      animation: dualRing ${opts.speed}s linear infinite;
      mix-blend-mode: darken;
    }

    .loader::after {
      border-color: #0000 #0000 ${opts.secondaryColor || "#E4E4ED"} ${opts.secondaryColor || "#E4E4ED"};
      animation-direction: reverse;
    }

    @keyframes dualRing {
      100% { transform: rotate(1turn); }
    }
  `,
  },
  'Triple Ring': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      display: grid;
      border: ${opts.size * 0.07}px solid #0000;
      border-radius: 50%;
      border-right-color: ${opts.primaryColor};
      animation: tripleRing ${opts.speed}s linear infinite;
    }
    .loader::before,
    .loader::after {
      content: "";
      grid-area: 1/1;
      margin: ${opts.size * 0.035}px;
      border: inherit;
      border-radius: 50%;
      animation: tripleRing ${opts.speed * 2}s infinite;
    }
    .loader::after {
      margin: ${opts.size * 0.14}px;
      animation-duration: ${opts.speed * 3}s;
    }
    @keyframes tripleRing {
      100% { transform: rotate(1turn) }
    }
  `,
  },
  'Bouncing Orbit': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      position: relative;
      background:
        radial-gradient(farthest-side, ${opts.primaryColor} 90%, #0000)
          center / ${opts.size * 0.32}px ${opts.size * 0.32}px,
        radial-gradient(farthest-side, ${opts.secondaryColor || '#6F6D91'} 90%, #0000)
          bottom / ${opts.size * 0.23}px ${opts.size * 0.23}px;
      background-repeat: no-repeat;
      animation: bouncingOrbit ${opts.speed}s linear infinite;
    }

    .loader::before {
      content: "";
      position: absolute;
      inset: auto 0 ${opts.size * 0.32}px; /* originally 18px */
      width: ${opts.size * 0.16}px;        /* originally 9px */
      height: ${opts.size * 0.16}px;
      margin: auto;
      background: ${opts.secondaryColor || "#E4E4ED"};
      border-radius: 50%;
      transform-origin: 50% calc(100% + ${opts.size * 0.2}px); /* originally +11px */
      animation: bouncingOrbit ${opts.speed * 0.5}s linear infinite;
    }

    @keyframes bouncingOrbit {
      100% { transform: rotate(1turn); }
    }
  `,
  },
  'Atom Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      position: relative;
      --c: radial-gradient(farthest-side, ${opts.primaryColor} 92%, #0000);
      background:
        var(--c) 50% 0,
        var(--c) 50% 100%,
        var(--c) 100% 50%,
        var(--c) 0 50%;
      background-size: ${opts.size * 0.20}px ${opts.size * 0.20}px;
      background-repeat: no-repeat;
      animation: atomSpin ${opts.speed}s infinite linear;
    }

    .loader::before {
      content: "";
      position: absolute;
      inset: 0;
      margin: ${opts.size * 0.055}px;  /* originally 3px */
      background: repeating-conic-gradient(
        #0000 0 35deg,
        ${opts.primaryColor} 0 90deg
      );
      -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - ${opts.size * 0.055}px),
        #000 0
      );
      border-radius: 50%;
    }

    @keyframes atomSpin {
      100% { transform: rotate(.5turn); }
    }
  `,
  },
  'Quantum Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      display: grid;
      color: ${opts.primaryColor};
      background: radial-gradient(
        farthest-side,
        currentColor calc(100% - ${opts.size * 0.125}px),
        #0000 calc(100% - ${opts.size * 0.107}px) 0
      );
      -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - ${opts.size * 0.27}px),
        #000 calc(100% - ${opts.size * 0.23}px)
      );
      border-radius: 50%;
      animation: quantumSpin ${opts.speed}s linear infinite;
    }

    .loader::before,
    .loader::after {
      content: "";
      grid-area: 1/1;
      background:
        linear-gradient(currentColor 0 0) center,
        linear-gradient(currentColor 0 0) center;
      background-size: 100% ${opts.size * 0.19}px, ${opts.size * 0.19}px 100%;
      background-repeat: no-repeat;
    }
    .loader::after { transform: rotate(45deg); }

    @keyframes quantumSpin {
      100% { transform: rotate(1turn); }
    }
  `,
  },
  'Morphing Circle': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      border: ${opts.size * 0.16}px solid ${opts.primaryColor};
      animation:
        morph1 ${opts.speed * 0.8}s infinite linear alternate,
        morph2 ${opts.speed * 1.6}s infinite linear;
    }

    @keyframes morph1 {
      0%    {clip-path: polygon(50% 50%,0 0,   50% 0,   50% 0,   50% 0,   50% 0,   50% 0 )}
      12.5% {clip-path: polygon(50% 50%,0 0,   50% 0,   100% 0,  100% 0,  100% 0,  100% 0 )}
      25%   {clip-path: polygon(50% 50%,0 0,   50% 0,   100% 0,  100% 100%, 100% 100%, 100% 100% )}
      50%   {clip-path: polygon(50% 50%,0 0,   50% 0,   100% 0,  100% 100%, 50% 100%, 0 100% )}
      62.5% {clip-path: polygon(50% 50%,100% 0,100% 0,  100% 0,  100% 100%, 50% 100%, 0 100% )}
      75%   {clip-path: polygon(50% 50%,100% 100%,100% 100%,100% 100%,100% 100%,50% 100%,0 100% )}
      100%  {clip-path: polygon(50% 50%,50% 100%,50% 100%,50% 100%,50% 100%,50% 100%,0 100% )}
    }

    @keyframes morph2 {
      0%    { transform:scaleY(1)  rotate(0deg) }
      49.99%{ transform:scaleY(1)  rotate(135deg) }
      50%   { transform:scaleY(-1) rotate(0deg) }
      100%  { transform:scaleY(-1) rotate(-135deg) }
    }
  `,
  },
  'Half-Half Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      background: repeating-conic-gradient(
        ${opts.primaryColor} 0 90deg,
        ${opts.secondaryColor || '#E4E4ED'} 0 180deg
      );
      animation: halfHalfSpin ${opts.speed}s infinite linear;
    }

    @keyframes halfHalfSpin {
      100% { transform: rotate(.5turn); }
    }
  `,
  },
  'Triple Layer Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      display: grid;
      border-radius: 50%;
      background: conic-gradient(
        ${opts.primaryColor} 25%,
        ${opts.secondaryColor || '#E4E4ED'} 0 50%,
        ${opts.primaryColor} 0
      );
      animation: tripleLayerSpin ${opts.speed}s infinite linear;
    }

    .loader::before,
    .loader::after {
      content: "";
      grid-area: 1/1;
      border-radius: 50%;
      margin: ${opts.size * 0.15}px;
      background: inherit;
      animation: inherit;
    }

    .loader::after {
      margin: ${opts.size * 0.25}px;
      animation-duration: ${opts.speed * 1.5}s;
    }

    @keyframes tripleLayerSpin {
      100% { transform: rotate(1turn); }
    }
  `,
  },
  'Radial Spinner': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      display: grid;
      border-radius: 50%;
      -webkit-mask: radial-gradient(farthest-side, #0000 40%, #000 41%);
      background:
        linear-gradient(0deg, ${opts.primaryColor}80 50%, ${opts.primaryColor}FF 0) center/${opts.size * 0.07}px 100%,
        linear-gradient(90deg, ${opts.primaryColor}40 50%, ${opts.primaryColor}BF 0) center/100% ${opts.size * 0.07}px;
      background-repeat: no-repeat;
      animation: radialSpin ${opts.speed}s infinite steps(12);
    }
    .loader::before,
    .loader::after {
      content: "";
      grid-area: 1/1;
      border-radius: 50%;
      background: inherit;
      opacity: 0.915;
      transform: rotate(30deg);
    }
    .loader::after {
      opacity: 0.83;
      transform: rotate(60deg);
    }
    @keyframes radialSpin {
      100% { transform: rotate(1turn) }
    }
  `,
  },
  'Triple Border Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      border: ${opts.size * 0.16}px solid #0000;
      border-right-color: ${opts.primaryColor}97;
      position: relative;
      animation: tripleBorderSpin ${opts.speed}s infinite linear;
    }
    .loader:before,
    .loader:after {
      content: "";
      position: absolute;
      inset: -${opts.size * 0.16}px;
      border-radius: 50%;
      border: inherit;
      animation: inherit;
      animation-duration: ${opts.speed * 2}s;
    }
    .loader:after {
      animation-duration: ${opts.speed * 4}s;
    }
    @keyframes tripleBorderSpin {
      100% { transform: rotate(1turn) }
    }
  `,
  },
  'Pac-Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      background: ${opts.primaryColor};
      -webkit-mask: radial-gradient(circle closest-side at 50% 40%, #0000 94%, #000);
      transform-origin: 50% 40%;
      animation: pacSpin ${opts.speed}s infinite linear;
    }
    @keyframes pacSpin {
      100% { transform: rotate(1turn) }
    }
  `,
  },
  'Orbital Dots': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      --d: ${opts.size * 0.42}px;
      width: ${opts.size * 0.07}px;
      height: ${opts.size * 0.07}px;
      border-radius: 50%;
      color: ${opts.primaryColor};
      box-shadow:
        calc(1*var(--d)) 0 0,
        calc(0.707*var(--d)) calc(0.707*var(--d)) 0 1px,
        0 calc(1*var(--d)) 0 2px,
        calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
        calc(-1*var(--d)) 0 0 4px,
        calc(-0.707*var(--d)) calc(-0.707*var(--d)) 0 5px,
        0 calc(-1*var(--d)) 0 6px;
      animation: orbitalDots ${opts.speed}s infinite steps(8);
    }
    @keyframes orbitalDots {
      100% { transform: rotate(1turn) }
    }
  `,
  },
  'Triple Dot Swing': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size * 0.25}px;
      color: ${opts.primaryColor};
      background:
        radial-gradient(farthest-side,currentColor 90%,#0000) left/${opts.size * 0.25}px ${opts.size * 0.25}px,
        radial-gradient(farthest-side,currentColor 90%,#0000) center/${opts.size * 0.25}px ${opts.size * 0.25}px,
        radial-gradient(farthest-side,currentColor 90%,#0000) right/${opts.size * 0.25}px ${opts.size * 0.25}px,
        linear-gradient(currentColor 0 0) center/100% ${opts.size * 0.07}px;
      background-repeat: no-repeat;
      position: relative;
      animation: dotSwing ${opts.speed}s infinite linear;
    }
    .loader:before,
    .loader:after {
      content: "";
      position: absolute;
      inset: 0;
      background: inherit;
      animation: inherit;
      --s: calc(50% - ${opts.size * 0.125}px);
      animation-direction: reverse;
    }
    .loader:after {
      --s: calc(${opts.size * 0.125}px - 50%);
    }
    @keyframes dotSwing {
      0% {transform: translate(var(--s, 0)) rotate(0)}
      100% {transform: translate(var(--s, 0)) rotate(1turn)}
    }
  `,
  },
  'Cross Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      display: grid;
      color: ${opts.primaryColor};
      background:
        linear-gradient(currentColor 0 0) center/100% ${opts.size * 0.05}px,
        linear-gradient(currentColor 0 0) center/${opts.size * 0.05}px 100%;
      background-repeat: no-repeat;
      animation: crossSpin ${opts.speed}s infinite;
    }
    .loader::before,
    .loader::after {
      content: "";
      grid-area: 1/1;
      background: repeating-conic-gradient(#0000 0 35deg,currentColor 0 90deg);
      -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - ${opts.size * 0.05}px),#000 0);
      border-radius: 50%;
    }
    .loader::after {
      margin:20%;
    }
    @keyframes crossSpin {
      100% { transform: rotate(1turn) }
    }
  `,
  },

  'Elastic Ring': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      border: ${opts.size * 0.12}px solid ${opts.primaryColor};
      animation: elasticRing ${opts.speed}s infinite ease-in-out;
    }

    @keyframes elasticRing {
      0%,100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(0.6) rotate(180deg); }
    }
  `,
  },

  'Inner Ring': {
    html: '<div class="loader"><div></div></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      border: ${opts.size * 0.12}px solid ${opts.primaryColor}40;
      position: relative;
      animation: rotateOuter ${opts.speed}s infinite linear;
    }

    .loader div {
      position: absolute;
      inset: ${opts.size * 0.15}px;
      border-radius: 50%;
      border: ${opts.size * 0.12}px solid ${opts.primaryColor};
      border-left-color: transparent;
      animation: rotateInner ${opts.speed * 1.4}s infinite linear reverse;
    }

    @keyframes rotateOuter { to { transform: rotate(360deg); } }
    @keyframes rotateInner { to { transform: rotate(360deg); } }
  `,
  },
  'Classic Border Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      position: relative;
      border-radius: 50%;
      box-sizing: border-box;
      border: ${opts.size * 0.12}px solid ${opts.primaryColor}; /* full ring */
    }

    .loader::before {
      content: "";
      position: absolute;
      inset: -${opts.size * 0.12}px; /* push outward to sit OVER ring */
      border-radius: 50%;
      border: ${opts.size * 0.12}px solid #0000;
      border-top-color: ${opts.secondaryColor}; /* visible rotating arc */
      animation: spinArc ${opts.speed}s linear infinite;
    }

    @keyframes spinArc {
      to { transform: rotate(360deg); }
    }
  `,
  },
  'Inner Dot Ring Spin': {
    html: '<div class="loader"></div>',
    css: (opts) => `
    .loader {
      width: ${opts.size}px;
      height: ${opts.size}px;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      border: ${opts.size * 0.04}px solid ${opts.primaryColor}; /* outer ring */
      box-sizing: border-box;
      animation: rotation ${opts.speed}s linear infinite;
    }

    .loader::after {
      content: '';  
      box-sizing: border-box;
      position: absolute;
      left: ${opts.size * 0.083}px;
      top: ${opts.size * 0.083}px;
      border: ${opts.size * 0.04}px solid ${opts.secondaryColor}; /* inner circle */
      width: ${opts.size * 0.25}px;
      height: ${opts.size * 0.25}px;
      border-radius: 50%;
    }

    @keyframes rotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
  },




















  // ... Add the remaining spinners here following the same pattern
  // For brevity, assume other spinners are converted similarly using ${opts.size}
};