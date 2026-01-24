import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat'));
    const lon = parseFloat(searchParams.get('lon'));
    const r = Math.min(parseInt(searchParams.get('r') || '500', 10), 3000);
    if (!isFinite(lat) || !isFinite(lon)) {
      return NextResponse.json({ ok: false, message: 'lat/lon required' }, { status: 400 });
    }

    // Generate a few mock hazards near the destination within radius r
    const rng = (seed) => {
      let s = seed;
      return () => (s = Math.imul(48271, s) >>> 0) / 4294967296;
    };
    const seed = Math.floor((lat * 1000) ^ (lon * 1000));
    const rand = rng(seed);

    const count = 1 + Math.floor(rand() * 3); // 1-3 hazards
    const hazards = Array.from({ length: count }).map((_, i) => {
      const bearing = rand() * Math.PI * 2;
      const dist = rand() * r; // meters
      const dLat = (dist * Math.cos(bearing)) / 111320; // deg per meter approx
      const dLon = (dist * Math.sin(bearing)) / (111320 * Math.cos((lat * Math.PI) / 180));
      const types = ['accident', 'roadwork', 'flooded', 'blocked'];
      const t = types[Math.floor(rand() * types.length)];
      return {
        id: `hz-${i}`,
        lat: lat + dLat,
        lon: lon + dLon,
        type: t,
        title: t.charAt(0).toUpperCase() + t.slice(1),
        severity: 1 + Math.floor(rand() * 3),
      };
    });

    return NextResponse.json({ ok: true, items: hazards });
  } catch (e) {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
