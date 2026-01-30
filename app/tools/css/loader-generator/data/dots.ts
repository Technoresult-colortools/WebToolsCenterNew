// src/app/tools/css-loader-generator/data/dots.ts
import { LoaderDef } from "./types";

export const dots: Record<string, LoaderDef> = {
    'Triple Dots': {
        html: '<div class="loader"><div></div></div>',
        css: (opts) => `
      .loader {
        width: ${opts.size}px;
        display: flex;
        justify-content: space-between;
      }
      .loader::after,
      .loader::before,
      .loader div {
        content: '';
        display: inline-block;
        width: ${opts.size * 0.2}px;
        height: ${opts.size * 0.2}px;
        border-radius: 50%;
        background: ${opts.primaryColor};
        animation: bounce ${opts.speed}s ease-in-out infinite;
      }
      .loader::before {
        animation-delay: -0.16s;
      }
      .loader div {
        animation-delay: 0s;
      }
      .loader::after {
        animation-delay: 0.16s;
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-${opts.size * 0.25}px); }
      }
    `,
    },
    'Pulsing Dots': {
        html: '<div class="loader"><div></div><div></div><div></div></div>',
        css: (opts) => `
      .loader {
        display: flex;
        gap: ${opts.size * 0.15}px;
      }
      .loader div {
        width: ${opts.size * 0.3}px;
        height: ${opts.size * 0.3}px;
        border-radius: 50%;
        background: ${opts.primaryColor};
        animation: pulse ${opts.speed * 0.6}s infinite alternate;
      }
      .loader div:nth-child(2) {
        animation-delay: ${opts.speed * 0.2}s;
      }
      .loader div:nth-child(3) {
        animation-delay: ${opts.speed * 0.4}s;
      }
      @keyframes pulse {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0.3; transform: scale(0.8); }
      }
    `,
    },
    'Pulse Spinner': {
        html: '<div class="loader"></div>',
        css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size}px;
        background-color: ${opts.primaryColor};
        border-radius: 50%;
        display: inline-block;
        animation: pulse ${opts.speed}s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      }
      @keyframes pulse {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
      }
    `,
    },
    'Fading Dots': {
        html: '<div class="loader"><div></div><div></div><div></div></div>',
        css: (opts) => `
      .loader {
        display: flex;
        gap: ${opts.size * 0.2}px;
      }
      .loader div {
        width: ${opts.size * 0.2}px;
        height: ${opts.size * 0.2}px;
        border-radius: 50%;
        background: ${opts.primaryColor};
        animation: fade ${opts.speed}s infinite both;
      }
      .loader div:nth-child(2) {
        animation-delay: ${opts.speed * 0.2}s;
      }
      .loader div:nth-child(3) {
        animation-delay: ${opts.speed * 0.4}s;
      }
      @keyframes fade {
        0%, 39%, 100% { opacity: 0.3; }
        40% { opacity: 1; }
      }
    `,
    },
    // ... Continue adding other Dot loaders
};