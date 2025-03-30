// app/api/convert-markdown/route.ts
import { NextResponse } from 'next/server';

// OpenRouter API models that offer free tier options
const AI_MODELS = {
  // Free models from OpenRouter
  GPT35TURBO: "openai/gpt-3.5-turbo",
  LLAMA3: "meta-llama/llama-3-8b-instruct",
  MISTRAL: "mistralai/mistral-7b-instruct",
  MIXTRAL: "mistralai/mixtral-8x7b-instruct"
};

// Select the AI model to use
const SELECTED_MODEL = AI_MODELS.MISTRAL; // Changed to Mistral as requested

export async function POST(request: Request) {
  try {
    const { markdown } = await request.json();
    
    if (!markdown) {
      return NextResponse.json({ error: 'No markdown content provided' }, { status: 400 });
    }

    // API key from environment variable
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com", // Required by OpenRouter
        "X-Title": "Markdown to HTML Converter" // Identify your app
      },
      body: JSON.stringify({
        model: SELECTED_MODEL,
        messages: [
          {
            role: "system",
            content: `You are an expert converter that transforms Markdown to clean, semantic HTML. Your task is to convert markdown to valid HTML that preserves all formatting, code blocks with proper syntax highlighting classes, tables, and other elements.

Special handling for buttons:
1. If you see markdown in format [Button Text](button:action), convert it to: <button class="btn" onclick="alert('action')">Button Text</button>
2. If you see [Button Text](button-secondary:action), use class="btn btn-secondary" instead
3. If you see [Button Text](button-success:action), use class="btn btn-success" instead 
4. If you see [Button Text](button-danger:action), use class="btn btn-danger" instead

Only respond with the final HTML output, no explanations or markdown.`
          },
          {
            role: "user",
            content: `Convert this Markdown to HTML, preserving all formatting, links, code blocks, tables, and interactive elements:\n\n${markdown}`
          }
        ],
        temperature: 0.2, // Lower temperature for more consistent output
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      return NextResponse.json({ 
        error: errorData.error?.message || 'Failed to convert markdown' 
      }, { status: 500 });
    }

    const data = await response.json();
    const html = data.choices[0].message.content.trim();

    return NextResponse.json({ html });
  } catch (error) {
    console.error("Error processing markdown:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    }, { status: 500 });
  }
}