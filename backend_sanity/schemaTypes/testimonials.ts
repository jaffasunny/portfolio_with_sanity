import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'company', title: 'Comapany', type: 'string'}),
    defineField({
      name: 'imageurl',
      title: 'ImgURL',
      type: 'image',
      // user can choose crop when uploading img
      options: {hotspot: true},
    }),
    defineField({name: 'feedback', title: 'Feedback', type: 'string'}),
  ],
})
