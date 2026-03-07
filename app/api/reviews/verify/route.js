import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/reviews/verify - Verify a review (admin/moderator only)
export async function POST(req) {
  try {
    const body = await req.json();
    const { reviewId, verified, adminId, reason } = body;

    // Validation
    if (!reviewId || typeof verified !== 'boolean' || !adminId) {
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

    // In a real app, you would verify admin permissions here
    // For now, we'll assume adminId is valid

    // Update review verification status
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { 
        verified,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Log verification action (for audit trail)
    await prisma.reviewVerificationLog.create({
      data: {
        reviewId,
        adminId,
        action: verified ? 'verified' : 'unverified',
        reason: reason || '',
        createdAt: new Date()
      }
    });

    return NextResponse.json({
      ok: true,
      review: updatedReview,
      message: `Review ${verified ? 'verified' : 'unverified'} successfully`
    });

  } catch (error) {
    console.error('Review verification error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to verify review' },
      { status: 500 }
    );
  }
}

// GET /api/reviews/verify - Get verification logs for a review
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get('reviewId');

    if (!reviewId) {
      return NextResponse.json(
        { ok: false, message: 'reviewId is required' },
        { status: 400 }
      );
    }

    const verificationLogs = await prisma.reviewVerificationLog.findMany({
      where: { reviewId },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      ok: true,
      logs: verificationLogs
    });

  } catch (error) {
    console.error('Get verification logs error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch verification logs' },
      { status: 500 }
    );
  }
}
