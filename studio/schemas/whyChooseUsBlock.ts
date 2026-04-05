import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'whyChooseUsBlock',
  title: 'Why Choose Us Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
    defineField({
      name: 'cards',
      title: 'Feature Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Card Title', type: 'string' }),
            defineField({ name: 'body', title: 'Card Body', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({ name: 'calloutBadge', title: 'Callout Badge Text', type: 'string', description: 'e.g. "Our Promise"' }),
    defineField({ name: 'calloutHeading', title: 'Callout Heading', type: 'string' }),
    defineField({ name: 'calloutBody', title: 'Callout Body', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) { return { title: `Why Us — ${title ?? 'The Difference Is in the Details'}` }; },
  },
});
