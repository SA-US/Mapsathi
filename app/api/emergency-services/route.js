import { NextResponse } from 'next/server';

// Mock emergency services database for major Indian cities
const emergencyServicesDB = {
  delhi: [
    { id: 'delhi-police-1', name: 'Delhi Police Headquarters', type: 'police', lat: 28.6304, lon: 77.2180, address: 'ITO, New Delhi', phone: '112', rating: 4.2, distance: 0 },
    { id: 'delhi-ambulance-1', name: 'AIIMS Emergency', type: 'ambulance', lat: 28.6139, lon: 77.2090, address: 'Ansari Nagar, New Delhi', phone: '108', rating: 4.5, distance: 0 },
    { id: 'delhi-fire-1', name: 'Delhi Fire Service HQ', type: 'fire', lat: 28.6410, lon: 77.2130, address: 'Connaught Place, New Delhi', phone: '101', rating: 4.0, distance: 0 },
    { id: 'delhi-hospital-1', name: 'Safdarjung Hospital', type: 'hospital', lat: 28.6093, lon: 77.2112, address: 'Safdarjung Enclave, New Delhi', phone: '011-26704000', rating: 4.1, distance: 0 }
  ],
  mumbai: [
    { id: 'mumbai-police-1', name: 'Mumbai Police Commissioner', type: 'police', lat: 19.0760, lon: 72.8777, address: 'CST, Mumbai', phone: '112', rating: 4.3, distance: 0 },
    { id: 'mumbai-ambulance-1', name: 'KEM Hospital Emergency', type: 'ambulance', lat: 19.0147, lon: 72.8340, address: 'Parel, Mumbai', phone: '108', rating: 4.4, distance: 0 },
    { id: 'mumbai-fire-1', name: 'Mumbai Fire Brigade HQ', type: 'fire', lat: 19.0760, lon: 72.8777, address: 'Byculla, Mumbai', phone: '101', rating: 4.1, distance: 0 }
  ],
  jaipur: [
    { id: 'jaipur-police-1', name: 'Jaipur Police Commissioner', type: 'police', lat: 26.9124, lon: 75.7873, address: 'Civil Lines, Jaipur', phone: '112', rating: 4.0, distance: 0 },
    { id: 'jaipur-ambulance-1', name: 'SMS Hospital Emergency', type: 'ambulance', lat: 26.9147, lon: 75.7885, address: 'Tonk Road, Jaipur', phone: '108', rating: 4.3, distance: 0 },
    { id: 'jaipur-fire-1', name: 'Jaipur Fire Service', type: 'fire', lat: 26.9124, lon: 75.7873, address: 'Rajasthan, Jaipur', phone: '101', rating: 3.9, distance: 0 }
  ]
};

// Generic emergency services for other cities
const genericServices = [
  { id: 'generic-police-1', name: 'Local Police Station', type: 'police', phone: '112', rating: 4.0 },
  { id: 'generic-ambulance-1', name: 'Emergency Medical Services', type: 'ambulance', phone: '108', rating: 4.2 },
  { id: 'generic-fire-1', name: 'Fire Brigade', type: 'fire', phone: '101', rating: 3.8 },
  { id: 'generic-women-1', name: 'Women Helpline', type: 'women', phone: '1091', rating: 4.5 }
];

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat'));
    const lon = parseFloat(searchParams.get('lon'));
    const type = searchParams.get('type'); // police, ambulance, fire, hospital, women
    const radius = Math.min(parseInt(searchParams.get('radius') || '10000', 10), 50000); // 10km max default
    const city = searchParams.get('city')?.toLowerCase();

    if (!isFinite(lat) || !isFinite(lon)) {
      return NextResponse.json(
        { ok: false, message: 'Valid latitude and longitude required' },
        { status: 400 }
      );
    }

    let services = [];

    // Get city-specific services if available
    if (city && emergencyServicesDB[city]) {
      services = [...emergencyServicesDB[city]];
      
      // Calculate distances
      services = services.map(service => ({
        ...service,
        distance: calculateDistance(lat, lon, service.lat, service.lon)
      }));
    } else {
      // Generate generic services with mock locations
      services = generateGenericServices(lat, lon, type);
    }

    // Filter by type if specified
    if (type && type !== 'all') {
      services = services.filter(service => service.type === type);
    }

    // Filter by radius
    services = services.filter(service => service.distance <= radius);

    // Sort by distance and rating
    services.sort((a, b) => {
      if (a.distance !== b.distance) {
        return a.distance - b.distance;
      }
      return b.rating - a.rating;
    });

    // Add additional helpful information
    services = services.map(service => ({
      ...service,
      estimatedArrival: estimateArrivalTime(service.distance, service.type),
      isOpen: isServiceOpen(service.type),
      specialties: getServiceSpecialties(service.type),
      directions: `https://www.google.com/maps/dir/?api=1&destination=${service.lat},${service.lon}`
    }));

    return NextResponse.json({
      ok: true,
      services,
      total: services.length,
      location: { lat, lon, city },
      searchRadius: radius,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Emergency Services API Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to fetch emergency services' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { serviceId, userId, emergencyType, location, description } = await req.json();

    // Validate required fields
    if (!serviceId || !emergencyType || !location) {
      return NextResponse.json(
        { ok: false, message: 'Service ID, emergency type, and location are required' },
        { status: 400 }
      );
    }

    // Create emergency request
    const emergencyRequest = {
      id: `req-${Date.now()}`,
      serviceId,
      userId: userId || 'anonymous',
      emergencyType,
      location,
      description,
      status: 'dispatched',
      createdAt: new Date().toISOString(),
      estimatedArrival: '5-15 minutes'
    };

    // Log emergency request (in production, save to database)
    console.log('Emergency Service Request:', emergencyRequest);

    // Simulate service notification
    await notifyEmergencyService(serviceId, emergencyRequest);

    return NextResponse.json({
      ok: true,
      request: emergencyRequest,
      message: 'Emergency service has been notified and is on the way'
    });

  } catch (error) {
    console.error('Emergency Service Request Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to request emergency service' },
      { status: 500 }
    );
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

function generateGenericServices(lat, lon, type) {
  const services = [];
  const types = type ? [type] : ['police', 'ambulance', 'fire', 'hospital', 'women'];
  
  types.forEach(serviceType => {
    // Generate 2-3 services of each type within 10km
    const count = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 8 + 1; // 1-9 km
      
      const serviceLat = lat + (distance * Math.cos(angle)) / 111.32;
      const serviceLon = lon + (distance * Math.sin(angle)) / (111.32 * Math.cos(lat * Math.PI / 180));
      
      const genericService = genericServices.find(s => s.type === serviceType);
      
      services.push({
        ...genericService,
        id: `${serviceType}-${Date.now()}-${i}`,
        lat: serviceLat,
        lon: serviceLon,
        address: generateMockAddress(),
        distance: Math.round(distance * 100) / 100,
        rating: Math.round((Math.random() * 1.5 + 3) * 10) / 10 // 3.0-4.5 rating
      });
    }
  });
  
  return services;
}

function generateMockAddress() {
  const streets = ['Main Street', 'Hospital Road', 'Emergency Lane', 'Service Avenue', 'Safety Boulevard'];
  const areas = ['City Center', 'Civil Lines', 'Main Market', 'Station Area', 'Court Road'];
  return `${Math.floor(Math.random() * 999) + 1}, ${streets[Math.floor(Math.random() * streets.length)]}, ${areas[Math.floor(Math.random() * areas.length)]}`;
}

function estimateArrivalTime(distance, serviceType) {
  const speedKmh = {
    police: 40,    // Police can navigate traffic better
    ambulance: 35, // Ambulances have right of way but are cautious
    fire: 30,      // Fire trucks are slower
    hospital: 25,  // Hospital services are more routine
    women: 40      // Women helpline often coordinates existing police
  };
  
  const avgSpeed = speedKmh[serviceType] || 35;
  const timeMinutes = Math.ceil((distance / avgSpeed) * 60);
  
  if (timeMinutes <= 5) return '2-5 minutes';
  if (timeMinutes <= 10) return '5-10 minutes';
  if (timeMinutes <= 20) return '10-20 minutes';
  return `${timeMinutes-5}-${timeMinutes+5} minutes`;
}

function isServiceOpen(serviceType) {
  // Most emergency services are 24/7
  const alwaysOpen = ['police', 'ambulance', 'fire', 'women'];
  return alwaysOpen.includes(serviceType);
}

function getServiceSpecialties(serviceType) {
  const specialties = {
    police: ['Emergency Response', 'Traffic Control', 'Crime Investigation', 'Public Safety'],
    ambulance: ['Emergency Medical Care', 'First Aid', 'Patient Transport', 'Medical Response'],
    fire: ['Fire Suppression', 'Rescue Operations', 'Hazard Control', 'Emergency Evacuation'],
    hospital: ['Emergency Medicine', 'Trauma Care', 'Surgical Services', 'Diagnostic Services'],
    women: ['Women Safety', 'Domestic Violence', 'Legal Assistance', 'Counseling Services']
  };
  
  return specialties[serviceType] || ['Emergency Services'];
}

async function notifyEmergencyService(serviceId, request) {
  // Mock notification to emergency service
  console.log(`Notifying emergency service ${serviceId} about request ${request.id}`);
  
  // Simulate notification delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    notified: true,
    serviceId,
    requestId: request.id,
    timestamp: new Date().toISOString()
  };
}
