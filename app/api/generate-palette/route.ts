// app/api/generate-palette/route.ts
import { NextResponse } from 'next/server';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-sonnet-20240229',
        messages: [
          {
            role: 'user',
            content: `PRECISE COLOR PALETTE GENERATION TASK:

REQUIREMENTS:
- Generate EXACTLY 5 unique hex color codes
- Colors must cohesively represent the theme: "${prompt}"
- Ensure colors are visually harmonious
- Return ONLY a valid JSON array of hex codes
- NO additional text or explanation allowed

OUTPUT FORMAT (STRICT):
["#RRGGBB","#RRGGBB","#RRGGBB","#RRGGBB","#RRGGBB"]

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

    // Extract and parse colors
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      return NextResponse.json(
        { error: 'No content in API response', data },
        { status: 500 }
      );
    }

    let colors: string[];
    try {
      // Multiple parsing strategies
      const jsonMatches = content.match(/\[(?:\s*"#[0-9A-Fa-f]{6}"\s*,?){5}\]/);
      
      if (jsonMatches) {
        colors = JSON.parse(jsonMatches[0]);
      } else {
        // Fallback parsing
        const colorCodes = content.match(/#[0-9A-Fa-f]{6}/g);
        if (colorCodes && colorCodes.length >= 5) {
          colors = colorCodes.slice(0, 5);
        } else {
          throw new Error('Could not extract color codes');
        }
      }

      // Validate colors
      if (!colors.every(color => /^#[0-9A-Fa-f]{6}$/.test(color))) {
        throw new Error('Invalid hex codes');
      }

    } catch (err) {
      console.error('Color Parsing Error:', err);
      return NextResponse.json(
        { 
          error: 'Failed to parse color palette', 
          raw: content,
          message: err instanceof Error ? err.message : 'Unknown error'
        },
        { status: 500 }
      );
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