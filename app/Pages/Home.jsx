'use client';
import React from 'react';
import Navbar from '../sections/navbar';
import HeroSection from './HeroSection';
import { SearchBar } from '../sections/components/SearchBar';
import FeaturedDestinations from '../sections/components/FeaturedDestinations';
import PlanSteps from '../sections/components/PlanSteps';
import Testimonials from '../sections/components/Testimonials';
import CTABanner from '../sections/components/CTABanner';
import Footer from '../sections/footer';
import MapPreview from '../sections/components/MapPreview';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '@/app/styles/toastStyles.css';
// import { toastOptions } from '@/lib/toastConfig';
// Example city list (should match your maps data)
const CITIES = [
  { id: 'delhi', name: 'Delhi' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'jaipur', name: 'Jaipur' },
  { id: 'varanasi', name: 'Varanasi' },
  { id: 'bengaluru', name: 'Bengaluru' },
  { id: 'chennai', name: 'Chennai' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'pune', name: 'Pune' },
  { id: 'goa', name: 'Goa' },
  { id: 'amritsar', name: 'Amritsar' },
  { id: 'ahmedabad', name: 'Ahmedabad' },
  { id: 'udaipur', name: 'Udaipur' }
];

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (query) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;

    const foundCity = CITIES.find((c) => c.id === normalized);

    if (!foundCity) {
      toast.error(`"${query}" is unavailable for now.`);
      return;
    }

    router.push(`/Pages/maps?city=${normalized}`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <SearchBar onSearch={handleSearch} />
      <FeaturedDestinations />
      <PlanSteps />
      <MapPreview />
      <Testimonials />
      <CTABanner />
      <Footer />

      {/* Toastify container */}
      <ToastContainer />
    </div>
  );
}
