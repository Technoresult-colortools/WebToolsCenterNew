// src/app/tools/css-loader-generator/data/pulses.ts
import { LoaderDef } from "./types";

export const pulses: Record<string, LoaderDef> = {
    'Pulse Circle': {
        html: '<div class="loader"></div>',
        css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size}px;
        background: ${opts.primaryColor};
        border-radius: 50%;
        animation: pulse-circle ${opts.speed}s ease-in-out infinite alternate;
      }
      @keyframes pulse-circle {
        from { transform: scale(1); opacity: 1; }
        to { transform: scale(1.5); opacity: 0; }
      }
    `,
    },
    'Expanding Ring': {
        html: '<div class="loader"></div>',
        css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size}px;
        border: ${Math.max(2, opts.size * 0.1)}px solid ${opts.primaryColor};
        border-radius: 50%;
        animation: expanding ${opts.speed * 1.5}s infinite;
      }
      @keyframes expanding {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(1.5); opacity: 0; }
      }
    `,
    },
    'Ripple Effect': {
        html: '<div class="loader"></div>',
        css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size}px;
        position: relative;
      }
      .loader::before,
      .loader::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: ${Math.max(2, opts.size * 0.06)}px solid ${opts.primaryColor};
        border-radius: 50%;
        animation: ripple ${opts.speed * 2}s linear infinite;
      }
      .loader::after {
        animation-delay: ${opts.speed}s;
      }
      @keyframes ripple {
        0% { transform: scale(0.1); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
      }
    `,
    },
    // ... Add remaining pulses
};