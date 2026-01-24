import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  topic: z.enum(['sales', 'support', 'partnership', 'general']),
  message: z.string().min(10, 'Please add a bit more detail'),
  source: z.string().optional(),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }
    // Database creation removed
    return NextResponse.json({ ok: true, message: 'Contact form processed' }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
