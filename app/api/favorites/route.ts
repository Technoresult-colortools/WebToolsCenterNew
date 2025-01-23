import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { toolId } = await req.json()
    if (!toolId) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 })
    }

    // Find or create user based on Auth0 ID
    let user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub! }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: session.user.sub!,
          email: session.user.email!,
          name: session.user.name || ''
        }
      })
    }

    // Create favorite if it doesn't already exist
    try {
      const favorite = await prisma.favorite.create({
        data: {
          toolId,
          userId: user.id
        }
      })
      return NextResponse.json(favorite)
    } catch (error) {
      // Handle error when trying to create a duplicate favorite
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        return NextResponse.json({ error: 'Already in favorites' }, { status: 400 })
      }
      throw error
    }

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { toolId } = await req.json()
    if (!toolId) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub! }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Delete the favorite using userId and toolId
    await prisma.favorite.deleteMany({
      where: {
        userId: user.id,
        toolId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the user by auth0Id
    const user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub! },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Fetch favorites with tool details
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: user.id,
      },
      include: {
        tool: {
          select: {
            name: true,
            href: true,
            description: true,
            category: true,
          },
        },
      },
    })

    return NextResponse.json(favorites)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}