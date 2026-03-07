import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/ratings/summary - Get rating summary for entity
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');

    if (!entityType || !entityId) {
      return NextResponse.json(
        { ok: false, message: 'entityType and entityId are required' },
        { status: 400 }
      );
    }

    // Get overall rating stats
    const ratingStats = await prisma.review.aggregate({
      where: {
        entityType,
        entityId,
        isDeleted: false
      },
      _avg: {
        rating: true
      },
      _count: {
        rating: true
      }
    });

    // Get rating distribution
    const ratingDistribution = await prisma.review.groupBy({
      by: ['rating'],
      where: {
        entityType,
        entityId,
        isDeleted: false
      },
      _count: {
        rating: true
      },
      orderBy: {
        rating: 'asc'
      }
    });

    // Get category-specific ratings
    const categoryRatings = await prisma.reviewRating.groupBy({
      by: ['categoryId'],
      where: {
        review: {
          entityType,
          entityId,
          isDeleted: false
        }
      },
      _avg: {
        rating: true
      }
    });

    // Get category details with weights
    const categories = await prisma.reviewCategory.findMany({
      where: { entityType },
      include: {
        reviewRatings: {
          where: {
            review: {
              entityType,
              entityId,
              isDeleted: false
            }
          }
        }
      }
    });

    // Calculate weighted average
    let weightedSum = 0;
    let totalWeight = 0;

    categories.forEach(category => {
      const avgRating = category.reviewRatings.length > 0 
        ? category.reviewRatings.reduce((sum, r) => sum + r.rating, 0) / category.reviewRatings.length 
        : 0;
      
      weightedSum += avgRating * category.weight;
      totalWeight += category.weight;
    });

    const weightedAverage = totalWeight > 0 ? weightedSum / totalWeight : 0;

    // Format category breakdown
    const categoryBreakdown = categories.map(category => {
      const avgRating = category.reviewRatings.length > 0 
        ? category.reviewRatings.reduce((sum, r) => sum + r.rating, 0) / category.reviewRatings.length 
        : 0;
      
      return {
        id: category.id,
        name: category.name,
        weight: category.weight,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: category.reviewRatings.length
      };
    });

    // Format distribution
    const distribution = {};
    for (let i = 1; i <= 5; i++) {
      const found = ratingDistribution.find(d => d.rating === i);
      distribution[i] = found ? found._count.rating : 0;
    }

    const summary = {
      entityType,
      entityId,
      overallRating: Math.round((ratingStats._avg.rating || 0) * 10) / 10,
      weightedAverageRating: Math.round(weightedAverage * 10) / 10,
      totalReviews: ratingStats._count.rating,
      ratingDistribution: distribution,
      categoryBreakdown,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({
      ok: true,
      summary
    });

  } catch (error) {
    console.error('Rating summary error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch rating summary' },
      { status: 500 }
    );
  }
}
