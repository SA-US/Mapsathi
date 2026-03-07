import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/review-categories - Get categories for entity type
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const entityType = searchParams.get('entityType');

    if (!entityType) {
      return NextResponse.json(
        { ok: false, message: 'entityType is required' },
        { status: 400 }
      );
    }

    const categories = await prisma.reviewCategory.findMany({
      where: { entityType },
      orderBy: { weight: 'desc' }
    });

    return NextResponse.json({
      ok: true,
      categories
    });

  } catch (error) {
    console.error('GET review categories error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch review categories' },
      { status: 500 }
    );
  }
}
