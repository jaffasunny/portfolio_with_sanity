import {defineType, defineField} from 'sanity'

// Singleton — the About section's intro copy (About.tsx): the "Hey!"
// heading, the two bio paragraphs either side of the profile photo, and the
// pinned scroll-reveal statement below the card carousel. The carousel
// cards themselves are the separate `abouts` collection.
export default defineType({
  name: 'aboutIntro',
  title: 'About — Intro',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. "Hey!"',
      type: 'string',
    }),
    defineField({
      name: 'introLeft',
      title: 'Intro (left column)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'introRight',
      title: 'Intro (right column)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'statement',
      title: 'Scroll-reveal statement',
      description: 'The word-by-word revealed paragraph below the card carousel.',
      type: 'text',
      rows: 4,
    }),
  ],
})
