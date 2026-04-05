import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  initialValue: {
    businessName: 'Luxe Glow Spray Tans',
    logoText: 'LUXE GLOW',
    tagline: 'Flawless, Natural-Looking Color — Every Time',
    phone: '(828) 429-4759',
    email: 'miss.ruh07@gmail.com',
    streetAddress: '119 N Street',
    city: 'Rutherfordton',
    state: 'NC',
    serviceAreas: ['Rutherfordton', 'Spindale', 'Forest City', 'Lake Lure', 'Tryon', 'Morganton'],
    ctaLabel: 'Book a Session',
    ctaDestination: '/#contact',
    copyrightText: '© 2025 Luxe Glow. All rights reserved.',
  },
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      description: 'Text displayed in the nav logo (e.g. LUXE GLOW)',
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image',
      description: 'Optional — replaces logo text if set',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'streetAddress',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    // Legacy combined address field — kept for backward compatibility
    defineField({
      name: 'address',
      title: 'Full Address (legacy)',
      type: 'text',
      rows: 2,
      description: 'Use Street Address / City / State fields above instead',
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Cities or regions served',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      description: 'e.g. "Book a Session"',
    }),
    defineField({
      name: 'ctaDestination',
      title: 'Primary CTA Destination',
      type: 'string',
      description: 'e.g. /#contact or /book',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'e.g. © 2025 Luxe Glow. All rights reserved.',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: { title: 'businessName' },
  },
});
