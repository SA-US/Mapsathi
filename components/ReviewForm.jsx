'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Upload, X, Camera } from 'lucide-react';
import RatingComponent from './RatingComponent';

const ReviewForm = ({ 
  entityType, 
  entityId, 
  userId, 
  initialReview = null,
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    photos: [],
    categoryRatings: []
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    
    if (initialReview) {
      setFormData({
        rating: initialReview.rating,
        title: initialReview.title || '',
        content: initialReview.content || '',
        photos: initialReview.photos || [],
        categoryRatings: initialReview.categoryRatings || []
      });
    }
  }, [initialReview]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/review-categories?entityType=${entityType}`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    setErrors(prev => ({ ...prev, rating: '' }));
  };

  const handleCategoryRatingChange = (categoryId, rating) => {
    setFormData(prev => ({
      ...prev,
      categoryRatings: prev.categoryRatings.some(cr => cr.categoryId === categoryId)
        ? prev.categoryRatings.map(cr => 
            cr.categoryId === categoryId ? { ...cr, rating } : cr
          )
        : [...prev.categoryRatings, { categoryId, rating }]
    }));
  };

  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;
    
    if (formData.photos.length + files.length > 5) {
      alert('Maximum 5 photos allowed');
      return;
    }

    try {
      const uploadFormData = new FormData();
      files.forEach(file => uploadFormData.append('files', file));
      uploadFormData.append('entityType', entityType);
      uploadFormData.append('entityId', entityId);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });

      if (response.ok) {
        const data = await response.json();
        const newPhotoUrls = data.files.map(file => file.url);
        
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, ...newPhotoUrls]
        }));
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Photo upload error:', error);
      alert('Failed to upload photos. Please try again.');
    }
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Please provide a rating between 1 and 5 stars';
    }

    if (!formData.content || formData.content.trim().length < 50) {
      newErrors.content = 'Review must be at least 50 characters long';
    }

    if (categories.length > 0 && formData.categoryRatings.length !== categories.length) {
      newErrors.categoryRatings = 'Please rate all categories';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        userId,
        entityType,
        entityId
      });
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {initialReview ? 'Edit Review' : 'Write a Review'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Overall Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center gap-4">
            <RatingComponent
              value={formData.rating}
              onChange={handleRatingChange}
              size="large"
              showValue={true}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Summarize your experience"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={100}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review Content *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Share your experience with this place..."
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            minLength={50}
          />
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500">
              Minimum 50 characters
            </span>
            <span className={`text-sm ${formData.content.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
              {formData.content.length}/50
            </span>
          </div>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        {/* Category Ratings */}
        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Ratings
            </label>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                    {category.weight > 1 && (
                      <span className="text-xs text-gray-500 ml-1">
                        (Weight: {category.weight}x)
                      </span>
                    )}
                  </span>
                  <RatingComponent
                    value={formData.categoryRatings.find(cr => cr.categoryId === category.id)?.rating || 0}
                    onChange={(rating) => handleCategoryRatingChange(category.id, rating)}
                    size="small"
                    showValue={true}
                  />
                </div>
              ))}
            </div>
            {errors.categoryRatings && (
              <p className="text-red-500 text-sm mt-1">{errors.categoryRatings}</p>
            )}
          </div>
        )}

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photos (Max 5)
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">
                {formData.photos.length}/5 photos
              </span>
            </div>

            {/* Photo Preview */}
            {formData.photos.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Submitting...' : (initialReview ? 'Update Review' : 'Submit Review')}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;
