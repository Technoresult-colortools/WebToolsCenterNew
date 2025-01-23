// app/api/favorites/check/route.ts
import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await getSession()

    // If no session, return isFavorite as false
    if (!session?.user) {
      return NextResponse.json({ isFavorite: false })
    }

    const { searchParams } = new URL(req.url)
    const toolId = searchParams.get('toolId')

    // If no toolId provided, return an error
    if (!toolId) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 })
    }

    // Check if the user exists in the database and if they have the favorite tool
    const user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub! },
      include: {
        favorites: {
          where: { toolId },
          select: { id: true } // Only return the necessary data
        }
      }
    })

    // If no user found, return isFavorite as false
    if (!user) {
      return NextResponse.json({ isFavorite: false })
    }

    // Return true if the user has this tool in their favorites
    return NextResponse.json({ isFavorite: user.favorites.length > 0 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
