import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'dayOfBlock',
  title: 'Day of Appointment Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'num', title: 'Step Number', type: 'string' }),
            defineField({ name: 'title', title: 'Step Title', type: 'string' }),
            defineField({ name: 'body', title: 'Step Body', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'num' },
            prepare({ title, subtitle }) { return { title, subtitle: `Step ${subtitle}` }; },
          },
        },
      ],
    }),
    defineField({ name: 'image', title: 'Section Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
    defineField({ name: 'ctaDestination', title: 'CTA Destination', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) { return { title: `Day Of — ${title ?? 'Arrive Ready to Glow'}` }; },
  },
});
