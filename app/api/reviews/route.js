import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/reviews - List reviews with filters
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const minRating = searchParams.get('minRating');
    const maxRating = searchParams.get('maxRating');

    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      isDeleted: false
    };

    if (entityType && entityId) {
      where.entityType = entityType;
      where.entityId = entityId;
    }

    if (minRating) {
      where.rating = { ...where.rating, gte: parseFloat(minRating) };
    }

    if (maxRating) {
      where.rating = { ...where.rating, lte: parseFloat(maxRating) };
    }

    // Build order clause
    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    // Get reviews with user info
    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            verified: true
          }
        },
        ratings: {
          include: {
            category: true
          }
        },
        _count: {
          select: {
            helpfulness: true
          }
        }
      },
      orderBy,
      skip,
      take: limit
    });

    // Get total count for pagination
    const total = await prisma.review.count({ where });

    // Format response
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      user: review.user,
      entityType: review.entityType,
      entityId: review.entityId,
      rating: review.rating,
      title: review.title,
      content: review.content,
      photos: review.photos ? JSON.parse(review.photos) : [],
      helpfulCount: review.helpfulCount,
      verified: review.verified,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      categoryRatings: review.ratings.map(rating => ({
        category: rating.category,
        rating: rating.rating
      })),
      helpfulnessCount: review._count.helpfulness
    }));

    return NextResponse.json({
      ok: true,
      reviews: formattedReviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('GET reviews error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Create new review
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      userId,
      entityType,
      entityId,
      rating,
      title,
      content,
      photos,
      categoryRatings
    } = body;

    // Validation
    if (!userId || !entityType || !entityId || !rating) {
      return NextResponse.json(
        { ok: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { ok: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (content && content.length < 50) {
      return NextResponse.json(
        { ok: false, message: 'Review content must be at least 50 characters' },
        { status: 400 }
      );
    }

    // Check if user already reviewed this entity
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        entityType,
        entityId,
        isDeleted: false
      }
    });

    if (existingReview) {
      return NextResponse.json(
        { ok: false, message: 'You have already reviewed this entity' },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId,
        entityType,
        entityId,
        rating: parseFloat(rating),
        title,
        content,
        photos: photos && photos.length > 0 ? JSON.stringify(photos) : null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            verified: true
          }
        }
      }
    });

    // Create category ratings if provided
    if (categoryRatings && categoryRatings.length > 0) {
      await prisma.reviewRating.createMany({
        data: categoryRatings.map(catRating => ({
          reviewId: review.id,
          categoryId: catRating.categoryId,
          rating: parseFloat(catRating.rating)
        }))
      });
    }

    // Fetch complete review with category ratings
    const completeReview = await prisma.review.findUnique({
      where: { id: review.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            verified: true
          }
        },
        ratings: {
          include: {
            category: true
          }
        }
      }
    });

    // Format response
    const formattedReview = {
      id: completeReview.id,
      user: completeReview.user,
      entityType: completeReview.entityType,
      entityId: completeReview.entityId,
      rating: completeReview.rating,
      title: completeReview.title,
      content: completeReview.content,
      photos: completeReview.photos ? JSON.parse(completeReview.photos) : [],
      helpfulCount: completeReview.helpfulCount,
      verified: completeReview.verified,
      createdAt: completeReview.createdAt,
      updatedAt: completeReview.updatedAt,
      categoryRatings: completeReview.ratings.map(rating => ({
        category: rating.category,
        rating: rating.rating
      }))
    };

    return NextResponse.json({
      ok: true,
      review: formattedReview,
      message: 'Review created successfully'
    });

  } catch (error) {
    console.error('POST review error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to create review' },
      { status: 500 }
    );
  }
}
