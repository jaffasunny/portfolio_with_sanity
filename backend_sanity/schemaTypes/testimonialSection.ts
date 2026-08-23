import {defineType, defineField} from 'sanity'

// Singleton — just the Testimonial section's heading (Testimonial.tsx). The
// quotes and brand logos are the separate `testimonials`/`brands`
// collections.
export default defineType({
  name: 'testimonialSection',
  title: 'Testimonials — Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      description: 'e.g. "Testimonials".',
      type: 'string',
    }),
  ],
})
