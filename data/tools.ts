import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFont,
  faImage,
  faPalette,
  faCode,
  faDroplet,
  faShare,
  faWrench,
  faEraser,
  faChartBar,
  faTextHeight,
  faScissors,
  faRandom,
  faCropAlt,
  faExpand,
  faEyeDropper,
  faShapes,
  faVectorSquare,
  faEyeSlash,
  faFileImage,
  faFileCode,
  faSpinner,
  faBrush,
  faBezierCurve,
  faGlassMartiniAlt,
  faDrawPolygon,
  faAlignJustify,
  faLink,
  faMobileAlt,
  faCompress,
  faFingerprint,
  faLock,
  faKey,
  faSitemap,
  faDatabase,
  faQrcode,
  faBarcode,
  faExchangeAlt,
  faDesktop,
  faHashtag,
  faPrint,
  faSliders,
  faSun,
  faTag,
  faMicrochip,
  faSignature
} from '@fortawesome/free-solid-svg-icons';
import {
  faGlide,
  faInstagram,
  faMarkdown,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export interface Tool {
  name: string
  category: string
  href: string
  icon: IconDefinition
  description: string
  iconColor: string
}

export interface Category {
  name: string
  icon: IconDefinition
  gradient: string

}

export interface ToolPageProps {
  toolId: string
}

export const categories: Category[] = [
  {
    name: "Text",
    icon: faFont,
    gradient: ""

  },
  {
    name: "Image",
    icon: faImage,
    gradient: "",

  },
  {
    name: "CSS",
    icon: faPalette,
    gradient: "",

  },
  {
    name: "Coding",
    icon: faCode,
    gradient: "",

  },
  {
    name: "Color",
    icon: faDroplet,
    gradient: "",

  },
  {
    name: "Social Media",
    icon: faShare,
    gradient: "",
  
  },
  {
    name: "Misc",
    icon: faWrench,
    gradient: "",

  },
]

export const allTools: Tool[] = [
  // Text Tools
  {
    name: "Case Converter",
    category: "Text",
    href: "/tools/text/case-converter",
    icon: faFont,
    description: "Convert Text Tools to different cases.",
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "Letter Counter",
    category: "Text",
    href: "/tools/text/letter-counter",
    icon: faFont,
    description: "Count the number of letters in Text Tools.",
    iconColor: "text-blue-600 dark:text-blue-500",
  },
  {
    name: "Lorem Ipsum Generator",
    category: "Text",
    href: "/tools/text/lorem-ipsum-generator",
    icon: faFont,
    description: "Generate placeholder Text Tools.",
    iconColor: "text-blue-700 dark:text-blue-600",
  },
  {
    name: "Words Counter",
    category: "Text",
    href: "/tools/text/words-counter",
    icon: faFont,
    description: "Count the number of words in Text Tools.",
    iconColor: "text-blue-800 dark:text-blue-700",
  },
  {
    name: "Whitespace Remover",
    category: "Text",
    href: "/tools/text/whitespace-remover",
    icon: faEraser,
    description: "Remove unnecessary whitespace from Text Tools.",
    iconColor: "text-blue-900 dark:text-blue-800",
  },
  {
    name: "Google Fonts Pair Finder",
    category: "Text",
    href: "/tools/text/google-fonts-pair-finder",
    icon: faFont,
    description: "Find and pair Google Fonts.",
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "Text Reverser",
    category: "Text",
    href: "/tools/text/text-reverser",
    icon: faFont,
    description: "Reverse any string of Text Tools.",
    iconColor: "text-blue-600 dark:text-blue-500",
  },
  {
    name: "Character Frequency Counter",
    category: "Text",
    href: "/tools/text/character-frequency-counter",
    icon: faChartBar,
    description: "Analyze character frequency in Text Tools.",
    iconColor: "text-blue-700 dark:text-blue-600",
  },
  {
    name: "Text to ASCII/Hex/Binary Converter",
    category: "Text",
    href: "/tools/text/text-to-ascii-hex-binary",
    icon: faCode,
    description: "Convert Text Tools to ASCII, Hex, or Binary.",
    iconColor: "text-blue-800 dark:text-blue-700",
  },
  {
    name: "Title Case Converter",
    category: "Text Tools",
    href: "/tools/text/title-case-converter",
    icon: faTextHeight,
    description: "Convert Text Tools to title case.",
    iconColor: "text-blue-900 dark:text-blue-800",
  },
  {
    name: "Duplicate Line Remover",
    category: "Text",
    href: "/tools/text/duplicate-line-remover",
    icon: faScissors,
    description: "Remove duplicate lines in Text Tools.",
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "HTML Encoder&Decoder",
    category: "Text",
    href: "/tools/text/html-encoder-decoder",
    icon: faCode,
    description: "Encode or decode HTML entities.",
    iconColor: "text-blue-600 dark:text-blue-500",
  },
  {
    name: "Markdown to HTML Converter",
    category: "Text",
    href: "/tools/text/markdown-to-html",
    icon: faMarkdown,
    description: "Convert Markdown to HTML.",
    iconColor: "text-blue-700 dark:text-blue-600",
  },
  {
    name: "Word Scrambler",
    category: "Text",
    href: "/tools/text/word-scrambler",
    icon: faRandom,
    description: "Scramble words in Text Tools.",
    iconColor: "text-blue-800 dark:text-blue-700",
  },
  {
    name: "Text to Handwriting Converter",
    category: "Text",
    href: "/tools/text/text-to-handwriting",
    icon: faSignature,
    description: "Transform your Text Tools into handwritten notes with customizable styles.",
    iconColor: "text-blue-900 dark:text-blue-800",
  },

  // Image Tools
  {
    name: "Image Cropper",
    category: "Image Tools",
    href: "/tools/image/image-cropper",
    icon: faCropAlt,
    description: "Crop and resize images online.",
    iconColor: "text-purple-500 dark:text-purple-400",
  },
  {
    name: "Image Filters",
    category: "Image",
    href: "/tools/image/image-filters",
    icon: faImage,
    description: "Apply filters to your images.",
    iconColor: "text-purple-600 dark:text-purple-500",
  },
  {
    name: "Image Resizer",
    category: "Image",
    href: "/tools/image/image-resizer",
    icon: faExpand,
    description: "Resize images to specific dimensions.",
    iconColor: "text-purple-700 dark:text-purple-600",
  },
  {
    name: "Image Average Color Finder",
    category: "Image",
    href: "/tools/image/image-average-color-finder",
    icon: faPalette,
    description: "Find the average color of an image.",
    iconColor: "text-purple-800 dark:text-purple-700",
  },
  {
    name: "Image Color Extractor Tool",
    category: "Image",
    href: "/tools/image/image-color-extractor",
    icon: faEyeDropper,
    description: "Extract colors from an image.",
    iconColor: "text-purple-900 dark:text-purple-800",
  },
  {
    name: "Image Color Picker Tool",
    category: "Image",
    href: "/tools/image/image-color-picker",
    icon: faPalette,
    description: "Pick colors from images.",
    iconColor: "text-purple-500 dark:text-purple-400",
  },
  {
    name: "SVG Blob Generator",
    category: "Image",
    href: "/tools/image/svg-blob-generator",
    icon: faShapes,
    description: "Generate random SVG blobs.",
    iconColor: "text-purple-600 dark:text-purple-500",
  },
  {
    name: "SVG Pattern Generator",
    category: "Image",
    href: "/tools/image/svg-pattern-generator",
    icon: faVectorSquare,
    description: "Generate SVG patterns.",
    iconColor: "text-purple-700 dark:text-purple-600",
  },
  {
    name: "Photo Censor",
    category: "Image",
    href: "/tools/image/photo-censor",
    icon: faEyeSlash,
    description: "Blur or censor parts of a photo.",
    iconColor: "text-purple-800 dark:text-purple-700",
  },
  {
    name: "SVG to PNG Converter",
    category: "Image",
    href: "/tools/image/svg-to-png-converter",
    icon: faFileImage,
    description: "Convert SVG images to PNG format.",
    iconColor: "text-purple-900 dark:text-purple-800",
  },
  {
    name: "PNG to SVG Converter",
    category: "Image",
    href: "/tools/image/png-to-svg-converter",
    icon: faFileImage,
    description: "Convert PNG images to SVG format.",
    iconColor: "text-purple-500 dark:text-purple-400",
  },
  {
    name: "Image to Base64 Converter",
    category: "Image",
    href: "/tools/image/image-to-base64-converter",
    icon: faFileCode,
    description: "Convert images to Base64 format.",
    iconColor: "text-purple-600 dark:text-purple-500",
  },
  {
    name: "Base64 to Image Converter",
    category: "Image",
    href: "/tools/image/base64-to-image-converter",
    icon: faFileCode,
    description: "Convert Base64 to Image format.",
    iconColor: "text-purple-600 dark:text-purple-500",
  },

// CSS Tools
{
  name: "CSS Clip Path Generator",
  category: "CSS",
  href: "/tools/css/clip-path-generator",
  icon: faScissors,
  description: "Create CSS clip paths.",
  iconColor: "text-green-500 dark:text-green-400",
},
{
  name: "CSS Loader Generator",
  category: "CSS",
  href: "/tools/css/loader-generator",
  icon: faSpinner,
  description: "Generate custom CSS loaders.",
  iconColor: "text-green-600 dark:text-green-500",
},
{
  name: "CSS Background Pattern Generator",
  category: "CSS",
  href: "/tools/css/background-pattern-generator",
  icon: faBrush,
  description: "Generate CSS background patterns.",
  iconColor: "text-green-700 dark:text-green-600",
},
{
  name: "CSS Cubic Bezier Generator",
  category: "CSS",
  href: "/tools/css/cubic-bezier-generator",
  icon: faBezierCurve,
  description: "Create cubic-bezier timing functions.",
  iconColor: "text-green-800 dark:text-green-700",
},
{
  name: "CSS Glassmorphism Generator",
  category: "CSS",
  href: "/tools/css/glassmorphism-generator",
  icon: faGlassMartiniAlt,
  description: "Generate CSS glassmorphism effects.",
  iconColor: "text-green-900 dark:text-green-800",
},
{
  name: "CSS Text Glitch Effect Generator",
  category: "CSS",
  href: "/tools/css/text-glitch-effect-generator",
  icon: faGlide,
  description: "Generate glitch Text Tools effects with CSS.",
  iconColor: "text-green-500 dark:text-green-400",
},
{
  name: "CSS Triangle Generator",
  category: "CSS",
  href: "/tools/css/triangle-generator",
  icon: faDrawPolygon,
  description: "Generate CSS triangles.",
  iconColor: "text-green-600 dark:text-green-500",
},
{
  name: "CSS Box Shadow Generator",
  category: "CSS",
  href: "/tools/css/box-shadow-generator",
  icon: faPalette,
  description: "Generate CSS box shadows.",
  iconColor: "text-green-700 dark:text-green-600",
},
{
  name: "CSS Border Radius Generator",
  category: "CSS",
  href: "/tools/css/border-radius-generator",
  icon: faShapes,
  description: "Create CSS border-radius shapes.",
  iconColor: "text-green-800 dark:text-green-700",
},
{
  name: "CSS Flexbox Generator",
  category: "CSS",
  href: "/tools/css/flexbox-generator",
  icon: faAlignJustify,
  description: "Create CSS Flexbox layouts.",
  iconColor: "text-green-900 dark:text-green-800",
},
{
  name: "CSS Gradient Generator",
  category: "CSS",
  href: "/tools/css/gradient-generator",
  icon: faPalette,
  description: "Easily create and customize beautiful linear and radial gradients.",
  iconColor: "text-green-500 dark:text-green-400",
},


  // Color Tools
  // Color Tools
{
  name: "Image Color Picker",
  category: "Color",
  href: "/tools/color/image-color-picker",
  icon: faEyeDropper,
  description: "Pick any color from an image with ease.",
  iconColor: "text-blue-500 dark:text-blue-400",
},
{
  name: "Image Color Extractor",
  category: "Color",
  href: "/tools/color/image-color-extractor",
  icon: faImage,
  description: "Extract the most dominant colors from any image.",
  iconColor: "text-blue-600 dark:text-blue-500",
},
{
  name: "Hex to RGBA Converter",
  category: "Color",
  href: "/tools/color/hex-to-rgba",
  icon: faHashtag,
  description: "Convert Hex color codes to RGBA format quickly.",
  iconColor: "text-blue-700 dark:text-blue-600",
},
{
  name: "RGBA to Hex Converter",
  category: "Color",
  href: "/tools/color/rgba-to-hex",
  icon: faHashtag,
  description: "Convert RGBA values to Hex color codes effortlessly.",
  iconColor: "text-blue-800 dark:text-blue-700",
},
{
  name: "HSV to RGB Converter",
  category: "Color",
  href: "/tools/color/hsv-to-rgb",
  icon: faHashtag,
  description: "Easily convert HSV color format to RGB.",
  iconColor: "text-blue-900 dark:text-blue-800",
},
{
  name: "RGB to HSV Converter",
  category: "Color",
  href: "/tools/color/rgb-to-hsv",
  icon: faSliders,
  description: "Convert RGB colors to HSV format seamlessly.",
  iconColor: "text-indigo-500 dark:text-indigo-400",
},
{
  name: "CMYK to RGB Converter",
  category: "Color",
  href: "/tools/color/cmyk-to-rgb",
  icon: faPrint,
  description: "Convert CMYK values to RGB format with precision.",
  iconColor: "text-indigo-600 dark:text-indigo-500",
},
{
  name: "Color Mixer",
  category: "Color",
  href: "/tools/color/color-mixer",
  icon: faDroplet,
  description: "Mix multiple colors together and create new ones.",
  iconColor: "text-indigo-700 dark:text-indigo-600",
},
{
  name: "Color Shades Generator",
  category: "Color",
  href: "/tools/color/color-shades-generator",
  icon: faSun,
  description: "Generate multiple shades of any color.",
  iconColor: "text-indigo-800 dark:text-indigo-700",
},
{
  name: "RGB to CMYK Converter",
  category: "Color",
  href: "/tools/color/rgb-to-cmyk",
  icon: faPrint,
  description: "Easily convert RGB values to CMYK for printing needs.",
  iconColor: "text-indigo-900 dark:text-indigo-800",
},
{
  name: "HSL to RGB Converter",
  category: "Color",
  href: "/tools/color/hsl-to-rgb",
  icon: faSliders,
  description: "Convert HSL colors to RGB format with ease.",
  iconColor: "text-purple-500 dark:text-purple-400",
},
{
  name: "HSL to HEX Converter",
  category: "Color",
  href: "/tools/color/hsl-to-hex",
  icon: faHashtag,
  description: "Transform HSL colors into Hex color codes.",
  iconColor: "text-purple-600 dark:text-purple-500",
},
{
  name: "HSV to Hex Converter",
  category: "Color",
  href: "/tools/color/hsv-to-hex",
  icon: faHashtag,
  description: "Convert HSV color format into Hex codes quickly.",
  iconColor: "text-purple-700 dark:text-purple-600",
},
{
  name: "RGB to HSL Converter",
  category: "Color",
  href: "/tools/color/rgb-to-hsl",
  icon: faHashtag,
  description: "Convert RGB colors into HSL format effortlessly.",
  iconColor: "text-purple-800 dark:text-purple-700",
},
{
  name: "Color Name Generator",
  category: "Color",
  href: "/tools/color/color-name-generator",
  icon: faTag,
  description: "Generate names for custom colors based on RGB or Hex values.",
  iconColor: "text-purple-900 dark:text-purple-800",
},
{
  name: "Color Palette Generator",
  category: "Color",
  href: "/tools/color/color-palette-generator",
  icon: faMicrochip,
  description: "Create stunning color palettes for your designs.",
  iconColor: "text-pink-500 dark:text-pink-400",
},
{
  name: "Color Wheel",
  category: "Color",
  href: "/tools/color/color-wheel",
  icon: faPalette,
  description: "Visualize colors and find perfect combinations using the color wheel.",
  iconColor: "text-pink-600 dark:text-pink-500",
},
{
  name: "Gradient Generator",
  category: "Color",
  href: "/tools/color/color-gradient-generator",
  icon: faPalette,
  description: "Design beautiful gradients with custom colors and stops.",
  iconColor: "text-pink-700 dark:text-pink-600",
},
{
  name: "Tailwind CSS Color Palette",
  category: "Color",
  href: "/tools/color/tailwind-color-generator",
  icon: faPalette,
  description: "Convert TailWind CSS to Hex, Generate TailWind Colors.",
  iconColor: "text-pink-800 dark:text-pink-700",
},
{
  name: "Color Converter",
  category: "Color",
  href: "/tools/color/color-converter",
  icon: faPalette,
  description: "Convert color codes from Hex to RGBA, HSL, HSV, RGB and vice versa.",
  iconColor: "text-pink-900 dark:text-pink-800",
},


  // Coding Tools
 // Coding Tools
{
  name: 'Code to Image Converter',
  category: 'Coding',
  href: '/tools/coding/code-to-image-converter',
  icon: faFileImage,
  description: 'Convert code snippets into beautiful images.',
  iconColor: 'text-blue-500 dark:text-blue-400',
},
{
  name: 'URL Slug Generator',
  category: 'Coding',
  href: '/tools/coding/url-slug-generator',
  icon: faLink,
  description: 'Generate URL-friendly slugs.',
  iconColor: 'text-blue-600 dark:text-blue-500',
},
{
  name: 'React Native Shadow Generator',
  category: 'Coding',
  href: '/tools/coding/react-native-shadow-generator',
  icon: faMobileAlt,
  description: 'Generate shadow for React Native components.',
  iconColor: 'text-blue-700 dark:text-blue-600',
},
{
  name: 'Base64 Encoder/Decoder',
  category: 'Coding',
  href: '/tools/coding/base64-encoder-decoder',
  icon: faCode,
  description: 'Encode or decode Base64 strings.',
  iconColor: 'text-blue-800 dark:text-blue-700',
},
{
  name: 'HTML Encoder/Decoder',
  category: 'Coding',
  href: '/tools/coding/html-encoder-decoder',
  icon: faCode,
  description: 'Encode or decode HTML entities.',
  iconColor: 'text-blue-900 dark:text-blue-800',
},
{
  name: 'URL Encoder/Decoder',
  category: 'Coding',
  href: '/tools/coding/url-encoder-decoder',
  icon: faCode,
  description: 'Encode or decode URLs.',
  iconColor: 'text-indigo-500 dark:text-indigo-400',
},
{
  name: 'HTML Minifier',
  category: 'Coding',
  href: '/tools/coding/html-minifier',
  icon: faCompress,
  description: 'Minify HTML code for performance.',
  iconColor: 'text-indigo-600 dark:text-indigo-500',
},
{
  name: 'CSS Minifier',
  category: 'Coding',
  href: '/tools/coding/css-minifier',
  icon: faCompress,
  description: 'Minify CSS code for better efficiency.',
  iconColor: 'text-indigo-700 dark:text-indigo-600',
},
{
  name: 'JavaScript Minifier',
  category: 'Coding',
  href: '/tools/coding/javascript-minifier',
  icon: faCompress,
  description: 'Minify JavaScript code for optimization.',
  iconColor: 'text-indigo-800 dark:text-indigo-700',
},
{
  name: 'HTML Formatter',
  category: 'Coding',
  href: '/tools/coding/html-formatter',
  icon: faFileCode,
  description: 'Format and beautify HTML code.',
  iconColor: 'text-indigo-900 dark:text-indigo-800',
},
{
  name: 'CSS Formatter',
  category: 'Coding',
  href: '/tools/coding/css-formatter',
  icon: faFileCode,
  description: 'Format and beautify CSS code.',
  iconColor: 'text-purple-500 dark:text-purple-400',
},
{
  name: 'JavaScript Formatter',
  category: 'Coding',
  href: '/tools/coding/javascript-formatter',
  icon: faFileCode,
  description: 'Format and beautify JavaScript code.',
  iconColor: 'text-purple-600 dark:text-purple-500',
},
{
  name: 'MD5 Generator and Verifier',
  category: 'Coding',
  href: '/tools/coding/md5-encrypt-verify',
  icon: faFingerprint,
  description: 'Generate and verify MD5 hashes.',
  iconColor: 'text-purple-700 dark:text-purple-600',
},
{
  name: 'SHA1 Encrypt and Verifier',
  category: 'Coding',
  href: '/tools/coding/sha1-encrypt-verify',
  icon: faLock,
  description: 'Encrypt and verify SHA-1 hashes.',
  iconColor: 'text-purple-800 dark:text-purple-700',
},
{
  name: 'SHA224 Encrypt and Verifier',
  category: 'Coding',
  href: '/tools/coding/sha224-encrypt-verify',
  icon: faLock,
  description: 'Encrypt and verify SHA-224 hashes.',
  iconColor: 'text-purple-900 dark:text-purple-800',
},
{
  name: 'SHA256 Encrypt and Verifier',
  category: 'Coding',
  href: '/tools/coding/sha256-encrypt-verify',
  icon: faLock,
  description: 'Encrypt and verify SHA-256 hashes.',
  iconColor: 'text-pink-500 dark:text-pink-400',
},
{
  name: 'SHA384 Encrypt and Verifier',
  category: 'Coding',
  href: '/tools/coding/sha384-encrypt-verify',
  icon: faLock,
  description: 'Encrypt and verify SHA-384 hashes.',
  iconColor: 'text-pink-600 dark:text-pink-500',
},
{
  name: 'SHA512 Encrypt and Verifier',
  category: 'Coding',
  href: '/tools/coding/sha512-encrypt-verify',
  icon: faLock,
  description: 'Encrypt and verify SHA-512 hashes.',
  iconColor: 'text-pink-700 dark:text-pink-600',
},
{
  name: 'JWT Encoder/Decoder',
  category: 'Coding',
  href: '/tools/coding/jwt-encoder-decoder',
  icon: faKey,
  description: 'Encode or decode JWT tokens.',
  iconColor: 'text-pink-800 dark:text-pink-700',
},
{
  name: 'Advance JSON Tree Viewer',
  category: 'Coding',
  href: '/tools/coding/json-tree-viewer',
  icon: faSitemap,
  description: 'View JSON data as an interactive tree.',
  iconColor: 'text-pink-900 dark:text-pink-800',
},
{
  name: 'JSON Validator and Formatter',
  category: 'Coding',
  href: '/tools/coding/json-validator',
  icon: faDatabase,
  description: 'Validate, format, and manipulate JSON with ease.',
  iconColor: 'text-red-500 dark:text-red-400',
},


  // Miscellaneous Tools
  // Misc Tools
{
  name: 'Advance Password Generator',
  category: 'Misc',
  href: '/tools/misc/advance-password-generator',
  icon: faLock,
  description: 'Generate advanced and secure passwords.',
  iconColor: 'text-gray-500 dark:text-gray-400',
},
{
  name: 'List Randomizer',
  category: 'Misc',
  href: '/tools/misc/list-randomizer',
  icon: faRandom,
  description: 'Randomize list items with various methods.',
  iconColor: 'text-gray-600 dark:text-gray-500',
},
{
  name: 'QR Code Generator',
  category: 'Misc',
  href: '/tools/misc/qr-code-generator',
  icon: faQrcode,
  description: 'Generate custom QR codes.',
  iconColor: 'text-gray-700 dark:text-gray-600',
},
{
  name: 'BarCode Generator',
  category: 'Misc',
  href: '/tools/misc/barcode-generator',
  icon: faBarcode,
  description: 'Generate custom barcodes.',
  iconColor: 'text-gray-800 dark:text-gray-700',
},
{
  name: 'Unit Converter',
  category: 'Misc',
  href: '/tools/misc/unit-converter',
  icon: faExchangeAlt,
  description: 'Convert between different units of measurement.',
  iconColor: 'text-gray-900 dark:text-gray-800',
},
{
  name: 'Screen Resolution Checker',
  category: 'Misc',
  href: '/tools/misc/screen-resolution-checker',
  icon: faDesktop,
  description: 'Analyze your screen properties and display capabilities.',
  iconColor: 'text-teal-500 dark:text-teal-400',
},

// Social Media Tools
{
  name: 'Instagram Filters',
  category: 'Social Media',
  href: '/tools/social-media/instagram-filters',
  icon: faInstagram,
  description: 'Apply filters to Instagram images.',
  iconColor: 'text-pink-500 dark:text-pink-400',
},

/*{
  name: 'Instagram Post Generator',
  category: 'Social Media',
  href: '/tools/social-media/instagram-post-generator',
  icon: faInstagram,
  description: 'Generate Instagram posts with customizable templates.',
  iconColor: 'text-pink-600 dark:text-pink-500',
},
{
  name: 'Instagram Photo Downloader',
  category: 'Social Media',
  href: '/tools/social-media/instagram-photo-downloader',
  icon: faInstagram,
  description: 'Download photos from Instagram.',
  iconColor: 'text-pink-700 dark:text-pink-600',
},
{
  name: 'Tweet Generator',
  category: 'Social Media',
  href: '/tools/social-media/tweet-generator',
  icon: faTwitter,
  description: 'Generate tweet mockups for sharing.',
  iconColor: 'text-blue-500 dark:text-blue-400',
},
{
  name: 'Tweet to Image Converter',
  category: 'Social Media',
  href: '/tools/social-media/tweet-to-image-converter',
  icon: faTwitter,
  description: 'Convert tweets to images for social media.',
  iconColor: 'text-blue-600 dark:text-blue-500',
},*/
{
  name: 'YouTube Thumbnail Downloader',
  category: 'Social Media',
  href: '/tools/social-media/youtube-thumbnail-downloader',
  icon: faYoutube,
  description: 'Download thumbnails from YouTube videos.',
  iconColor: 'text-red-500 dark:text-red-400',
},
{
  name: 'YouTube KeyWord Tag Extractor',
  category: 'Social Media',
  href: '/tools/social-media/youtube-tag-extractor',
  icon: faHashtag,
  description: 'Extract keyword tags from any YouTube video.',
  iconColor: 'text-yellow-500 dark:text-yellow-400',
},
{
  name: 'YouTube Metadata Extractor',
  category: 'Social Media',
  href: '/tools/social-media/youtube-metadata-extractor',
  icon: faHashtag,
  description: 'Extract comprehensive metadata from any YouTube video.',
  iconColor: 'text-yellow-600 dark:text-yellow-500',
},
{
  name: 'YouTube Region Restriction Finder',
  category: 'Social Media',
  href: '/tools/social-media/youtube-region-restriction-finder',
  icon: faHashtag,
  description: 'Check the availability of a YouTube video across different regions.',
  iconColor: 'text-yellow-700 dark:text-yellow-600',
},
{
  name: 'Open Graph Meta Generator',
  category: 'Social Media',
  href: '/tools/social-media/open-graph-meta-generator',
  icon: faShare,
  description: 'Generate Open Graph meta tags for your website to control how your content appears when shared on social media.',
  iconColor: 'text-blue-700 dark:text-blue-600',
}

];

export const toolsByCategory = categories.reduce((acc, category) => {
  acc[category.name] = allTools.filter((tool) => tool.category === category.name);
  return acc;
}, {} as Record<string, Tool[]>);

export function getCategoryTools(categoryName: string) {
  return toolsByCategory[categoryName] || [];
}

