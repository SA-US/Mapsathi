'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, CheckCircle, AlertCircle } from 'lucide-react';
import RatingComponent from './RatingComponent';

const RatingSummary = ({ entityType, entityId, showDetailed = false }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRatingSummary();
  }, [entityType, entityId]);

  const fetchRatingSummary = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        entityType,
        entityId
      });

      const response = await fetch(`/api/ratings/summary?${params}`);
      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      } else {
        // Don't throw error, just set a default summary
        setSummary({
          overallRating: 0,
          totalReviews: 0,
          ratingDistribution: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 }
        });
      }
    } catch (error) {
      console.error('Rating summary fetch error:', error);
      // Set default data to prevent crashes
      setSummary({
        overallRating: 0,
        totalReviews: 0,
        ratingDistribution: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 }
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-green-500';
    if (rating >= 3.5) return 'text-yellow-500';
    if (rating >= 3.0) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Fair';
    return 'Poor';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <span>Failed to load ratings</span>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="text-center text-gray-500">
          <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No ratings yet</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Rating Summary</h3>
        {summary.verified && (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Verified</span>
          </div>
        )}
      </div>

      {/* Overall Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Column - Overall Rating */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className={`text-4xl font-bold ${getRatingColor(summary.overallRating)}`}>
              {summary.overallRating.toFixed(1)}
            </div>
            <RatingComponent value={summary.overallRating} readonly size="large" />
          </div>
          <div className={`text-sm font-medium mb-1 ${getRatingColor(summary.overallRating)}`}>
            {getRatingLabel(summary.overallRating)}
          </div>
          <div className="text-sm text-gray-600">
            {summary.totalReviews} review{summary.totalReviews !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Right Column - Rating Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Rating Distribution</h4>
          <div className="space-y-2">
            {Object.entries(summary.ratingDistribution)
              .sort((a, b) => b[0] - a[0])
              .map(([rating, count]) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-12">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">{rating}</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-yellow-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(count / summary.totalReviews) * 100}%`
                      }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Weighted Average */}
      {summary.weightedAverageRating && summary.weightedAverageRating !== summary.overallRating && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-blue-900">Weighted Average</div>
              <div className="text-xs text-blue-700">
                Considers category weights and importance
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RatingComponent value={summary.weightedAverageRating} readonly size="small" />
              <span className={`font-bold ${getRatingColor(summary.weightedAverageRating)}`}>
                {summary.weightedAverageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      {showDetailed && summary.categoryBreakdown && summary.categoryBreakdown.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.categoryBreakdown.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.reviewCount} review{category.reviewCount !== 1 ? 's' : ''}
                    {category.weight > 1 && (
                      <span className="ml-1">• {category.weight}x weight</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <RatingComponent value={category.averageRating} readonly size="small" />
                  <span className={`font-medium ${getRatingColor(category.averageRating)}`}>
                    {category.averageRating.toFixed(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      {showDetailed && summary.totalReviews >= 5 && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-sm font-medium text-green-900">High Satisfaction</div>
                <div className="text-xs text-green-700">
                  {Math.round((summary.ratingDistribution[5] + summary.ratingDistribution[4]) / summary.totalReviews * 100)}% positive
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm font-medium text-blue-900">Active Community</div>
                <div className="text-xs text-blue-700">
                  {summary.totalReviews} reviews
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-sm font-medium text-purple-900">Quality Content</div>
                <div className="text-xs text-purple-700">
                  Detailed ratings
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Last updated: {new Date(summary.lastUpdated).toLocaleString()}
        </div>
      </div>
    </motion.div>
  );
};

export default RatingSummary;
