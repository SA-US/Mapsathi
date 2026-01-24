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

    const rng = (seed) => {
      let s = seed;
      return () => (s = Math.imul(1664525, s + 1013904223) >>> 0) / 4294967296;
    };
    const seed = Math.floor((lat * 1000) ^ (lon * 1000) ^ 0x9e3779b9);
    const rand = rng(seed);

    const count = 2 + Math.floor(rand() * 4); // 2-5 crowd points
    const items = Array.from({ length: count }).map((_, i) => {
      const bearing = rand() * Math.PI * 2;
      const dist = rand() * r;
      const dLat = (dist * Math.cos(bearing)) / 111320;
      const dLon = (dist * Math.sin(bearing)) / (111320 * Math.cos((lat * Math.PI) / 180));
      const level = 1 + Math.floor(rand() * 5); // 1-5
      return {
        id: `cr-${i}`,
        lat: lat + dLat,
        lon: lon + dLon,
        level,
        title: level >= 4 ? 'High crowd' : level >= 2 ? 'Moderate crowd' : 'Low crowd',
      };
    });

    return NextResponse.json({ ok: true, items });
  } catch (e) {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
