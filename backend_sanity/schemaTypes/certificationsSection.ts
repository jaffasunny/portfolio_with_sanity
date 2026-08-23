import {defineType, defineField} from 'sanity'

// Singleton — just the Certifications section's heading
// (Certifications.tsx). The individual certifications are the separate
// `certifications` collection. Named distinctly from that collection to
// avoid a schema name clash.
export default defineType({
  name: 'certificationsSection',
  title: 'Certifications — Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      description: 'e.g. "Certifications".',
      type: 'string',
    }),
  ],
})
