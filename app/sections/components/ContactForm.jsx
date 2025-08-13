'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const topics = [
  { value: 'sales', label: 'Contact Sales' },
  { value: 'support', label: 'Support' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'general', label: 'General' },
];

export default function ContactForm({ source = 'contact-page' }) {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('sales');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, topic, source, website: '' }), // website is honeypot (empty)
      });

      const data = await res.json();
      if (!res.ok) {
        const firstError =
          data?.errors?.fieldErrors &&
          Object.values(data.errors.fieldErrors).flat()[0];
        throw new Error(firstError || data?.message || 'Please check the form');
      }

      toast.success('Thanks! We’ll get back to you shortly.');
      setForm({ name: '', email: '', phone: '', message: '' });
      setTopic('sales');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative">
      {/* animated gradient halo */}
      <div className="pointer-events-none absolute inset-0 blur-3xl opacity-30"
           aria-hidden
           style={{
             background: 'radial-gradient(600px circle at 20% 10%, #38bdf8, transparent 35%), radial-gradient(600px circle at 80% 30%, #0ea5e9, transparent 35%)'
           }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-3xl rounded-2xl border border-sky-100 bg-white/80 backdrop-blur shadow-xl"
      >
        {/* Tabs */}
        <div className="flex gap-2 p-2">
          {topics.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTopic(t.value)}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition
                ${topic === t.value
                  ? 'bg-sky-600 text-white shadow'
                  : 'bg-white text-sky-700 hover:bg-sky-50 border border-sky-100'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Your name">
              <input
                name="name" value={form.name} onChange={onChange} required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 outline-none focus:border-sky-400"
                placeholder="Arjun Sharma"
              />
            </Field>
            <Field label="Email">
              <input
                type="email" name="email" value={form.email} onChange={onChange} required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 outline-none focus:border-sky-400"
                placeholder="you@example.com"
              />
            </Field>
          </div>

          <Field label="Phone (optional)">
            <input
              name="phone" value={form.phone} onChange={onChange}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 outline-none focus:border-sky-400"
              placeholder="+91 98xxxxxx"
            />
          </Field>

          <Field label="How can we help?">
            <textarea
              name="message" value={form.message} onChange={onChange} required rows={5}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 outline-none focus:border-sky-400"
              placeholder="Tell us a bit about your plans…"
            />
          </Field>

          {/* Honeypot (hidden) */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white shadow hover:bg-sky-700 disabled:opacity-60"
          >
            {loading
              ? (<span className="inline-flex items-center gap-2">
                  <Spinner /> Sending…
                 </span>)
              : 'Send message'}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-sky-700">{label}</span>
      {children}
    </label>
  );
}

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}
