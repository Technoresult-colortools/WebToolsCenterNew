// src/app/tools/css-loader-generator/data/types.ts

export interface CustomizationOptions {
    size: number;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    speed: number;
}

export interface LoaderDef {
    html: string;
    // CSS is now a function that returns a string
    css: (options: CustomizationOptions) => string;
}

// Add this alias so 'LoaderData' works in your index.ts and other files
export type LoaderData = LoaderDef;

export type LoaderCategories = {
    [category: string]: {
        [type: string]: LoaderDef;
    };
};