import {defineType, defineField} from 'sanity'

// Singleton — the hero section (Header.tsx): the big staggered headline and
// the "/Creating since ..." eyebrow. The two draggable tech-stack icons
// flanking the headline are decorative brand marks bundled with the app, not
// editorial content, so they stay static assets rather than Studio images.
export default defineType({
  name: 'header',
  title: 'Header (Hero)',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      description:
        'Big uppercase headline, animated word-by-word by splitting on spaces — e.g. "Web & Mobile App Developer".',
      type: 'string',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Small label next to the copyright year, e.g. "/Creating since 2020".',
      type: 'string',
    }),
  ],
})
