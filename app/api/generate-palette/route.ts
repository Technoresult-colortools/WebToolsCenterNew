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
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'user',
            content: `Generate a color palette based on this description: "${prompt}". 
                      Return exactly 5 colors in a valid JSON array of hex codes (e.g., ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#533483"]). 
                      NO additional text, NO explanation, only the JSON array.`,
          },
        ],
        max_tokens: 300,
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

    // Ensure a valid response structure
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: 'Invalid response from model', data },
        { status: 500 }
      );
    }

    // Extract the first valid JSON array from the content
    let colors: string[];
    try {
      // Use regex to extract the first JSON array
      const arrayMatch = content.match(/\[\s*"#[A-Fa-f0-9]{6}"\s*,\s*"#[A-Fa-f0-9]{6}"\s*,\s*"#[A-Fa-f0-9]{6}"\s*,\s*"#[A-Fa-f0-9]{6}"\s*,\s*"#[A-Fa-f0-9]{6}"\s*\]/);
      
      if (!arrayMatch) {
        // Fallback: try to clean the string and parse
        const cleanedContent = content.split('\n')[0].trim();
        colors = JSON.parse(cleanedContent);
      } else {
        colors = JSON.parse(arrayMatch[0]);
      }
      
      if (!Array.isArray(colors) || colors.length !== 5) {
        throw new Error('Invalid color format');
      }
      
      // Validate that each color is a valid hex code
      if (!colors.every(color => /^#[A-Fa-f0-9]{6}$/.test(color))) {
        throw new Error('Invalid hex code format');
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