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
        color: 'bg-purple-500'
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
      color: 'bg-blue-500'
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
        color: 'bg-yellow-500'
      },
      {
        id: `weather-${Date.now()}`,
        type: 'weather',
        severity: 'low',
        title: 'Weather Update',
        message: 'Light rain expected. Carry an umbrella if traveling.',
        icon: 'cloud',
        timestamp: new Date().toISOString(),
        color: 'bg-gray-500'
      }
    ];
    
    alerts.push(safetyAlerts[Math.floor(Math.random() * safetyAlerts.length)]);
  }

  return alerts;
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat'));
    const lon = parseFloat(searchParams.get('lon'));
    const city = searchParams.get('city')?.toLowerCase();

    if (!isFinite(lat) || !isFinite(lon)) {
      return NextResponse.json(
        { ok: false, message: 'Valid latitude and longitude required' },
        { status: 400 }
      );
    }

    let alerts = [];

    // Add city-specific static alerts
    if (city && mockSafetyAlerts[city]) {
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
      distance: calculateDistanceFromCenter(lat, lon)
    }));

    return NextResponse.json({
      ok: true,
      alerts,
      total: alerts.length,
      location: { lat, lon, city },
      timestamp: new Date().toISOString()
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
