export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const VALID_AREAS = [
  'Rutherfordton', 'Spindale', 'Forest City',
  'Lake Lure', 'Tryon', 'Morganton', 'Other',
];

// Initialize rate limiter only if Upstash is configured
const redisUrl   = import.meta.env.UPSTASH_REDIS_REST_URL;
const redisToken = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit = redisUrl && redisToken
  ? new Ratelimit({
      redis: new Redis({ url: redisUrl, token: redisToken }),
      limiter: Ratelimit.slidingWindow(5, '1 m'),
      analytics: false,
    })
  : null;

export const POST: APIRoute = async ({ request }) => {
  // ── Rate limiting ────────────────────────────────────────────
  if (ratelimit) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      'anonymous';
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new Response(
        JSON.stringify({ error: 'rate_limited' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  const body = await request.json();
  const { firstName, lastName, phone, area, message, website } = body;

  // ── Honeypot ─────────────────────────────────────────────────
  if (website) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── Input validation ─────────────────────────────────────────
  const invalid =
    !firstName || typeof firstName !== 'string' || firstName.trim().length > 50 ||
    !lastName  || typeof lastName  !== 'string' || lastName.trim().length  > 50 ||
    !phone     || typeof phone     !== 'string' || phone.trim().length     > 20 ||
    !area      || !VALID_AREAS.includes(area)                                   ||
    (message && (typeof message !== 'string' || message.length > 1000));

  if (invalid) {
    return new Response(
      JSON.stringify({ error: 'validation_failed' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── Send email ───────────────────────────────────────────────
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Luxe Glow <contact@luxeglowtanning.com>',
      replyTo: 'miss.ruh07@gmail.com',
      to: 'miss.ruh07@gmail.com',
      subject: `New Booking Request — ${firstName.trim()} ${lastName.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
          <h2 style="margin: 0 0 24px; font-size: 22px; color: #111;">New Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 13px; color: #666; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #111;">${firstName.trim()} ${lastName.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 13px; color: #666; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #111;">${phone.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 13px; color: #666; vertical-align: top;">Area</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #111;">${area}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-size: 13px; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; font-size: 14px; color: #111; white-space: pre-wrap;">${message?.trim() || '—'}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Resend error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
