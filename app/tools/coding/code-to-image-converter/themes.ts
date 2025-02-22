interface themes {
    value: string;
    label: string;
  }
  export const themes = [
    { value: "atomDark", label: "Atom Dark" },
    { value: "dracula", label: "Dracula" },
    { value: "solarizedlight", label: "Solarized Light" },
    { value: "ghcolors", label: "GitHub" },
    { value: "vscDarkPlus", label: "VS Code Dark+" },
    { value: "okaidia", label: "Okaidia" },
    { value: "coy", label: "Coy" },
    { value: "funky", label: "Funky" },
    { value: "twilight", label: "Twilight" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "synthwave84", label: "Synthwave 84" },
    { value: "coldarkCold", label: "Coldark Cold" },
    { value: "nightOwl", label: "Night Owl" },
    { value: "materialLight", label: "Material Light" },
    { value: "nord", label: "Nord" },
  
    // Mapped to available themes
    { value: "xcode", label: "XCode (Light)" },  // ✅ Exists
    { value: "vs", label: "Visual Studio 2015 (Dark)" }, // ✅ Exists as "vs"
    { value: "vscLightPlus", label: "Visual Studio (Light)" }, // ✅ Exists as "vscLightPlus"
    { value: "tomorrowNightBright", label: "Tomorrow Night Bright (Dark)" }, // ✅ Exists

  ];