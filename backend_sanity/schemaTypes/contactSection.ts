import {defineType, defineField} from 'sanity'

// Singleton — the contact-form section (Footer.tsx): heading, blurb, direct
// contact details, and the social icon row. Submitted messages land in the
// separate `contact` collection, written to (not read) by the form itself.
export default defineType({
  name: 'contactSection',
  title: 'Contact — Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      description: 'e.g. "Let\'s talk."',
      type: 'string',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Twitter / X', value: 'twitter'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'GitHub', value: 'github'},
                ],
              },
            }),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        },
      ],
    }),
  ],
})
