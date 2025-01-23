// app/api/tool-requests/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First get the user from the database
    const user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const toolRequests = await prisma.toolRequest.findMany({
      where: {
        userId: user.id  // Use the MongoDB ObjectId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(toolRequests);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch tool requests' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First get the user from the database
    const user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    
    const toolRequest = await prisma.toolRequest.create({
      data: {
        toolName: body.toolName,
        category: body.category,
        description: body.description,
        useCase: body.useCase,
        targetAudience: body.targetAudience,
        userId: user.id,  // Use the MongoDB ObjectId
        userEmail: session.user.email,
        status: 'pending'
      }
    });

    return NextResponse.json(toolRequest);
  } catch {
    return NextResponse.json(
      { error: 'Failed to create tool request' },
      { status: 500 }
    );
  }
}