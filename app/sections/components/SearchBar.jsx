'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="w-full flex justify-center px-4 -mt-12 z-20"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch?.(query); // send the search text to parent
        }}
        className="max-w-3xl w-full"
      >
        <div className="bg-white/90 backdrop-blur rounded-xl shadow-md p-3 flex items-center gap-3">
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places, cities, or coordinates"
            className="flex-1 bg-transparent outline-none px-3 py-2 text-sm md:text-base"
            aria-label="Search places"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>
      </form>
    </motion.section>
  );
}
