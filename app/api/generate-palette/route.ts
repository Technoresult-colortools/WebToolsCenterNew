import { NextResponse } from 'next/server';

const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1';
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY; // Set this in your .env file

function sanitizeHexCode(code: string): string {
  if (!code.startsWith('#')) {
    code = '#' + code;
  }
  const sanitized = '#' + code.substring(1).replace(/[^0-9A-Fa-f]/gi, '0');
  if (sanitized.length < 7) {
    return sanitized.padEnd(7, '0');
  }
  return sanitized.substring(0, 7);
}

function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!HF_API_KEY) {
      return NextResponse.json({ error: 'HuggingFace API key is missing' }, { status: 500 });
    }

    const hfResponse = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `<s>[INST] 
You are a professional color palette designer with expertise in color theory and design psychology.

I need you to create a harmonious set of 5 hex color codes that perfectly capture the essence of: ${prompt}

The color palette should:
- Evoke the mood, feeling, or theme described
- Have good contrast while maintaining harmony
- Work well together in a design system
- Be visually appealing and unique

IMPORTANT: Return ONLY a valid JSON array of exactly 5 hex color codes with no additional text.
Example format: ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#533483"]
[/INST]</s>`,
        parameters: { 
          temperature: 0.75,  // Good balance of creativity and consistency
          max_new_tokens: 200,
          return_full_text: false,
          top_p: 0.9
        },
      }),
    });

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error('HuggingFace API Error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch from HuggingFace API', details: errorText }, { status: 500 });
    }

    const data = await hfResponse.json();
    
    // Log raw response for debugging
    console.log('Raw response from Mixtral:', JSON.stringify(data));
    
    // Extract the generated text from the model's response
    const content = data?.[0]?.generated_text || '';
    console.log('Generated content:', content);

    let colors: string[];
    try {
      // First strategy: look for a complete JSON array
      const jsonMatch = content.match(/\[\s*"#[0-9A-Fa-f]{6}"\s*(?:,\s*"#[0-9A-Fa-f]{6}"\s*){4}\]/);
      
      if (jsonMatch) {
        // Found a properly formatted JSON array
        colors = JSON.parse(jsonMatch[0]);
      } else {
        // Second strategy: try to parse the entire response as JSON
        try {
          const parsed = JSON.parse(content.trim());
          if (Array.isArray(parsed) && parsed.length >= 5 && 
              parsed.every(item => typeof item === 'string' && /^#[0-9A-Fa-f]{3,6}$/.test(item))) {
            colors = parsed.slice(0, 5);
          } else {
            throw new Error("Invalid JSON structure");
          }
        } catch {
          // Third strategy: extract any hex codes from the text
          const hexMatches = content.match(/#[0-9A-Fa-f]{3,6}/g);
          
          if (hexMatches && hexMatches.length >= 5) {
            colors = hexMatches.slice(0, 5);
          } else {
            console.log('No valid colors found, generating random ones');
            colors = Array(5).fill(0).map(() => generateRandomColor());
          }
        }
      }

      // Sanitize all colors to ensure they're valid and convert any 3-digit hex to 6-digit
      colors = colors.map(color => {
        // Convert 3-digit hex to 6-digit
        if (/^#[0-9A-Fa-f]{3}$/.test(color)) {
          return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
        }
        
        const sanitized = sanitizeHexCode(color);
        return /^#[0-9A-Fa-f]{6}$/.test(sanitized) ? sanitized : generateRandomColor();
      });
      
    } catch (err) {
      console.error('Color Parsing Error:', err);
      colors = Array(5).fill(0).map(() => generateRandomColor());
    }

    return NextResponse.json({ 
      colors,
      success: true,
      prompt: prompt
    });
  } catch (error) {
    console.error('Error in Palette Generation:', error);
    return NextResponse.json({ 
      error: 'Failed to generate palette', 
      details: error instanceof Error ? error.message : String(error),
      success: false 
    }, { status: 500 });
  }
}