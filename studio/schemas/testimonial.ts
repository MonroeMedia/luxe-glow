import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or neighborhood',
    }),
    defineField({
      name: 'stars',
      title: 'Star Rating',
      type: 'number',
      options: {
        list: [
          { title: '★★★★★  5 stars', value: 5 },
          { title: '★★★★☆  4 stars', value: 4 },
          { title: '★★★☆☆  3 stars', value: 3 },
          { title: '★★☆☆☆  2 stars', value: 2 },
          { title: '★☆☆☆☆  1 star', value: 1 },
        ],
        layout: 'radio',
      },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'body',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
    },
  },
});
