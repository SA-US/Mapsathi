'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Filter, BarChart3, CheckCircle } from 'lucide-react';
import ReviewForm from '../../../components/ReviewForm';
import ReviewCard from '../../../components/ReviewCard';
import RatingSummary from '../../../components/RatingSummary';
import RatingComponent from '../../../components/RatingComponent';

const ReviewDemoPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState({
    type: 'poi',
    id: 'demo-poi-001',
    name: 'India Gate'
  });

  // Mock data for demonstration
  const mockReviews = [
    {
      id: '1',
      user: {
        id: 'user1',
        name: 'Rahul Sharma',
        avatar: null,
        verified: true
      },
      entityType: 'poi',
      entityId: 'demo-poi-001',
      rating: 4.5,
      title: 'Amazing Historical Monument',
      content: 'India Gate is truly a magnificent structure that stands as a symbol of our nation\'s pride. The architecture is stunning and the evening lighting makes it even more beautiful. The surrounding gardens are well-maintained and perfect for evening walks. A must-visit place for anyone coming to Delhi.',
      photos: [],
      helpfulCount: 23,
      verified: true,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      categoryRatings: [
        { category: { name: 'Accessibility', weight: 1.5 }, rating: 4.0 },
        { category: { name: 'Cleanliness', weight: 1.2 }, rating: 4.5 },
        { category: { name: 'Safety', weight: 1.4 }, rating: 4.5 },
        { category: { name: 'Overall Experience', weight: 1.0 }, rating: 4.5 }
      ],
      helpfulnessCount: 23
    },
    {
      id: '2',
      user: {
        id: 'user2',
        name: 'Priya Patel',
        avatar: null,
        verified: false
      },
      entityType: 'poi',
      entityId: 'demo-poi-001',
      rating: 3.5,
      title: 'Good but crowded',
      content: 'India Gate is definitely worth visiting for its historical significance. However, it gets extremely crowded during weekends and holidays. The parking situation can be challenging. Best to visit early morning or late evening to avoid the crowds.',
      photos: [],
      helpfulCount: 12,
      verified: false,
      createdAt: '2024-01-10T14:20:00Z',
      updatedAt: '2024-01-10T14:20:00Z',
      categoryRatings: [
        { category: { name: 'Accessibility', weight: 1.5 }, rating: 3.0 },
        { category: { name: 'Cleanliness', weight: 1.2 }, rating: 3.5 },
        { category: { name: 'Safety', weight: 1.4 }, rating: 4.0 },
        { category: { name: 'Overall Experience', weight: 1.0 }, rating: 3.5 }
      ],
      helpfulnessCount: 12
    }
  ];

  const mockSummary = {
    entityType: 'poi',
    entityId: 'demo-poi-001',
    overallRating: 4.2,
    weightedAverageRating: 4.1,
    totalReviews: 156,
    ratingDistribution: {
      '5': 68,
      '4': 52,
      '3': 25,
      '2': 8,
      '1': 3
    },
    categoryBreakdown: [
      { id: 'poi-accessibility', name: 'Accessibility', weight: 1.5, averageRating: 3.8, reviewCount: 156 },
      { id: 'poi-cleanliness', name: 'Cleanliness', weight: 1.2, averageRating: 4.3, reviewCount: 156 },
      { id: 'poi-safety', name: 'Safety', weight: 1.4, averageRating: 4.5, reviewCount: 156 },
      { id: 'poi-value', name: 'Value for Money', weight: 1.3, averageRating: 4.6, reviewCount: 156 },
      { id: 'poi-experience', name: 'Overall Experience', weight: 1.0, averageRating: 4.2, reviewCount: 156 }
    ],
    verified: true,
    lastUpdated: new Date().toISOString()
  };

  const handleReviewSubmit = async (reviewData) => {
    console.log('Review submitted:', reviewData);
    // In a real app, this would call the API
    setShowReviewForm(false);
  };

  const handleHelpful = async (reviewId, isHelpful) => {
    console.log('Mark helpful:', reviewId, isHelpful);
    // In a real app, this would call the API
  };

  const handleReport = (reviewId) => {
    console.log('Report review:', reviewId);
    // In a real app, this would call the API
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'write', label: 'Write Review', icon: Plus }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Review System Demo
          </h1>
          <p className="text-gray-600">
            Complete review and rating functionality demonstration
          </p>
        </motion.div>

        {/* Entity Selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Selected Entity
          </h2>
          <div className="flex items-center gap-4">
            <div>
              <div className="font-medium text-gray-900">{selectedEntity.name}</div>
              <div className="text-sm text-gray-600">
                Type: {selectedEntity.type} • ID: {selectedEntity.id}
              </div>
            </div>
            <RatingComponent value={mockSummary.overallRating} readonly showValue />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8"
        >
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <RatingSummary
                entityType={selectedEntity.type}
                entityId={selectedEntity.id}
                showDetailed={true}
              />
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  All Reviews ({mockReviews.length})
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>

              {mockReviews.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onHelpful={handleHelpful}
                  onReport={handleReport}
                />
              ))}
            </motion.div>
          )}

          {activeTab === 'write' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {showReviewForm ? (
                <ReviewForm
                  entityType={selectedEntity.type}
                  entityId={selectedEntity.id}
                  userId="demo-user"
                  onSubmit={handleReviewSubmit}
                  onCancel={() => setShowReviewForm(false)}
                />
              ) : (
                <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Share Your Experience
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Help others by sharing your review of {selectedEntity.name}
                  </p>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Write a Review
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Implemented Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <Star className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium text-green-900 mb-1">5-Star Rating System</h3>
              <p className="text-sm text-green-700">
                Interactive rating with half-star precision
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <Filter className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-blue-900 mb-1">Advanced Filtering</h3>
              <p className="text-sm text-blue-700">
                Filter by rating, date, and entity type
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-purple-900 mb-1">Category Ratings</h3>
              <p className="text-sm text-purple-700">
                Weighted category-specific ratings
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <Plus className="w-6 h-6 text-orange-600 mb-2" />
              <h3 className="font-medium text-orange-900 mb-1">Photo Upload</h3>
              <p className="text-sm text-orange-700">
                Upload up to 5 photos with reviews
              </p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg">
              <Star className="w-6 h-6 text-pink-600 mb-2" />
              <h3 className="font-medium text-pink-900 mb-1">Helpful Voting</h3>
              <p className="text-sm text-pink-700">
                Vote on review helpfulness
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-indigo-600 mb-2" />
              <h3 className="font-medium text-indigo-900 mb-1">Verification System</h3>
              <p className="text-sm text-indigo-700">
                Admin verification for quality control
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewDemoPage;
