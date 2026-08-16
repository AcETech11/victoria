import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'projectType',
      title: 'Type of Work',
      type: 'string',
      options: {
        list: [
          { title: 'Motion Design', value: 'motion' },
          { title: 'Graphic Design', value: 'graphic' },
          { title: 'UI/UX Design', value: 'uiux' }, // New Option
          { title: 'Mixed Media', value: 'mixed' },
        ],
      },
    }),
    // The New UI/UX Link Field
    defineField({
      name: 'externalLink',
      title: 'Live Project / Figma Link',
      type: 'url',
      description: 'The URL to the Figma prototype or live website.',
      // Only show this if the project is UI/UX or Mixed Media
      hidden: ({ document }) => 
        !['uiux', 'mixed'].includes(document?.projectType as string),
    }),
    defineField({
      name: 'mainVideo',
      title: 'Main Motion Asset (Video)',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ document }) => document?.projectType === 'graphic',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Showcase Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})