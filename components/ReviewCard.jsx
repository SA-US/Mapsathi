'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Flag, Calendar, User, CheckCircle } from 'lucide-react';
import RatingComponent from './RatingComponent';

const ReviewCard = ({ 
  review, 
  showHelpfulButton = true, 
  showReportButton = true,
  onHelpful,
  onReport,
  compact = false 
}) => {
  const [helpfulLoading, setHelpfulLoading] = useState(false);
  const [userHelpful, setUserHelpful] = useState(null);

  const handleHelpful = async (isHelpful) => {
    if (helpfulLoading) return;
    
    setHelpfulLoading(true);
    try {
      await onHelpful?.(review.id, isHelpful);
      setUserHelpful(isHelpful);
    } catch (error) {
      console.error('Error marking helpful:', error);
    } finally {
      setHelpfulLoading(false);
    }
  };

  const handleReport = () => {
    onReport?.(review.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <RatingComponent value={review.rating} readonly size="small" />
              <span className="font-medium text-gray-900">{review.rating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{review.content}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {review.user?.avatar ? (
            <img 
              src={review.user.avatar} 
              alt={review.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          )}
          
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900">
                {review.user?.name || 'Anonymous User'}
              </h4>
              {review.user?.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(review.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RatingComponent value={review.rating} readonly size="small" />
          <span className="font-medium text-gray-900">{review.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Title */}
      {review.title && (
        <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
      )}

      {/* Content */}
      <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto">
            {review.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Review photo ${index + 1}`}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.open(photo, '_blank')}
                  onError={(e) => {
                    e.target.src = '/api/images/placeholder/image-not-found.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Ratings */}
      {review.categoryRatings && review.categoryRatings.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-2">Category Ratings</h5>
          <div className="grid grid-cols-2 gap-2">
            {review.categoryRatings.map((catRating, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{catRating.category?.name}:</span>
                <div className="flex items-center gap-1">
                  <RatingComponent value={catRating.rating} readonly size="small" />
                  <span className="font-medium">{catRating.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          {showHelpfulButton && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleHelpful(true)}
                disabled={helpfulLoading || userHelpful === true}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                  userHelpful === true
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } ${helpfulLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({review.helpfulnessCount || review.helpfulCount})</span>
              </button>
              
              <button
                onClick={() => handleHelpful(false)}
                disabled={helpfulLoading || userHelpful === false}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                  userHelpful === false
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } ${helpfulLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ThumbsDown className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {showReportButton && (
          <button
            onClick={handleReport}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <Flag className="w-3 h-3" />
            <span>Report</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewCard;
