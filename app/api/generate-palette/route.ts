import { NextResponse } from 'next/server';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Sanitizes a hex color code by replacing any invalid characters
 */
function sanitizeHexCode(code: string): string {
  // Ensure it starts with #
  if (!code.startsWith('#')) {
    code = '#' + code;
  }
  
  // Replace any non-hex characters with '0'
  const sanitized = '#' + code.substring(1).replace(/[^0-9A-Fa-f]/gi, '0');
  
  // Ensure it's exactly 7 characters (#RRGGBB)
  if (sanitized.length < 7) {
    return sanitized.padEnd(7, '0');
  }
  
  // If too long, truncate to proper length
  return sanitized.substring(0, 7);
}

/**
 * Generates a random hex color code as fallback
 */
function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    console.log('Sending request with prompt:', prompt);
    console.log('API Key present:', !!OPENROUTER_API_KEY);
    
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key is missing' },
        { status: 500 }
      );
    }

    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a precise color palette generator that returns ONLY a JSON array of hex codes.'
          },
          {
            role: 'user',
            content: `Generate EXACTLY 5 hex color codes for: ${prompt}

STRICT REQUIREMENTS:
- Return ONLY a valid JSON array of 5 hex color codes
- Colors should cohesively represent the theme
- No additional text or explanation
- Ensure color harmony and visual appeal
- ONLY use valid hex characters (0-9, A-F)

FORMAT EXAMPLE: 
["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#533483"]

Theme to interpret: ${prompt}`,
          },
        ],
        max_tokens: 50,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API Error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to fetch from OpenRouter API', details: errorText },
        { status: 500 }
      );
    }

    // Parse the API response
    const data = await response.json();
    console.log('OpenRouter Response:', JSON.stringify(data, null, 2));

    // Extract content
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      return NextResponse.json(
        { error: 'No content in API response', data },
        { status: 500 }
      );
    }

    let colors: string[];
    try {
      // First attempt: Try to find and parse a JSON array
      const jsonMatches = content.match(/\[(?:\s*"#[0-9A-Za-z]{3,6}"\s*,?){5}\]/);
      
      if (jsonMatches) {
        // Parse the JSON array and sanitize each color
        const rawColors = JSON.parse(jsonMatches[0]);
        colors = rawColors.map((color: string) => {
          // Check if it's already a valid hex code
          if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
            return color;
          }
          // If not, sanitize it
          const sanitized = sanitizeHexCode(color);
          // If sanitizing didn't produce a valid code, generate a fallback
          return /^#[0-9A-Fa-f]{6}$/.test(sanitized) ? sanitized : generateRandomColor();
        });
      } else {
        // Second attempt: Try to extract hex-like codes directly
        const colorCodes = content.match(/#[0-9A-Za-z]{3,6}/g);
        if (colorCodes && colorCodes.length >= 5) {
          // Sanitize each extracted code
          colors = colorCodes.slice(0, 5).map((color: string) => {
            const sanitized = sanitizeHexCode(color);
            return /^#[0-9A-Fa-f]{6}$/.test(sanitized) ? sanitized : generateRandomColor();
          });
        } else {
          // Third attempt: Look for anything that might be a color and sanitize it
          const possibleCodes = content.match(/[#]?[0-9A-Za-z]{3,6}/g);
          if (possibleCodes && possibleCodes.length >= 5) {
            colors = possibleCodes.slice(0, 5).map((color: string) => {
              // Ensure it starts with #
              if (!color.startsWith('#')) color = '#' + color;
              const sanitized = sanitizeHexCode(color);
              return sanitized;
            });
          } else {
            // Last resort: If we can't extract any codes, generate random ones
            colors = Array(5).fill(0).map(() => generateRandomColor());
          }
        }
      }

      // Final validation to ensure all colors are proper hex codes
      colors = colors.map(color => {
        return /^#[0-9A-Fa-f]{6}$/.test(color) ? color : generateRandomColor();
      });

    } catch (err) {
      console.error('Color Parsing Error:', err);
      // Generate random colors as a fallback
      colors = Array(5).fill(0).map(() => generateRandomColor());
    }

    return NextResponse.json({ colors });
  } catch (error) {
    console.error('Error in Palette Generation:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate palette', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}