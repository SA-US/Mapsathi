'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, TrendingUp, Calendar } from 'lucide-react';
import ReviewCard from '../../../components/ReviewCard';
import RatingComponent from '../../../components/RatingComponent';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    entityType: '',
    entityId: '',
    minRating: '',
    maxRating: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchReviews();
    if (filters.entityType && filters.entityId) {
      fetchRatingSummary();
    }
  }, [filters, pagination.page]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });

      const response = await fetch(`/api/reviews?${params}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
        setPagination(prev => ({ ...prev, ...data.pagination }));
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatingSummary = async () => {
    try {
      const params = new URLSearchParams({
        entityType: filters.entityType,
        entityId: filters.entityId
      });

      const response = await fetch(`/api/ratings/summary?${params}`);
      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Failed to fetch rating summary:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReviews();
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const renderPagination = () => {
    const { page, pages } = pagination;
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(pages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(pageNum => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-1 rounded-lg transition-colors ${
              pageNum === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pages}
          className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h1>
          <p className="text-gray-600">
            Read and share experiences from the Mapsathi community
          </p>
        </motion.div>

        {/* Rating Summary */}
        {summary && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <RatingComponent value={summary.overallRating} readonly size="large" />
                  <span className="text-2xl font-bold text-gray-900">
                    {summary.overallRating.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {summary.totalReviews} reviews
                </p>
              </div>

              {/* Weighted Average */}
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Weighted Average
                </div>
                <div className="flex items-center justify-center gap-2">
                  <RatingComponent value={summary.weightedAverageRating} readonly size="medium" />
                  <span className="text-xl font-bold text-gray-900">
                    {summary.weightedAverageRating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Rating Distribution */}
              <div>
                <div className="text-lg font-semibold text-gray-900 mb-3">
                  Rating Distribution
                </div>
                <div className="space-y-2">
                  {Object.entries(summary.ratingDistribution)
                    .sort((a, b) => b[0] - a[0])
                    .map(([rating, count]) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 w-3">{rating}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{
                              width: `${(count / summary.totalReviews) * 100}%`
                            }}
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

            {/* Category Breakdown */}
            {summary.categoryBreakdown && summary.categoryBreakdown.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Category Breakdown
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {summary.categoryBreakdown.map((category, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm text-gray-600 mb-1">
                        {category.name}
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <RatingComponent value={category.averageRating} readonly size="small" />
                        <span className="font-medium text-gray-900">
                          {category.averageRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Entity Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entity Type
                </label>
                <select
                  value={filters.entityType}
                  onChange={(e) => handleFilterChange('entityType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="poi">Point of Interest</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="hotel">Hotel</option>
                  <option value="emergency_service">Emergency Service</option>
                </select>
              </div>

              {/* Entity ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entity ID
                </label>
                <input
                  type="text"
                  value={filters.entityId}
                  onChange={(e) => handleFilterChange('entityId', e.target.value)}
                  placeholder="Enter entity ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Min Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="createdAt">Date</option>
                  <option value="rating">Rating</option>
                  <option value="helpfulCount">Helpfulness</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Apply Filters
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setFilters({
                    entityType: '',
                    entityId: '',
                    minRating: '',
                    maxRating: '',
                    sortBy: 'createdAt',
                    sortOrder: 'desc'
                  });
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </motion.div>

        {/* Reviews List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : reviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No reviews found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or be the first to share your experience!
              </p>
            </motion.div>
          ) : (
            reviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                onHelpful={async (reviewId, isHelpful) => {
                  // TODO: Implement helpful voting
                  console.log('Mark helpful:', reviewId, isHelpful);
                }}
                onReport={(reviewId) => {
                  // TODO: Implement reporting
                  console.log('Report review:', reviewId);
                }}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center mt-8">
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
