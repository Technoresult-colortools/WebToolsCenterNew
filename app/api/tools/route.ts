// app/api/tools/route.ts
import { NextResponse } from 'next/server';
import { categories, allTools } from '@/data/tools';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    // If no IDs are specified, return all tools and categories
    if (!ids) {
      return NextResponse.json({
        categories,
        tools: allTools
      });
    }

    const toolIds = ids.split(',');

    // Filter tools by ID
    const filteredTools = allTools.filter(tool => {
      // Extract tool ID from the href (e.g., "/tools/text/case-converter" -> "case-converter")
      const toolId = tool.href.split('/').pop();
      return toolId && toolIds.includes(toolId);
    });

    if (filteredTools.length === 0) {
      return NextResponse.json(
        { error: "No tools found with the specified IDs" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      tools: filteredTools
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}