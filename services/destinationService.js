// Destination service for MapSathi
// This service provides access to destination and activity data

import { destinations, sampleItineraries } from '../database/seed-itinerary-data';

class DestinationService {
  constructor() {
    this.destinations = destinations;
    this.sampleItineraries = sampleItineraries;
  }

  // Get all destinations
  getAllDestinations() {
    return this.destinations;
  }

  // Get destination by ID
  getDestinationById(id) {
    return this.destinations.find(dest => dest.id === id);
  }

  // Get destinations by state
  getDestinationsByState(state) {
    return this.destinations.filter(dest => dest.state.toLowerCase() === state.toLowerCase());
  }

  // Get destinations by category/interest
  getDestinationsByInterest(interest) {
    return this.destinations.filter(dest => 
      dest.popularFor.some(popular => popular.toLowerCase() === interest.toLowerCase())
    );
  }

  // Search destinations
  searchDestinations(query) {
    const lowercaseQuery = query.toLowerCase();
    return this.destinations.filter(dest => 
      dest.name.toLowerCase().includes(lowercaseQuery) ||
      dest.state.toLowerCase().includes(lowercaseQuery) ||
      dest.description.toLowerCase().includes(lowercaseQuery) ||
      dest.popularFor.some(popular => popular.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get activities for a destination
  getActivitiesForDestination(destinationId, category = null) {
    const destination = this.getDestinationById(destinationId);
    if (!destination) return [];

    if (category) {
      return destination.activities[category] || [];
    }

    // Return all activities across all categories
    const allActivities = [];
    Object.values(destination.activities).forEach(categoryActivities => {
      allActivities.push(...categoryActivities);
    });
    return allActivities;
  }

  // Get activities by category for a destination
  getActivitiesByCategory(destinationId, category) {
    const destination = this.getDestinationById(destinationId);
    if (!destination) return [];

    return destination.activities[category] || [];
  }

  // Get activity by ID
  getActivityById(destinationId, activityId) {
    const activities = this.getActivitiesForDestination(destinationId);
    return activities.find(activity => activity.id === activityId);
  }

  // Get budget range for destination
  getBudgetRange(destinationId, budgetLevel) {
    const destination = this.getDestinationById(destinationId);
    if (!destination || !destination.budget[budgetLevel]) return null;

    return destination.budget[budgetLevel];
  }

  // Get accommodation options for destination
  getAccommodationOptions(destinationId, budgetLevel = null) {
    const destination = this.getDestinationById(destinationId);
    if (!destination || !destination.accommodation) return [];

    if (budgetLevel) {
      return destination.accommodation.filter(acc => acc.type === budgetLevel);
    }

    return destination.accommodation;
  }

  // Get transport options for destination
  getTransportOptions(destinationId, transportType = null) {
    const destination = this.getDestinationById(destinationId);
    if (!destination || !destination.transport) return [];

    if (transportType) {
      return destination.transport.filter(trans => trans.type === transportType);
    }

    return destination.transport;
  }

  // Get sample itineraries
  getSampleItineraries(destinationId = null) {
    if (destinationId) {
      return this.sampleItineraries.filter(itinerary => itinerary.destination === destinationId);
    }
    return this.sampleItineraries;
  }

  // Get sample itinerary by ID
  getSampleItineraryById(id) {
    return this.sampleItineraries.find(itinerary => itinerary.id === id);
  }

  // Get popular destinations
  getPopularDestinations(limit = 6) {
    // Sort by number of activities and return top destinations
    return this.destinations
      .sort((a, b) => {
        const aActivities = Object.values(a.activities).reduce((acc, category) => acc + category.length, 0);
        const bActivities = Object.values(b.activities).reduce((acc, category) => acc + category.length, 0);
        return bActivities - aActivities;
      })
      .slice(0, limit);
  }

  // Get destinations by budget
  getDestinationsByBudget(maxBudget) {
    return this.destinations.filter(dest => {
      const budgetRange = dest.budget.moderate || dest.budget.budget;
      return budgetRange && budgetRange.min <= maxBudget;
    });
  }

  // Get best time to visit destinations
  getDestinationsBySeason(season) {
    const seasonMap = {
      'winter': ['October', 'November', 'December', 'January', 'February'],
      'summer': ['March', 'April', 'May', 'June'],
      'monsoon': ['July', 'August', 'September'],
      'spring': ['February', 'March', 'April'],
      'autumn': ['October', 'November']
    };

    const months = seasonMap[season.toLowerCase()] || seasonMap.winter;
    
    return this.destinations.filter(dest => {
      return months.some(month => dest.bestTimeToVisit.includes(month));
    });
  }

  // Calculate estimated cost for itinerary
  calculateItineraryCost(destinationId, duration, budgetLevel, travelers, interests) {
    const destination = this.getDestinationById(destinationId);
    if (!destination) return 0;

    let totalCost = 0;
    const days = parseInt(duration) || 3;

    // Activities cost (2-4 activities per day based on interests)
    const activitiesPerDay = 4;
    const activities = [];
    
    interests.forEach(interest => {
      const categoryActivities = destination.activities[interest] || [];
      activities.push(...categoryActivities.slice(0, activitiesPerDay));
    });

    // Apply budget multiplier
    const budgetMultipliers = {
      budget: 0.7,
      moderate: 1.0,
      premium: 1.5,
      luxury: 2.0
    };

    const multiplier = budgetMultipliers[budgetLevel] || 1.0;
    
    activities.forEach(activity => {
      totalCost += (activity.cost || 0) * multiplier;
    });

    // Accommodation cost
    const accommodation = this.getAccommodationOptions(destinationId, budgetLevel)[0];
    if (accommodation) {
      totalCost += (accommodation.price || 0) * days;
    }

    // Transport cost
    const transport = this.getTransportOptions(destinationId)[0];
    if (transport) {
      totalCost += (transport.cost || 0) * days;
    }

    return Math.round(totalCost);
  }

  // Get recommendations based on preferences
  getRecommendations(preferences) {
    const { interests, budget, duration, travelers } = preferences;
    
    let recommended = this.destinations;

    // Filter by interests
    if (interests && interests.length > 0) {
      recommended = recommended.filter(dest => 
        interests.some(interest => 
          dest.popularFor.some(popular => 
            popular.toLowerCase() === interest.toLowerCase()
          )
        )
      );
    }

    // Filter by budget
    if (budget) {
      const budgetRange = this.getBudgetRange('jaipur', budget); // Using Jaipur as reference
      if (budgetRange) {
        recommended = recommended.filter(dest => {
          const destBudget = dest.budget[budget] || dest.budget.moderate;
          return destBudget && destBudget.min <= budgetRange.max;
        });
      }
    }

    // Sort by relevance (number of matching interests)
    recommended = recommended.map(dest => {
      let score = 0;
      if (interests) {
        interests.forEach(interest => {
          if (dest.popularFor.some(popular => popular.toLowerCase() === interest.toLowerCase())) {
            score += 1;
          }
        });
      }
      return { ...dest, score };
    });

    recommended.sort((a, b) => b.score - a.score);

    return recommended.slice(0, 6);
  }

  // Format destination for display
  formatDestinationForDisplay(destination) {
    return {
      id: destination.id,
      name: destination.name,
      state: destination.state,
      country: destination.country,
      description: destination.description,
      bestTimeToVisit: destination.bestTimeToVisit,
      averageDuration: destination.averageDuration,
      popularFor: destination.popularFor,
      budget: destination.budget,
      coordinates: destination.coordinates,
      activityCount: Object.values(destination.activities).reduce((acc, category) => acc + category.length, 0)
    };
  }

  // Format activity for display
  formatActivityForDisplay(activity) {
    return {
      id: activity.id,
      name: activity.name,
      description: activity.description,
      duration: activity.duration,
      cost: activity.cost,
      timeSlots: activity.timeSlots,
      highlights: activity.highlights,
      rating: activity.rating,
      tips: activity.tips,
      coordinates: activity.coordinates
    };
  }
}

// Create singleton instance
const destinationService = new DestinationService();

export default destinationService;
