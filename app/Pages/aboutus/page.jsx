'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/sections/navbar';
import Footer from '@/app/sections/footer';
import { fadeInUp, staggerContainer } from '@/lib/motionVariants';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const timeline = [
    { year: '2021', title: 'Idea Sparks', desc: 'The concept for MapSathi was born during a late-night road trip planning session.' },
    { year: '2022', title: 'First Prototype', desc: 'We built our first working version and tested it with a small group of travelers.' },
    { year: '2023', title: 'Public Launch', desc: 'MapSathi went live, offering curated travel experiences for everyone.' },
    { year: '2024', title: 'Expanding Horizons', desc: 'We partnered with local guides to bring more authentic experiences.' },
  ];

  const team = [
    { name: 'Aarav', role: 'Founder & CEO', img: '/images/team1.jpg' },
    { name: 'Meera', role: 'Lead Designer', img: '/images/team2.jpg' },
    { name: 'Rohan', role: 'Head of Development', img: '/images/team3.jpg' },
    { name: 'Sanya', role: 'Marketing Lead', img: '/images/team4.jpg' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-blue-100">
      <Navbar />

      {/* Hero */}
      <motion.section
        className="py-20 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-sky-700">
          About Us
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          The story of MapSathi — from a road trip dream to a travel companion for thousands.
        </p>
      </motion.section>

      {/* Timeline */}
      <motion.section
        className="max-w-4xl mx-auto px-6 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="relative pl-8 mb-12"
          >
            {/* Line */}
            {i !== timeline.length - 1 && (
              <div className="absolute left-3 top-6 w-0.5 h-full bg-sky-400"></div>
            )}
            {/* Dot */}
            <div className="absolute left-0 top-4 w-6 h-6 rounded-full bg-sky-500 border-4 border-white shadow"></div>

            <h3 className="text-xl font-bold text-sky-700">{item.year} — {item.title}</h3>
            <p className="text-gray-600 mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="max-w-7xl mx-auto px-6 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-sky-700">Meet the Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="overflow-hidden rounded-xl shadow-lg group cursor-pointer bg-white">
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-sky-700">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
