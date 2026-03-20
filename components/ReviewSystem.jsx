'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  User, 
  Calendar,
  CheckCircle,
  X,
  Send,
  Filter,
  TrendingUp
} from 'lucide-react';

const ReviewSystem = ({ destinationId, destinationName }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "Priya Sharma",
      rating: 5,
      title: "Amazing Experience!",
      comment: "The trip planning was seamless and the itinerary was perfectly curated. Loved every moment!",
      date: "2024-03-10",
      helpful: 24,
      verified: true,
      categories: {
        planning: 5,
        execution: 5,
        value: 4,
        support: 5
      }
    },
    {
      id: 2,
      userName: "Rahul Verma",
      rating: 4,
      title: "Great Service",
      comment: "Overall excellent experience. The only suggestion would be to add more dining options.",
      date: "2024-03-08",
      helpful: 18,
      verified: true,
      categories: {
        planning: 4,
        execution: 4,
        value: 5,
        support: 4
      }
    },
    {
      id: 3,
      userName: "Anjali Patel",
      rating: 5,
      title: "Perfect Family Trip",
      comment: "Planned our family vacation perfectly. Kids loved the activities and the accommodations were excellent.",
      date: "2024-03-05",
      helpful: 31,
      verified: true,
      categories: {
        planning: 5,
        execution: 5,
        value: 5,
        support: 5
      }
    }
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    userName: '',
    categories: {
      planning: 5,
      execution: 5,
      value: 5,
      support: 5
    }
  });
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(r => r.rating === rating).length
  );

  const handleSubmitReview = () => {
    if (!newReview.title || !newReview.comment || !newReview.userName) {
      alert('Please fill in all required fields');
      return;
    }

    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: false
    };

    setReviews([review, ...reviews]);
    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      userName: '',
      categories: {
        planning: 5,
        execution: 5,
        value: 5,
        support: 5
      }
    });
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const filteredAndSortedReviews = reviews
    .filter(review => filter === 'all' || (filter === 'verified' ? review.verified : true))
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const StarRating = ({ rating, onChange, size = 'md', interactive = false }) => {
    const stars = [1, 2, 3, 4, 5];
    
    return (
      <div className="flex gap-1">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star 
              className={`${size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reviews & Ratings</h2>
        <p className="text-gray-600">Share your experience and help others plan their perfect trip</p>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Average Rating */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
            <StarRating rating={Math.round(averageRating)} size="lg" />
            <div className="text-sm text-gray-600 mt-2">{reviews.length} Reviews</div>
            <Badge className="mt-2 bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${(ratingDistribution[index] / reviews.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{ratingDistribution[index]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Excellent</span>
                <span className="text-sm font-medium">{ratingDistribution[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Good</span>
                <span className="text-sm font-medium">{ratingDistribution[1]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average</span>
                <span className="text-sm font-medium">{ratingDistribution[2]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Poor</span>
                <span className="text-sm font-medium">{ratingDistribution[3] + ratingDistribution[4]}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Button 
          onClick={() => setShowReviewForm(true)}
          className="flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Write a Review
        </Button>
        
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Reviews</option>
            <option value="verified">Verified Only</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAndSortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{review.userName}</h4>
                          {review.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <StarRating rating={review.rating} size="sm" />
                          <span>•</span>
                          <Calendar className="w-3 h-3" />
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{review.title}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  {/* Category Ratings */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Planning</div>
                      <StarRating rating={review.categories.planning} size="sm" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Execution</div>
                      <StarRating rating={review.categories.execution} size="sm" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Value</div>
                      <StarRating rating={review.categories.value} size="sm" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Support</div>
                      <StarRating rating={review.categories.support} size="sm" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center gap-1"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Write a Review</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowReviewForm(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        value={newReview.userName}
                        onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Overall Rating</label>
                      <StarRating 
                        rating={newReview.rating} 
                        onChange={(rating) => setNewReview({...newReview, rating})}
                        interactive={true}
                        size="lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Review Title</label>
                      <input
                        type="text"
                        value={newReview.title}
                        onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Summarize your experience"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Your Review</label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Share your experience with others..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Category Ratings</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Planning</div>
                          <StarRating 
                            rating={newReview.categories.planning} 
                            onChange={(rating) => setNewReview({
                              ...newReview, 
                              categories: {...newReview.categories, planning: rating}
                            })}
                            interactive={true}
                          />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Execution</div>
                          <StarRating 
                            rating={newReview.categories.execution} 
                            onChange={(rating) => setNewReview({
                              ...newReview, 
                              categories: {...newReview.categories, execution: rating}
                            })}
                            interactive={true}
                          />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Value</div>
                          <StarRating 
                            rating={newReview.categories.value} 
                            onChange={(rating) => setNewReview({
                              ...newReview, 
                              categories: {...newReview.categories, value: rating}
                            })}
                            interactive={true}
                          />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Support</div>
                          <StarRating 
                            rating={newReview.categories.support} 
                            onChange={(rating) => setNewReview({
                              ...newReview, 
                              categories: {...newReview.categories, support: rating}
                            })}
                            interactive={true}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleSubmitReview} className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Submit Review
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowReviewForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewSystem;
