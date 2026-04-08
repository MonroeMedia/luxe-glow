import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'h1', title: 'Heading Line 1', type: 'string', description: 'e.g. "Spray Tans in"' }),
    defineField({ name: 'h1Italic', title: 'Heading Line 2 (italic / gold)', type: 'string', description: 'e.g. "Rutherfordton"' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 3 }),
    defineField({ name: 'primaryCtaLabel', title: 'Primary CTA Label', type: 'string' }),
    defineField({ name: 'primaryCtaDestination', title: 'Primary CTA Destination', type: 'string', description: 'e.g. /#contact' }),
    defineField({ name: 'secondaryCtaLabel', title: 'Secondary CTA Label', type: 'string' }),
    defineField({ name: 'secondaryCtaDestination', title: 'Secondary CTA Destination', type: 'string' }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }]})
  ],
  preview: {
    select: { title: 'h1', subtitle: 'h1Italic' },
    prepare({ title, subtitle }) {
      return { title: 'Hero', subtitle: [title, subtitle].filter(Boolean).join(' ') };
    },
  },
});
