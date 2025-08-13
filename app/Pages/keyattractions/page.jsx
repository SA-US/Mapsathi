'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/sections/navbar';
import Footer from '@/app/sections/footer';
import { fadeInUp, staggerContainer } from '@/lib/motionVariants';
import { Card, CardContent } from '@/components/ui/card';

export default function KeyAttractionsPage() {
  const attractions = [
    {
      name: 'Sunset Point',
      img: '/images/4.png',
      desc: 'Breathtaking views of the valley at dusk.',
    },
    {
      name: 'Crystal Lake',
      img: '/images/5.png',
      desc: 'Clear waters surrounded by lush greenery.',
    },
    {
      name: 'Old Town Market',
      img: '/images/6.png',
      desc: 'A bustling spot for local crafts and delicacies.',
    },
    {
      name: 'Skyline View Deck',
      img: '/images/7.png',
      desc: 'Panoramic sights of the city lights at night.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-blue-100">
      <Navbar />

      {/* Hero */}
      <motion.section
        className="py-20 text-center "
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-sky-700">
          Key Attractions
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Discover the most captivating spots and hidden gems in our curated destinations.
        </p>
      </motion.section>

      {/* Grid of attractions */}
      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-6 max-w-7xl mx-auto mb-20 h-[40vh]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {attractions.map((place, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="overflow-hidden rounded-xl shadow-lg group cursor-pointer">
              <div className="relative h-60 overflow-hidden">
                <motion.img
                  src={place.img}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h3 className="text-lg font-semibold">{place.name}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600">{place.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Footer 
      className="mt-auto"
      />
    </div>
  );
}
