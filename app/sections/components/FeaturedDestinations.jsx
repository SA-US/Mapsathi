'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const items = [
  { title: 'Riverside Escapes', image: '/images/4.png', tag: 'Top' },
  { title: 'Historic Trails', image: '/images/5.png', tag: 'New' },
  { title: 'Coastal Wonders', image: '/images/6.png', tag: 'Popular' },
  { title: 'Mountain Routes', image: '/images/7.png', tag: 'Adventure' },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Featured Destinations</h2>
        <p className="text-gray-600 mb-6 max-w-2xl">Hand-picked spots and routes curated by local explorers. Click any card to view details and add to your map.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg focus:ring-2 focus:ring-sky-300"
            >
              <div className="relative h-44 w-full">
                <Image src={it.image} alt={it.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/80 text-xs font-medium">{it.tag}</span>
              </div>
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold mb-1">{it.title}</h3>
                <p className="text-sm text-gray-500">Short enticing description about this place to make users click and explore.</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
