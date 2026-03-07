'use client';
import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

const RatingComponent = ({ 
  value = 0, 
  onChange, 
  readonly = false, 
  size = 'medium',
  precision = 1,
  showValue = false,
  className = ''
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const currentSize = sizeClasses[size] || sizeClasses.medium;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = precision === 0.5 && value % 1 !== 0;

    // Render full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className={`${currentSize} ${readonly ? 'text-gray-400' : 'text-yellow-400 cursor-pointer hover:text-yellow-500'} transition-colors`}
          fill={readonly || (isHovering && i <= hoverValue) || i <= value}
          onClick={() => !readonly && onChange && onChange(i)}
          onMouseEnter={() => !readonly && setHoverValue(i)}
        />
      );
    }

    // Render half star if needed
    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <StarHalf
          key="half"
          className={`${currentSize} ${readonly ? 'text-gray-400' : 'text-yellow-400 cursor-pointer hover:text-yellow-500'} transition-colors`}
          fill={readonly || (isHovering && fullStars + 0.5 <= hoverValue) || fullStars + 0.5 <= value}
          onClick={() => !readonly && onChange && onChange(fullStars + 0.5)}
          onMouseEnter={() => !readonly && setHoverValue(fullStars + 0.5)}
        />
      );
    }

    // Render empty stars
    const remainingStars = 5 - Math.ceil(value);
    for (let i = 1; i <= remainingStars; i++) {
      const starIndex = fullStars + (hasHalfStar ? 1 : 0) + i;
      stars.push(
        <Star
          key={`empty-${i}`}
          className={`${currentSize} ${readonly ? 'text-gray-300' : 'text-gray-300 cursor-pointer hover:text-yellow-400'} transition-colors`}
          fill={readonly || (isHovering && starIndex <= hoverValue)}
          onClick={() => !readonly && onChange && onChange(starIndex)}
          onMouseEnter={() => !readonly && setHoverValue(starIndex)}
        />
      );
    }

    return stars;
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverValue(0);
  };

  const displayValue = isHovering ? hoverValue : value;

  return (
    <div 
      className={`flex items-center gap-1 ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center">
        {renderStars()}
      </div>
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-600">
          {displayValue.toFixed(precision === 0.5 ? 1 : 0)}
        </span>
      )}
    </div>
  );
};

export default RatingComponent;
