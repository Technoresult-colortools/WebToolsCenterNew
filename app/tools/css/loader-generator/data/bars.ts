// src/app/tools/css-loader-generator/data/bars.ts
import { LoaderDef } from "./types";

export const bars: Record<string, LoaderDef> = {
    'Progress Bar': {
        html: '<div class="loader"></div>',
        css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size * 0.1}px;
        background: #e5e7eb;
        border-radius: ${opts.size * 0.05}px;
        overflow: hidden;
      }
      .loader::before {
        content: '';
        display: block;
        width: 50%;
        height: 100%;
        background: ${opts.primaryColor};
        animation: load ${opts.speed}s infinite;
      }
      @keyframes load {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `,
    },
    'Equalizer Bars': {
        html: '<div class="loader"><div></div><div></div><div></div></div>',
        css: (opts) => `
      .loader {
        display: flex;
        align-items: flex-end;
        gap: ${opts.size * 0.06}px;
        width: ${opts.size}px;
        height: ${opts.size * 0.33}px;
      }
      .loader div {
        width: ${opts.size * 0.13}px;
        height: 100%;
        background: ${opts.primaryColor};
        animation: equalizer ${opts.speed}s ease-in-out infinite alternate;
      }
      .loader div:nth-child(2) { animation-delay: ${opts.speed * 0.2}s; }
      .loader div:nth-child(3) { animation-delay: ${opts.speed * 0.4}s; }
      @keyframes equalizer {
        from { transform: scaleY(0.2); }
        to { transform: scaleY(1); }
      }
    `,
    },
    'Sliding Bar': {
        html: '<div class="loader"></div>',
        css: (opts) => `
      .loader {
        width: ${opts.size}px;
        height: ${opts.size * 0.1}px;
        background: #e5e7eb;
        border-radius: ${opts.size * 0.05}px;
        overflow: hidden;
        position: relative;
      }
      .loader::after {
        content: '';
        width: 30%;
        height: 100%;
        background: ${opts.primaryColor};
        position: absolute;
        top: 0;
        left: 0;
        animation: slide ${opts.speed}s infinite ease-in-out alternate;
      }
      @keyframes slide {
        to { transform: translateX(233%); }
      }
    `,
    },
    // ... Add remaining bars
};