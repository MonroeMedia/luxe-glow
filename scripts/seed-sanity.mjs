/**
 * Sanity seed script — Luxe Glow
 * Creates/updates siteSettings and the home page document with all section content.
 * Run: node scripts/seed-sanity.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse .env manually (no dotenv dependency)
const envPath = resolve(__dirname, '../.env');
const envVars = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const projectId = envVars.PUBLIC_SANITY_PROJECT_ID ?? envVars.SANITY_PROJECT_ID;
const dataset   = envVars.PUBLIC_SANITY_DATASET ?? envVars.SANITY_DATASET ?? 'production';
const token     = envVars.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_API_TOKEN in .env');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false });

// ─── Site Settings ────────────────────────────────────────────

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  businessName: 'Luxe Glow Spray Tans',
  logoText: 'LUXE GLOW',
  tagline: 'Flawless, Natural-Looking Color — Every Time',
  phone: '(828) 429-4759',
  email: 'miss.ruh07@gmail.com',
  streetAddress: '119 N Street',
  city: 'Rutherfordton',
  state: 'NC',
  address: '119 N Street, Rutherfordton, NC',
  serviceAreas: ['Rutherfordton', 'Spindale', 'Forest City', 'Lake Lure', 'Tryon', 'Morganton'],
  ctaLabel: 'Book a Session',
  ctaDestination: '/#contact',
  copyrightText: `© ${new Date().getFullYear()} Luxe Glow. All rights reserved.`,
  social: {
    instagram: null,
    facebook: null,
    twitter: null,
  },
};

// ─── Home Page Sections ───────────────────────────────────────

const sections = [
  {
    _type: 'heroBlock',
    _key: 'hero',
    eyebrow: "Rutherfordton's Premier Spray Tan Studio",
    h1: 'Spray Tans in',
    h1Italic: 'Rutherfordton',
    subtext: 'Offering spray tans and mobile spray tans in Rutherfordton and surrounding areas\u00A0\u2014 flawless, streak-free color that never pulls orange.',
    primaryCtaLabel: 'Book a Session',
    primaryCtaDestination: '/#contact',
    secondaryCtaLabel: 'See How It Works',
    secondaryCtaDestination: '/#prep',
  },
  {
    _type: 'prepBlock',
    _key: 'prep',
    eyebrow: 'Preparation',
    heading: 'Before Your Appointment',
    subtext: 'The secret to a flawless, long-lasting tan starts at least 24 hours before you walk in. Follow these three steps and your results will speak for themselves.',
    cards: [
      { _key: 'shave', num: '01', title: 'Shave', body: 'Shave at least 24 hours prior to your appointment. Shaving immediately before can open pores and cause the solution to appear patchy or uneven. Giving your skin time to settle ensures a smooth, even canvas.' },
      { _key: 'exfoliate', num: '02', title: 'Exfoliate', body: 'Use a gentle body scrub or exfoliating mitt to remove dead skin cells \u2014 paying extra attention to rough areas like elbows, knees, and ankles. This step is the single biggest factor in how evenly your tan develops and how long it lasts.' },
      { _key: 'moisturize', num: '03', title: 'Moisturize', body: 'After exfoliating, apply a lightweight oil-free moisturizer to any dry or rough patches. Hydrated skin absorbs the solution more evenly. Do this the night before \u2014 not day-of \u2014 so no residue interferes with your tan.' },
    ],
    calloutLabel: 'Important:',
    calloutText: 'All three of these steps should be completed at least 24 hours before your appointment \u2014 not the morning of. Day-of barriers on the skin affect how the solution adheres.',
  },
  {
    _type: 'dayOfBlock',
    _key: 'dayof',
    eyebrow: 'Day of Appointment',
    heading: 'Arrive Ready to Glow',
    subtext: 'On the day of your session, a little preparation goes a long way. Keep your skin completely barrier-free so the solution can do its job.',
    steps: [
      { _key: 'barriers', num: '1', title: 'No Barriers on Skin', body: 'Arrive with clean product-free skin. Skip the lotion, perfume, deodorant, and makeup. Even lightweight products create a barrier that prevents the solution from bonding evenly \u2014 and no one wants a patchy tan.' },
      { _key: 'clothing', num: '2', title: 'Wear Loose Dark Clothing', body: 'Bring loose-fitting clothes to change into after your session. Tight clothing can cause the solution to rub, crease, or transfer before it sets. Dark fabrics are your best friend on spray tan day.' },
      { _key: 'undergarments', num: '3', title: 'Appropriate Undergarments', body: 'Wear or bring minimal undergarments for your session \u2014 a thong or swimsuit bottom works great. Full coverage during application leads to visible tan lines. Whatever you are comfortable with is what we will work with.' },
    ],
    ctaLabel: 'Book a Session',
    ctaDestination: '/#contact',
  },
  {
    _type: 'postTanBlock',
    _key: 'posttan',
    eyebrow: 'After Care',
    heading: 'Protect Your Investment',
    subtext: 'How you treat your tan in the first 24 hours determines how beautiful and long-lasting it will be. Follow these steps and your glow will thank you.',
    steps: [
      { _key: 'rinse', num: '1', title: 'Rinse at the Right Time', body: 'Your technician will let you know your development window. When it is time, rinse with warm water \u2014 never hot. Hot water opens pores and accelerates fading. Keep it gentle and brief.' },
      { _key: 'hands', num: '2', title: 'Hands Only \u2014 No Washcloth', body: 'When rinsing use only your hands to gently rub the skin. The goal is to remove the surface bronzer without disturbing the developing DHA underneath. A washcloth or loofah will streak and strip your tan before it is set.' },
      { _key: 'moisturize', num: '3', title: 'Moisturize Twice Daily', body: 'Apply a hydrating tan-extending moisturizer morning and night. Dry skin is the number one enemy of a lasting spray tan. The more you hydrate the longer and more even your fade will be.' },
      { _key: 'extend', num: '4', title: 'Extend Your Glow', body: 'Want your tan to last even longer? Reach for a gradual tan lotion on dry areas \u2014 it refreshes the color between appointments without streaking.' },
      { _key: 'resume', num: '5', title: 'Resume Normal Routine After Day One', body: 'All of the above applies to your first day post-tan. After that you can return to your regular hygiene routine \u2014 just keep up the moisturizer.' },
    ],
    calloutLabel: 'Note:',
    calloutText: 'All of the above applies to your first day post-tan. After that you can return to your regular hygiene routine \u2014 just keep up the moisturizer.',
  },
  {
    _type: 'galleryBlock',
    _key: 'gallery',
    eyebrow: 'Results',
    heading: 'The Glow Speaks for Itself',
    subtext: 'Real results from real clients. No filter, no fake orange \u2014 just rich natural-looking bronze that complements every skin tone.',
    images: [],
    ctaLabel: 'Book a Session',
    ctaDestination: '/#contact',
  },
  {
    _type: 'whyChooseUsBlock',
    _key: 'why',
    eyebrow: 'Why Luxe Glow',
    heading: 'The Difference Is in the Details',
    subtext: 'We take spray tanning seriously. From the formula we use to the way we move through your appointment, every detail is designed to give you a result you are proud to show off.',
    cards: [
      { _key: 'mobile', title: 'We Come to You', body: 'Our mobile spray tan service brings the studio experience directly to your home. No driving, no waiting, no rushing. Book a session on your schedule in your space.' },
      { _key: 'tone', title: 'Expert Eye for Tone', body: 'Not all tans are created equal. We assess your natural skin tone, undertones, and desired depth before ever picking up the spray gun \u2014 so your result looks like you just got back from vacation, not a costume.' },
      { _key: 'comfort', title: 'A Comfortable Experience', body: 'We know spray tanning can feel vulnerable. Luxe Glow is built on professionalism and a welcoming presence. First-timers and regulars alike leave feeling confident, not awkward.' },
    ],
    calloutBadge: 'Our Promise',
    calloutHeading: 'Our Formulas Will Never Pull Orange',
    calloutBody: 'The orange tan era is over. Every solution we use is carefully selected for its ability to develop into a rich warm bronze across all skin tones \u2014 never brassy, never artificial. If you have been burned by an orange tan before, this is your sign to try again.',
  },
  {
    _type: 'contactBlock',
    _key: 'contact',
    eyebrow: 'Book a Session',
    heading: "Ready to Glow?\nLet's Make It Happen.",
    subtext: 'Fill out the form and we will reach out to confirm your appointment. Prefer to skip the form? Call or text us directly \u2014 we are happy to book you that way too.',
    formHeading: 'Book a Session',
    formSubtext: 'We will confirm your appointment within 24 hours.',
    submitLabel: 'Request Appointment',
  },
];

const homePage = {
  _id: 'home-page',
  _type: 'page',
  title: 'Home',
  slug: { _type: 'slug', current: 'home' },
  seo: {
    metaTitle: 'Luxe Glow Spray Tans | Rutherfordton, NC',
    metaDescription: 'Premium spray tans and mobile spray tan services in Rutherfordton, NC. Flawless, natural-looking color — book your session today.',
    noIndex: false,
  },
  sections,
};

// ─── Run ──────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding siteSettings...');
  await client.createOrReplace(siteSettings);
  console.log('  ✓ siteSettings');

  console.log('Seeding home page...');
  await client.createOrReplace(homePage);
  console.log('  ✓ home page with', sections.length, 'sections');

  console.log('\nDone. All content seeded to Sanity.');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
