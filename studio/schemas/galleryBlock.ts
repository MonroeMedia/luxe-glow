import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryBlock',
  title: 'Gallery / Results Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'altText', title: 'Alt Text', type: 'string' }),
          ],
          preview: {
            select: { title: 'altText', media: 'image' },
          },
        },
      ],
    }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
    defineField({ name: 'ctaDestination', title: 'CTA Destination', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) { return { title: `Gallery — ${title ?? 'The Glow Speaks for Itself'}` }; },
  },
});
