// src/app/tools/css-loader-generator/data/index.ts

import { spinners } from "./spinners";
import { dots } from "./dots"
import { bars } from "./bars";
import { pulses } from "./pulses";
import { LoaderCategories, LoaderData } from "./types"; // Adjust import if you renamed types

export const loaderCategories: LoaderCategories = {
    Spinners: spinners,
    Dots: dots,
    Bars: bars,
    Pulses: pulses,
};

// --- Helper Functions ---

export const isValidCategory = (categories: LoaderCategories, category: string): boolean => {
    return Boolean(categories[category]);
};

export const isValidLoader = (
    categories: LoaderCategories,
    category: string,
    loaderType: string
): boolean => {
    return Boolean(categories[category]?.[loaderType]);
};

export const getDefaultCategory = (categories: LoaderCategories): string => {
    const firstCategory = Object.keys(categories)[0];
    if (!firstCategory) {
        throw new Error('No loader categories available');
    }
    return firstCategory;
};

export const getDefaultLoader = (categories: LoaderCategories, category: string): string => {
    if (!categories[category]) {
        throw new Error(`Category "${category}" not found`);
    }
    const firstLoader = Object.keys(categories[category])[0];
    if (!firstLoader) {
        throw new Error(`No loaders found in category "${category}"`);
    }
    return firstLoader;
};

export const getLoaderData = (
    categories: LoaderCategories,
    category: string,
    loaderType: string
): LoaderData | null => { // Note: Return type is LoaderDef from types.ts really
    try {
        if (!isValidCategory(categories, category)) {
            console.error(`Invalid category: ${category}`);
            return null;
        }
        if (!isValidLoader(categories, category, loaderType)) {
            console.error(`Invalid loader type: ${loaderType} in category: ${category}`);
            return null;
        }
        // @ts-ignore - The structure matches but TS might complain about interface vs type alias
        return categories[category][loaderType];
    } catch (error) {
        console.error('Error getting loader data:', error);
        return null;
    }
};