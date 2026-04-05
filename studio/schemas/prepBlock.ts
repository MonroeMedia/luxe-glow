import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'prepBlock',
  title: 'Preparation Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
    defineField({
      name: 'cards',
      title: 'Prep Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'num', title: 'Number', type: 'string', description: 'e.g. 01' }),
            defineField({ name: 'title', title: 'Card Title', type: 'string' }),
            defineField({ name: 'body', title: 'Card Body', type: 'text', rows: 4 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'num' },
            prepare({ title, subtitle }) { return { title, subtitle: `#${subtitle}` }; },
          },
        },
      ],
    }),
    defineField({ name: 'calloutLabel', title: 'Callout Label', type: 'string', description: 'e.g. "Important:"' }),
    defineField({ name: 'calloutText', title: 'Callout Text', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) { return { title: `Prep — ${title ?? 'Before Your Appointment'}` }; },
  },
});
