'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MapPreview() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Interactive Map Preview</h2>
          <p className="text-gray-600 mb-4">See popular hotspots and recommended routes. Click a marker to expand details.</p>
          <ul className="space-y-3">
            <li className="bg-white rounded-lg p-4 shadow">📍 Riverside Walk — 3 stops — 2.1 km</li>
            <li className="bg-white rounded-lg p-4 shadow">📍 Old Town Heritage Loop — 5 stops — 4.2 km</li>
            <li className="bg-white rounded-lg p-4 shadow">📍 Coastal Sunrise Route — 2 stops — 1.3 km</li>
          </ul>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative w-full h-72 rounded-lg overflow-hidden shadow">
          <Image src="/images/8.png" alt="map preview" fill className="object-cover" />
          {/* Mock marker examples positioned via absolute; in a real app you'd render markers dynamically */}
          <div className="absolute top-8 left-10 bg-white rounded-full p-1 shadow">📍</div>
          <div className="absolute top-28 left-40 bg-white rounded-full p-1 shadow">📍</div>
        </motion.div>
      </div>
    </section>
  );
}