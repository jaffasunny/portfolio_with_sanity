import {defineType, defineField} from 'sanity'

// Singleton — the floating name pill + its dropdown menu (Navbar.tsx). Only
// one of these documents should exist; the Studio structure pins editors to
// a single fixed-id document instead of a list.
export default defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'displayName',
      title: 'Display Name',
      description: 'Shown in the pill at the top of every page, e.g. "Jaffer Sunny".',
      type: 'string',
    }),
    defineField({
      name: 'navItems',
      title: 'Nav Items',
      description: 'Links shown in the dropdown menu, in order.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
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
  ],
})
