import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { toolId, content } = body;

    if (!toolId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get or create user
    let user = await prisma.user.findFirst({
      where: { 
        auth0Id: session.user.sub 
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: session.user.sub,
          email: session.user.email ?? '',
          name: session.user.name ?? 'Anonymous'
        }
      });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        toolId,
        userId: user.id
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });


    return NextResponse.json(comment);
  } catch (error) {
    // Improved error logging
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('toolId');

    if (!toolId) {
      return NextResponse.json(
        { error: 'Tool ID is required' },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: { toolId },
      include: {
        user: {
          select: {
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(comments);
  } catch (error) {

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}