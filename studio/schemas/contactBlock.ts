import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactBlock',
  title: 'Contact / Book Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
    defineField({ name: 'formHeading', title: 'Form Heading', type: 'string' }),
    defineField({ name: 'formSubtext', title: 'Form Subtext', type: 'string' }),
    defineField({ name: 'submitLabel', title: 'Submit Button Label', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) { return { title: `Contact — ${title ?? 'Ready to Glow?'}` }; },
  },
});
