'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Phone, Globe, ArrowLeft, Plus, Filter } from 'lucide-react';
import ReviewForm from '../../../../components/ReviewForm';
import ReviewCard from '../../../../components/ReviewCard';
import RatingSummary from '../../../../components/RatingSummary';
import RatingComponent from '../../../../components/RatingComponent';

const POIDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [poi, setPOI] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchPOIDetails();
    fetchReviews();
  }, [id]);

  const fetchPOIDetails = async () => {
    try {
      // Mock POI data - in real app, fetch from API
      const mockPOI = {
        id: id,
        name: 'India Gate',
        description: 'India Gate is a war memorial located astride the Rajpath, on the eastern edge of the "ceremonial axis" of New Delhi. It stands as a memorial to 70,000 soldiers of the British Indian Army who died between 1914–1921.',
        lat: 28.6139,
        lon: 77.2090,
        city: 'delhi',
        category: 'Historical Monument',
        address: 'Rajpath, New Delhi, Delhi 110001',
        phone: '+91-11-2336-5358',
        website: 'https://delhitourism.gov.in',
        openingHours: 'Open 24 hours',
        entryFee: 'Free',
        bestTimeToVisit: 'Evening (6-8 PM)',
        estimatedDuration: '1-2 hours',
        tags: ['Historical', 'Monument', 'Photography', 'Evening View'],
        rating: 4.5,
        totalReviews: 156
      };
      setPOI(mockPOI);
    } catch (error) {
      console.error('Failed to fetch POI details:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      // Mock reviews - in real app, fetch from API
      const mockReviews = [
        {
          id: '1',
          user: {
            id: 'user-1',
            name: 'Rahul Sharma',
            avatar: null,
            verified: true
          },
          entityType: 'poi',
          entityId: id,
          rating: 4.5,
          title: 'Amazing Historical Monument',
          content: 'India Gate is truly magnificent. The architecture is stunning and evening lighting makes it even more beautiful. The surrounding gardens are well-maintained and perfect for evening walks. A must-visit place for anyone coming to Delhi.',
          photos: ['/uploads/reviews/india-gate-1.jpg'],
          helpfulCount: 23,
          verified: true,
          createdAt: '2024-01-15T10:30:00Z',
          categoryRatings: [
            { category: { name: 'Accessibility', weight: 1.5 }, rating: 4.0 },
            { category: { name: 'Cleanliness', weight: 1.2 }, rating: 4.5 },
            { category: { name: 'Safety', weight: 1.4 }, rating: 4.5 },
            { category: { name: 'Overall Experience', weight: 1.0 }, rating: 4.5 }
          ]
        },
        {
          id: '2',
          user: {
            id: 'user-2',
            name: 'Priya Patel',
            avatar: null,
            verified: false
          },
          entityType: 'poi',
          entityId: id,
          rating: 3.5,
          title: 'Good but crowded',
          content: 'India Gate is worth visiting for its historical significance. However, it gets extremely crowded during weekends and holidays. The parking situation can be challenging. Best to visit early morning or late evening to avoid the crowds.',
          photos: [],
          helpfulCount: 12,
          verified: false,
          createdAt: '2024-01-10T14:20:00Z',
          categoryRatings: [
            { category: { name: 'Accessibility', weight: 1.5 }, rating: 3.0 },
            { category: { name: 'Cleanliness', weight: 1.2 }, rating: 3.5 },
            { category: { name: 'Safety', weight: 1.4 }, rating: 4.0 },
            { category: { name: 'Overall Experience', weight: 1.0 }, rating: 3.5 }
          ]
        }
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      // In real app, submit to API
      console.log('Review submitted:', reviewData);
      setShowReviewForm(false);
      // Refresh reviews
      fetchReviews();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const handleHelpful = async (reviewId, isHelpful) => {
    try {
      // In real app, call helpful API
      console.log('Mark helpful:', reviewId, isHelpful);
    } catch (error) {
      console.error('Failed to mark helpful:', error);
    }
  };

  const handleReport = (reviewId) => {
    console.log('Report review:', reviewId);
    // In real app, implement reporting
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!poi) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">POI Not Found</h2>
          <p className="text-gray-600 mb-4">The place you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MapPin },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'directions', label: 'Directions', icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{poi.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{poi.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RatingComponent value={poi.rating} readonly showValue />
              <span className="text-sm text-gray-600">({poi.totalReviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">{poi.description}</p>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Visitor Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Opening Hours</div>
                      <div className="text-sm text-gray-600">{poi.openingHours}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Contact</div>
                      <div className="text-sm text-gray-600">{poi.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Website</div>
                      <a href={poi.website} className="text-sm text-blue-600 hover:underline">
                        Visit Website
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Entry Fee</div>
                      <div className="text-sm text-gray-600">{poi.entryFee}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {poi.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Rating Summary */}
              <RatingSummary
                entityType="poi"
                entityId={poi.id}
                showDetailed={true}
              />

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Write a Review
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Reviews Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Reviews ({reviews.length})
              </h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Write Review
                </button>
              </div>
            </div>

            {/* Rating Summary */}
            <RatingSummary
              entityType="poi"
              entityId={poi.id}
              showDetailed={true}
            />

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onHelpful={handleHelpful}
                  onReport={handleReport}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'directions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Directions</h2>
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map will be integrated here</p>
              <p className="text-sm text-gray-500 mt-2">Coordinates: {poi.lat}, {poi.lon}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ReviewForm
              entityType="poi"
              entityId={poi.id}
              userId="demo-user" // In real app, get from auth
              onSubmit={handleReviewSubmit}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default POIDetailPage;
