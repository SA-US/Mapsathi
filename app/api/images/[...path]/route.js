import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { path } = params;
  
  // For demo purposes, return a simple SVG placeholder
  const svgPlaceholder = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280" font-family="Arial, sans-serif" font-size="16">
        ${path.join(' / ')}
      </text>
    </svg>
  `;
  
  return new NextResponse(svgPlaceholder, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
