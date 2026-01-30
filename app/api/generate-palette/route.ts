import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: 'API key missing' }, { status: 500 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // This is the specific model ID from your screenshot
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a professional UI/UX designer. Return a JSON object with a 'colors' array (5 hex codes) and a 'rationale' (why these colors work). Response must be valid JSON."
          },
          {
            role: "user",
            content: `Create an awesome, modern color palette for: ${prompt}`
          }
        ],
        // JSON mode makes the AI output 100% reliable for your frontend
        response_format: { type: "json_object" },
        temperature: 0.8
      })
    });

    const result = await response.json();

    if (!response.ok) {
      // This will help you see EXACTLY why it failed in your terminal
      console.error("GROQ_API_ERROR:", result);
      return NextResponse.json({
        error: result.error?.message || 'API Error',
        status: response.status
      }, { status: response.status });
    }

    const data = JSON.parse(result.choices[0].message.content);

    return NextResponse.json({
      colors: data.colors,
      rationale: data.rationale,
      success: true
    });

  } catch (error: any) {
    console.error('SERVER_ERROR:', error);
    return NextResponse.json({ error: 'Failed to generate colors' }, { status: 500 });
  }
}