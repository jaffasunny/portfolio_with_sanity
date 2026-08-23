import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'experiences',
  title: 'Experiences',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'works',
      title: 'Works',
      type: 'array',
      // NOTE: carried over as-is from the v2 schema. `workExperience` is a
      // document type, which is unusual to embed inline in an array — if you
      // hit validation issues here, consider changing this to
      // `{type: 'reference', to: [{type: 'workExperience'}]}` instead.
      of: [{type: 'workExperience'}],
    }),
  ],
})
