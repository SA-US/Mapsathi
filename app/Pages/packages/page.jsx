
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/sections/navbar';
import Footer from '@/app/sections/footer';
import { fadeInUp, staggerContainer } from '@/lib/motionVariants';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PackagesPage() {
  const packages = [
    {
      title: 'Weekend Escape',
      desc: '2 nights, 3 days with curated maps and local experiences.',
      price: '$199',
    },
    {
      title: 'Mountain Explorer',
      desc: '5 nights, 6 days trekking with experienced guides.',
      price: '$599',
    },
    {
      title: 'City Discoverer',
      desc: '3 nights exploring urban gems and cultural hotspots.',
      price: '$299',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-sky-100">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="py-20 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-sky-700">
          Our Travel Packages
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Hand-picked journeys to make your travels seamless, exciting, and memorable.
        </p>
      </motion.section>

      {/* Packages Grid */}
      <motion.div
        className="grid gap-8 md:grid-cols-3 px-6 max-w-6xl mx-auto mb-20 h-[40vh]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {packages.map((pkg, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="shadow-lg hover:shadow-xl transition duration-300 hover:scale-105">
              <CardHeader className="text-xl font-semibold text-sky-600">
                {pkg.title}
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{pkg.desc}</p>
                <p className="mt-4 font-bold text-sky-700">{pkg.price}</p>
                <Button className="mt-6 w-full bg-sky-600 hover:bg-sky-700">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Footer />
    </div>
  );
}
