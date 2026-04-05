export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  const { firstName, lastName, phone, area, message } = await request.json();

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Luxe Glow <contact@luxeglowtanning.com>',
      replyTo: 'miss.ruh07@gmail.com',
      to: 'miss.ruh07@gmail.com',
      subject: `New Booking Request — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
          <h2 style="margin: 0 0 24px; font-size: 22px; color: #111;">New Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 13px; color: #666; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #111;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 13px; color: #666; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #111;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 13px; color: #666; vertical-align: top;">Area</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #111;">${area}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-size: 13px; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; font-size: 14px; color: #111; white-space: pre-wrap;">${message || '—'}</td>
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
