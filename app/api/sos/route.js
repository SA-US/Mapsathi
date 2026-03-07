import { NextResponse } from 'next/server';

// Mock emergency services database
const emergencyServices = {
  police: { number: '112', responseTime: '5-10 minutes' },
  ambulance: { number: '108', responseTime: '8-15 minutes' },
  fire: { number: '101', responseTime: '7-12 minutes' },
  women: { number: '1091', responseTime: '5-10 minutes' }
};

// Mock emergency contacts storage (in production, use a proper database)
let emergencyAlerts = [];

export async function POST(req) {
  try {
    const { location, timestamp, type, userId } = await req.json();

    // Validate required fields
    if (!location || !location.lat || !location.lon) {
      return NextResponse.json(
        { ok: false, message: 'Location coordinates are required' },
        { status: 400 }
      );
    }

    // Create emergency alert
    const alert = {
      id: `sos-${Date.now()}`,
      userId: userId || 'anonymous',
      location,
      timestamp,
      type: type || 'emergency',
      status: 'active',
      notifiedServices: [],
      createdAt: new Date().toISOString()
    };

    // Store alert (in production, save to database)
    emergencyAlerts.push(alert);

    // Find nearest emergency services (mock implementation)
    const nearestServices = findNearestEmergencyServices(location);
    
    // Simulate notifying emergency services
    const notifiedServices = await notifyEmergencyServices(alert, nearestServices);

    // Update alert with notified services
    alert.notifiedServices = notifiedServices;
    alert.status = 'dispatched';

    // Log the emergency for monitoring
    console.log('🚨 EMERGENCY ALERT:', {
      id: alert.id,
      location,
      timestamp,
      servicesNotified: notifiedServices.length
    });

    return NextResponse.json({
      ok: true,
      alertId: alert.id,
      message: 'Emergency services have been notified',
      servicesNotified: notifiedServices,
      estimatedArrival: calculateETA(nearestServices),
      safetyInstructions: getSafetyInstructions(type)
    });

  } catch (error) {
    console.error('SOS API Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to process emergency request' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const alertId = searchParams.get('alertId');

    if (alertId) {
      // Get specific alert status
      const alert = emergencyAlerts.find(a => a.id === alertId);
      if (!alert) {
        return NextResponse.json(
          { ok: false, message: 'Alert not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ ok: true, alert });
    } else {
      // Get all active alerts (for monitoring)
      const activeAlerts = emergencyAlerts.filter(a => a.status === 'active');
      return NextResponse.json({ 
        ok: true, 
        alerts: activeAlerts,
        total: activeAlerts.length 
      });
    }
  } catch (error) {
    console.error('SOS GET Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to retrieve alert information' },
      { status: 500 }
    );
  }
}

function findNearestEmergencyServices(location) {
  // Mock implementation - in production, use real geolocation data
  return [
    {
      type: 'police',
      name: 'Central Police Station',
      distance: Math.round(Math.random() * 5 + 1), // 1-6 km
      phone: emergencyServices.police.number,
      estimatedArrival: emergencyServices.police.responseTime
    },
    {
      type: 'ambulance',
      name: 'City Hospital Emergency',
      distance: Math.round(Math.random() * 8 + 2), // 2-10 km
      phone: emergencyServices.ambulance.number,
      estimatedArrival: emergencyServices.ambulance.responseTime
    }
  ];
}

async function notifyEmergencyServices(alert, services) {
  // Mock notification - in production, integrate with real emergency systems
  const notified = [];
  
  for (const service of services) {
    // Simulate API call to emergency service
    await new Promise(resolve => setTimeout(resolve, 100));
    
    notified.push({
      ...service,
      notifiedAt: new Date().toISOString(),
      alertId: alert.id,
      status: 'dispatched'
    });
  }

  return notified;
}

function calculateETA(services) {
  // Return the earliest arrival time
  const times = services.map(s => parseInt(s.estimatedArrival.split('-')[0]));
  const minTime = Math.min(...times);
  return `${minTime}-${minTime + 5} minutes`;
}

function getSafetyInstructions(type) {
  const instructions = {
    emergency: [
      'Stay calm and move to a safe location',
      'Keep your phone accessible and charged',
      'Follow operator instructions carefully',
      'Provide clear location details'
    ],
    medical: [
      'Do not move injured persons unless necessary',
      'Apply basic first aid if trained',
      'Keep airway clear',
      'Wait for medical professionals'
    ],
    accident: [
      'Check for injuries and call for help',
      'Move to safety if possible',
      'Document the scene if safe',
      'Exchange information if involved'
    ],
    crime: [
      'Move to a safe, public area',
      'Call police immediately',
      'Do not confront suspects',
      'Preserve evidence if possible'
    ]
  };

  return instructions[type] || instructions.emergency;
}
