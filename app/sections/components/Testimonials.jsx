// src/components/Testimonials.jsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

const quotes = [
  { name: 'Arjun', text: 'MapsArthi helped plan our weekend trip — smooth and beautiful maps.' },
  { name: 'Leena', text: 'Local tips were spot on. Loved the curated stops!' },
  { name: 'S.K.', text: 'Easy to use and the UI looks amazing on mobile.' },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Travelers Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <p className="text-gray-700 italic mb-4">“{q.text}”</p>
              <div className="mt-auto text-right">
                <span className="text-sm font-semibold text-sky-600">— {q.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
