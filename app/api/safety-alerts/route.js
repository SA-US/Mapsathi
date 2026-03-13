import { NextResponse } from 'next/server';

// Mock safety alerts database
const mockSafetyAlerts = {
  'delhi': [
    {
      id: 'delhi-pollution-1',
      type: 'pollution',
      severity: 'high',
      title: 'High Air Pollution Alert',
      message: 'AQI levels are high. Avoid prolonged outdoor activities and wear masks.',
      icon: 'alert',
      timestamp: new Date().toISOString(),
      color: 'bg-orange-500'
    },
    {
      id: 'delhi-traffic-1',
      type: 'traffic',
      severity: 'medium',
      title: 'Heavy Traffic Warning',
      message: 'Severe congestion reported on NH-48. Consider alternative routes.',
      icon: 'alert',
      timestamp: new Date().toISOString(),
      color: 'bg-yellow-500'
    }
  ],
  'mumbai': [
    {
      id: 'mumbai-flood-1',
      type: 'flood',
      severity: 'high',
      title: 'Flood Warning',
      message: 'Heavy rainfall expected. Low-lying areas may experience waterlogging.',
      icon: 'alert',
      timestamp: new Date().toISOString(),
      color: 'bg-blue-500'
    }
  ],
  'jaipur': [
    {
      id: 'jaipur-heat-1',
      type: 'heat',
      severity: 'high',
      title: 'Extreme Heat Warning',
      message: 'Temperature above 40°C. Stay hydrated and avoid sun exposure.',
      icon: 'alert',
      timestamp: new Date().toISOString(),
      color: 'bg-red-500'
    }
  ]
};

// Dynamic alert generation based on location
const generateDynamicAlerts = (lat, lon) => {
  const alerts = [];
  const timeOfDay = new Date().getHours();
  const random = Math.random();

  // Generate weather-based alerts with temperature data
  const weather = generateMockWeather(lat, lon);
  
  // Temperature-based alerts
  if (weather.temperature > 35) {
    alerts.push({
      id: `heat-${Date.now()}`,
      type: 'weather',
      severity: 'high',
      title: 'Extreme Heat Warning',
      message: `Temperature: ${weather.temperature}°C. Stay hydrated and avoid prolonged sun exposure.`,
      icon: 'thermometer',
      timestamp: new Date().toISOString(),
      color: 'bg-red-500',
      temperature: weather.temperature,
      precautions: ['Drink plenty of water', 'Avoid outdoor activities during peak hours', 'Wear light clothing']
    });
  }

  if (weather.temperature < 5) {
    alerts.push({
      id: `cold-${Date.now()}`,
      type: 'weather',
      severity: 'medium',
      title: 'Cold Weather Alert',
      message: `Temperature: ${weather.temperature}°C. Wear warm clothing and be cautious of icy conditions.`,
      icon: 'alert',
      timestamp: new Date().toISOString(),
      color: 'bg-blue-500',
      temperature: weather.temperature,
      precautions: ['Wear layers of clothing', 'Keep emergency supplies in vehicle', 'Check on elderly neighbors']
    });
  }

  // AQI-based alerts
  if (weather.aqi > 150) {
    alerts.push({
      id: `pollution-${Date.now()}`,
      type: 'pollution',
      severity: 'high',
      title: 'Poor Air Quality Alert',
      message: `AQI: ${weather.aqi}. Poor air quality detected. Limit outdoor activities.`,
      icon: 'alert',
      timestamp: new Date().toISOString(),
      color: 'bg-orange-500',
      aqi: weather.aqi,
      precautions: ['Wear N95 masks when outdoors', 'Use air purifiers indoors', 'Avoid strenuous outdoor activities']
    });
  }

  // Time-based alerts
  if (timeOfDay >= 22 || timeOfDay <= 5) {
    if (random > 0.7) {
      alerts.push({
        id: `night-safety-${Date.now()}`,
        type: 'safety',
        severity: 'medium',
        title: 'Night Safety Alert',
        message: 'Stay in well-lit areas and avoid isolated locations at night.',
        icon: 'shield',
        timestamp: new Date().toISOString(),
        color: 'bg-purple-500',
        precautions: ['Travel in groups when possible', 'Keep phone charged', 'Share your location with someone']
      });
    }
  }

  // Location-based mock alerts
  if (random > 0.8) {
    alerts.push({
      id: `local-event-${Date.now()}`,
      type: 'event',
      severity: 'low',
      title: 'Local Event Alert',
      message: 'Large public gathering nearby. Expect crowds and traffic delays.',
      icon: 'info',
      timestamp: new Date().toISOString(),
      color: 'bg-blue-500',
      precautions: ['Plan alternate routes', 'Allow extra travel time', 'Be aware of surroundings']
    });
  }

  // Random safety alerts
  if (random > 0.9) {
    const safetyAlerts = [
      {
        id: `construction-${Date.now()}`,
        type: 'construction',
        severity: 'medium',
        title: 'Road Work Alert',
        message: 'Construction work ahead. Drive carefully and follow detours.',
        icon: 'alert',
        timestamp: new Date().toISOString(),
        color: 'bg-yellow-500',
        precautions: ['Follow traffic signs', 'Expect delays', 'Use alternate routes if possible']
      },
      {
        id: `weather-${Date.now()}`,
        type: 'weather',
        severity: 'low',
        title: 'Weather Update',
        message: `Weather condition: ${weather.condition}. Plan accordingly.`,
        icon: 'cloud',
        timestamp: new Date().toISOString(),
        color: 'bg-gray-500',
        weather: weather.condition,
        precautions: getWeatherPrecautions(weather.condition)
      }
    ];
    
    alerts.push(safetyAlerts[Math.floor(Math.random() * safetyAlerts.length)]);
  }

  return alerts;
};

const generateMockWeather = (lat, lon) => {
  // Generate more realistic weather based on location
  const baseTemp = 25 + (lat > 20 ? -5 : 5); // Northern latitudes cooler
  const tempVariation = Math.sin(Date.now() / 10000000) * 10; // Time-based variation
  
  return {
    temperature: Math.round(baseTemp + tempVariation + Math.random() * 10),
    humidity: Math.round(Math.random() * 40 + 40),
    windSpeed: Math.round(Math.random() * 20 + 5),
    condition: ['clear', 'cloudy', 'rainy', 'stormy', 'foggy'][Math.floor(Math.random() * 5)],
    aqi: Math.round(Math.random() * 150 + 50),
    location: { lat, lon }
  };
};

const getWeatherPrecautions = (condition) => {
  const precautions = {
    'clear': ['Apply sunscreen', 'Stay hydrated', 'Wear sunglasses'],
    'cloudy': ['Carry light jacket', 'Stay updated on weather changes'],
    'rainy': ['Carry umbrella', 'Drive carefully', 'Avoid waterlogged areas'],
    'stormy': ['Seek shelter', 'Avoid outdoor activities', 'Stay away from windows'],
    'foggy': ['Use fog lights', 'Drive slowly', 'Increase following distance']
  };
  return precautions[condition] || ['Stay weather aware'];
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat'));
    const lon = parseFloat(searchParams.get('lon'));
    const city = searchParams.get('city')?.toLowerCase() || 'unknown';

    if (!isFinite(lat) || !isFinite(lon)) {
      return NextResponse.json(
        { ok: false, message: 'Valid latitude and longitude required' },
        { status: 400 }
      );
    }

    let alerts = [];

    // Add city-specific static alerts only if city is valid and known
    if (city && city !== 'unknown' && mockSafetyAlerts[city]) {
      alerts = [...mockSafetyAlerts[city]];
    }

    // Add dynamic alerts based on location and time
    const dynamicAlerts = generateDynamicAlerts(lat, lon);
    alerts = [...alerts, ...dynamicAlerts];

    // Sort alerts by severity
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    // Add location context to alerts
    alerts = alerts.map(alert => ({
      ...alert,
      location: { lat, lon, city: city || 'unknown' },
      distance: calculateDistanceFromCenter(lat, lon),
      // Add weather data for all alerts
      weather: generateMockWeather(lat, lon)
    }));

    return NextResponse.json({
      ok: true,
      alerts,
      total: alerts.length,
      location: { lat, lon, city },
      timestamp: new Date().toISOString(),
      weather: generateMockWeather(lat, lon)
    });

  } catch (error) {
    console.error('Safety Alerts API Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch safety alerts' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { alertType, location, severity, message, userId } = await req.json();

    // Validate required fields
    if (!alertType || !location || !severity) {
      return NextResponse.json(
        { ok: false, message: 'Alert type, location, and severity are required' },
        { status: 400 }
      );
    }

    // Create user-reported alert
    const userAlert = {
      id: `user-${Date.now()}`,
      type: alertType,
      severity,
      title: `User Reported: ${alertType.charAt(0).toUpperCase() + alertType.slice(1)}`,
      message: message || `User-reported ${alertType} in the area`,
      userId: userId || 'anonymous',
      location,
      timestamp: new Date().toISOString(),
      verified: false,
      color: getSeverityColor(severity)
    };

    // In production, save to database and notify nearby users
    console.log('User Safety Alert:', userAlert);

    // Trigger notification to nearby users (mock)
    await notifyNearbyUsers(userAlert);

    return NextResponse.json({
      ok: true,
      alert: userAlert,
      message: 'Safety alert submitted successfully'
    });

  } catch (error) {
    console.error('Safety Alert Submit Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to submit safety alert' },
      { status: 500 }
    );
  }
}

function calculateDistanceFromCenter(lat, lon) {
  // Mock distance calculation - in production, use proper geospatial queries
  return Math.round(Math.random() * 10 + 1); // 1-11 km
}

function getSeverityColor(severity) {
  switch (severity) {
    case 'critical': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
}

async function notifyNearbyUsers(alert) {
  // Mock notification system - in production, use WebSocket or push notifications
  console.log(`Notifying nearby users about alert: ${alert.id}`);
  
  // Simulate notification delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    notified: Math.floor(Math.random() * 50) + 10, // 10-60 users notified
    radius: 5 // 5km radius
  };
}
