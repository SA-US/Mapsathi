'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CTABanner() {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-12 px-4"
    >
      <div className="max-w-7xl mx-auto bg-sky-600 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold">Ready to explore?</h3>
          <p className="text-sm md:text-base text-white/90">
            Create a free map and start your adventure in minutes.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            className="bg-white text-sky-600 hover:bg-white/90"
          >
            Create Map
          </Button>
          <Button
            variant="outline"
            className="bg-white text-sky-600 hover:bg-white/90"
            onClick={() => router.push('/Pages/ContactForm')}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
