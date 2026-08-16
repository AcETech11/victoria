import { defineType, defineArrayMember } from 'sanity'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
    }),
    // Allows Victoria to drop images directly into her text descriptions
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})