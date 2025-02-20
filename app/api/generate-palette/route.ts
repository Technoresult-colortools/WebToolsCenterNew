// app/api/generate-palette/route.ts
import { NextResponse } from 'next/server'

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'  // Replace with actual DeepSeek API endpoint
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt } = body

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: `Generate a color palette based on this description: ${prompt}. 
                    Return exactly 5 colors in an array of hex codes.
                    The colors should work well together and match the mood and style described.
                    Format the response as a JSON array of hex codes.`
        }],
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from DeepSeek API' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const colors = JSON.parse(data.choices[0].message.content)
    
    return NextResponse.json({ colors })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate palette' },
      { status: 500 }
    )
  }
}