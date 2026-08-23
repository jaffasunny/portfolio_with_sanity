import {defineType, defineField} from 'sanity'

// Singleton-style document holding the hero/profile photo (and a name, in
// case that's ever useful) so it can be swapped from the Studio instead of
// being a static asset baked into the frontend build. In practice you'll
// only ever create one of these documents.
export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
