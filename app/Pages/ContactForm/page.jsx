'use client';
import Navbar from '@/app/sections/navbar';
import Footer from '@/app/sections/footer';
import ContactForm from '@/app/sections/components/ContactForm';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-1 px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl py-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-sky-700 mb-2">
            Let’s plan something amazing
          </h1>
          <p className="text-gray-600 mb-8">
            Tell us about your trip or requirements. Our team usually responds within 24 hours.
          </p>
          <ContactForm source="contact-page" />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
