import {defineType, defineField} from 'sanity'

// Singleton — the full-bleed black bar at the very bottom of the page
// (SiteFooter.tsx): tagline, quick links, the giant faded wordmark, contact
// line, and the copyright name.
export default defineType({
  name: 'siteFooterSection',
  title: 'Site Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'e.g. "Building thoughtful, reliable software."',
      type: 'string',
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'quickLink',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({
              name: 'sectionId',
              title: 'Section',
              type: 'string',
              options: {
                list: [
                  {title: 'Home', value: 'home'},
                  {title: 'About', value: 'about'},
                  {title: 'Work', value: 'work'},
                  {title: 'Skills', value: 'skills'},
                  {title: 'Testimonials', value: 'testimonial'},
                  {title: 'Certifications', value: 'certifications'},
                  {title: 'Contact', value: 'contact'},
                ],
              },
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'sectionId'},
          },
        },
      ],
    }),
    defineField({
      name: 'wordmarkText',
      title: 'Wordmark Text',
      description: 'The oversized faded name across the bottom, e.g. "Jaffer".',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'copyrightName',
      title: 'Copyright Name',
      description: 'e.g. "Jaffer Sunny" in "© 2026 Jaffer Sunny. All rights reserved."',
      type: 'string',
    }),
  ],
})
