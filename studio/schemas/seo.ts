import { defineType, defineField } from 'sanity';

// Shared SEO object type — referenced by page and other document schemas
export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Recommended: 50–60 characters',
      validation: (Rule) => Rule.max(60).warning('Over 60 characters — may be truncated in search results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Recommended: 150–160 characters',
      validation: (Rule) => Rule.max(160).warning('Over 160 characters — may be truncated in search results'),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG / Social Share Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
      description: 'Enable to add noindex, nofollow meta tags',
    }),
    defineField({
      name: 'schemaMarkup',
      title: 'JSON-LD Schema Markup',
      type: 'text',
      description: 'Paste valid JSON-LD schema here (e.g. LocalBusiness, Service)',
      rows: 8,
    }),
  ],
});
