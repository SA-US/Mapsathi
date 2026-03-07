'use client';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '@/app/sections/navbar';
import Footer from '@/app/sections/footer';
import { motion } from 'framer-motion';
import { getCityData } from '@/data/cityData';
import { Suspense } from 'react';

const ClientSideMap = dynamic(() => import('@/app/ClientSideMap'), { ssr: false });

function MapsPageContent() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('city') || 'delhi';
  const cityData = getCityData(cityParam);

  if (!cityData) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-sky-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">City Not Found</h1>
            <p className="text-gray-600 mb-4">The city "{cityParam}" is not available.</p>
            <a 
              href="/Pages/maps?city=delhi" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Delhi
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-sky-100">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.header
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-sky-700">
              {cityData?.name || 'City'} Maps
            </h1>
            <p className="text-gray-600 mt-2">
              Explore {cityData?.description || 'this beautiful city'} with interactive reviews and ratings.
            </p>
          </motion.header>

          <div style={{ height: '600px', width: '100%' }}>
            <ClientSideMap cityData={cityData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function MapsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapsPageContent />
    </Suspense>
  );
}
