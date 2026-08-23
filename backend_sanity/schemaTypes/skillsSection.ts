import {defineType, defineField} from 'sanity'

// Singleton — just the Skills section's heading (Skills.tsx). The icons and
// the experience timeline are the separate `skills`/`experiences`
// collections.
export default defineType({
  name: 'skillsSection',
  title: 'Skills — Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      description: 'e.g. "Skills & Experience".',
      type: 'string',
    }),
  ],
})
