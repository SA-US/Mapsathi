'use client';
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { title: 'Search', desc: 'Find a place, city or coordinates.' },
  { title: 'Select', desc: 'Add attractions and custom stops.' },
  { title: 'Navigate', desc: 'Use your tailored map on the go.' },
];

export default function PlanSteps() {
  return (
    <section className="py-12 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Plan your trip in 3 simple steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="text-xl font-bold text-sky-500 mb-2">{i + 1}</div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
