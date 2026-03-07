import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/reviews/[id] - Get specific review
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const review = await prisma.review.findUnique({
      where: { 
        id,
        isDeleted: false 
      },
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
      }
    });

    if (!review) {
      return NextResponse.json(
        { ok: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    // Format response
    const formattedReview = {
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
    };

    return NextResponse.json({
      ok: true,
      review: formattedReview
    });

  } catch (error) {
    console.error('GET review error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

// PUT /api/reviews/[id] - Update review (author only)
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { userId, rating, title, content, photos, categoryRatings } = body;

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id }
    });

    if (!existingReview) {
      return NextResponse.json(
        { ok: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    if (existingReview.userId !== userId) {
      return NextResponse.json(
        { ok: false, message: 'Unauthorized to update this review' },
        { status: 403 }
      );
    }

    // Validation
    if (rating && (rating < 1 || rating > 5)) {
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

    // Update review
    const updateData = {};
    if (rating !== undefined) updateData.rating = parseFloat(rating);
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (photos !== undefined) updateData.photos = photos.length > 0 ? JSON.stringify(photos) : null;

    const updatedReview = await prisma.review.update({
      where: { id },
      data: updateData,
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

    // Update category ratings if provided
    if (categoryRatings && categoryRatings.length > 0) {
      // Delete existing category ratings
      await prisma.reviewRating.deleteMany({
        where: { reviewId: id }
      });

      // Create new category ratings
      await prisma.reviewRating.createMany({
        data: categoryRatings.map(catRating => ({
          reviewId: id,
          categoryId: catRating.categoryId,
          rating: parseFloat(catRating.rating)
        }))
      });
    }

    // Fetch complete updated review
    const completeReview = await prisma.review.findUnique({
      where: { id },
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
      message: 'Review updated successfully'
    });

  } catch (error) {
    console.error('PUT review error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id] - Delete review (author only)
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id }
    });

    if (!existingReview) {
      return NextResponse.json(
        { ok: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    if (existingReview.userId !== userId) {
      return NextResponse.json(
        { ok: false, message: 'Unauthorized to delete this review' },
        { status: 403 }
      );
    }

    // Soft delete review
    await prisma.review.update({
      where: { id },
      data: { isDeleted: true }
    });

    return NextResponse.json({
      ok: true,
      message: 'Review deleted successfully'
    });

  } catch (error) {
    console.error('DELETE review error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
