import {defineType, defineField} from 'sanity'

// Singleton — the Work section's heading and tag-filter buttons (Work.tsx).
// The individual projects are the separate `works` collection.
export default defineType({
  name: 'workSection',
  title: 'Work — Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      description: 'e.g. "Featured Projects".',
      type: 'string',
    }),
    defineField({
      name: 'filters',
      title: 'Filter Buttons',
      description:
        'Tag-filter buttons shown above the grid, in order (should end with "All"). Each is matched against a project\'s tags as "#<value>".',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
