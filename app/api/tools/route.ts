// app/api/tools/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    if (!ids) {
      return NextResponse.json(
        { error: 'Tool IDs are required' },
        { status: 400 }
      );
    }

    const toolIds = ids.split(',');

    const tools = await prisma.tool.findMany({
      where: {
        id: {
          in: toolIds
        }
      },
      select: {
        id: true,
        name: true,
        href: true
      }
    });

    return NextResponse.json(tools);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}