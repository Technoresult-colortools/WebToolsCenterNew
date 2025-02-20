export interface PatternControl {
  id: string;
  label: string;
  type: "slider" | "color";
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
  unit?: string;
  showFor?: string[];
}

export interface Pattern {
  css: string;
  icon: string;
  hasLineWidth?: boolean;
  hasDotSize?: boolean;
}

export interface ColorPalette {
  name: string;
  colors: string[];
  description: string;
  tags?: string[];
}

export type ShapesData = {
  [key: string]: {
    [key: string]: Pattern;
  };
};