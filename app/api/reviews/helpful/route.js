import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/reviews/helpful - Mark review as helpful/not helpful
export async function POST(req) {
  try {
    const body = await req.json();
    const { reviewId, userId, isHelpful } = body;

    // Validation
    if (!reviewId || !userId || typeof isHelpful !== 'boolean') {
      return NextResponse.json(
        { ok: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if review exists
    const review = await prisma.review.findUnique({
      where: { 
        id: reviewId,
        isDeleted: false 
      }
    });

    if (!review) {
      return NextResponse.json(
        { ok: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    // Check if user already voted
    const existingVote = await prisma.reviewHelpfulness.findUnique({
      where: {
        reviewId_userId: {
          reviewId,
          userId
        }
      }
    });

    if (existingVote) {
      if (existingVote.isHelpful === isHelpful) {
        // Same vote - remove it
        await prisma.reviewHelpfulness.delete({
          where: {
            reviewId_userId: {
              reviewId,
              userId
            }
          }
        });
      } else {
        // Different vote - update it
        await prisma.reviewHelpfulness.update({
          where: {
            reviewId_userId: {
              reviewId,
              userId
            }
          },
          data: { isHelpful }
        });
      }
    } else {
      // New vote - create it
      await prisma.reviewHelpfulness.create({
        data: {
          reviewId,
          userId,
          isHelpful
        }
      });
    }

    // Update helpful count
    const helpfulCount = await prisma.reviewHelpfulness.count({
      where: {
        reviewId,
        isHelpful: true
      }
    });

    await prisma.review.update({
      where: { id: reviewId },
      data: { helpfulCount }
    });

    // Get updated helpfulness stats
    const helpfulnessStats = await prisma.reviewHelpfulness.groupBy({
      by: ['isHelpful'],
      where: { reviewId },
      _count: { isHelpful: true }
    });

    const helpfulVotes = helpfulnessStats.find(stat => stat.isHelpful)?._count.isHelpful || 0;
    const notHelpfulVotes = helpfulnessStats.find(stat => !stat.isHelpful)?._count.isHelpful || 0;

    return NextResponse.json({
      ok: true,
      message: 'Vote recorded successfully',
      stats: {
        helpfulVotes,
        notHelpfulVotes,
        totalVotes: helpfulVotes + notHelpfulVotes,
        helpfulPercentage: helpfulVotes + notHelpfulVotes > 0 
          ? Math.round((helpfulVotes / (helpfulVotes + notHelpfulVotes)) * 100)
          : 0
      }
    });

  } catch (error) {
    console.error('Helpful vote error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to record vote' },
      { status: 500 }
    );
  }
}

// GET /api/reviews/helpful - Get helpfulness stats for a review
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get('reviewId');
    const userId = searchParams.get('userId');

    if (!reviewId) {
      return NextResponse.json(
        { ok: false, message: 'reviewId is required' },
        { status: 400 }
      );
    }

    // Get helpfulness stats
    const helpfulnessStats = await prisma.reviewHelpfulness.groupBy({
      by: ['isHelpful'],
      where: { reviewId },
      _count: { isHelpful: true }
    });

    const helpfulVotes = helpfulnessStats.find(stat => stat.isHelpful)?._count.isHelpful || 0;
    const notHelpfulVotes = helpfulnessStats.find(stat => !stat.isHelpful)?._count.isHelpful || 0;

    // Get user's vote if userId provided
    let userVote = null;
    if (userId) {
      const vote = await prisma.reviewHelpfulness.findUnique({
        where: {
          reviewId_userId: {
            reviewId,
            userId
          }
        }
      });
      userVote = vote?.isHelpful;
    }

    return NextResponse.json({
      ok: true,
      stats: {
        helpfulVotes,
        notHelpfulVotes,
        totalVotes: helpfulVotes + notHelpfulVotes,
        helpfulPercentage: helpfulVotes + notHelpfulVotes > 0 
          ? Math.round((helpfulVotes / (helpfulVotes + notHelpfulVotes)) * 100)
          : 0,
        userVote
      }
    });

  } catch (error) {
    console.error('Get helpfulness stats error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch helpfulness stats' },
      { status: 500 }
    );
  }
}
