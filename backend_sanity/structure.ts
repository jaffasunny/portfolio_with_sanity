import type {StructureResolver, StructureBuilder} from 'sanity/desk'

// Pins a singleton document type to one fixed document id, so editors always
// land on the same document instead of a list they could add duplicates to.
const singleton = (S: StructureBuilder, schemaType: string, title: string) =>
  S.listItem()
    .id(schemaType)
    .title(title)
    .schemaType(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType))

// Groups every document type into the page section it powers on the
// frontend, in the order sections appear on the page: Navbar, Header,
// About, Work, Skills, Testimonial, Certifications, Footer, Site Footer,
// plus a Global group for the one cross-section document (Profile).
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Global')
        .child(
          S.list()
            .title('Global')
            .items([singleton(S, 'profile', 'Profile')])
        ),
      singleton(S, 'navbar', 'Navbar'),
      singleton(S, 'header', 'Header (Hero)'),
      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About')
            .items([
              singleton(S, 'aboutIntro', 'Intro'),
              S.documentTypeListItem('abouts').title('Cards'),
            ])
        ),
      S.listItem()
        .title('Work')
        .child(
          S.list()
            .title('Work')
            .items([
              singleton(S, 'workSection', 'Section Settings'),
              S.documentTypeListItem('works').title('Projects'),
            ])
        ),
      S.listItem()
        .title('Skills')
        .child(
          S.list()
            .title('Skills')
            .items([
              singleton(S, 'skillsSection', 'Section Settings'),
              S.documentTypeListItem('skills').title('Skills'),
              S.documentTypeListItem('experiences').title('Experience Timeline'),
            ])
        ),
      S.listItem()
        .title('Testimonials')
        .child(
          S.list()
            .title('Testimonials')
            .items([
              singleton(S, 'testimonialSection', 'Section Settings'),
              S.documentTypeListItem('testimonials').title('Testimonials'),
              S.documentTypeListItem('brands').title('Brand Logos'),
            ])
        ),
      S.listItem()
        .title('Certifications')
        .child(
          S.list()
            .title('Certifications')
            .items([
              singleton(S, 'certificationsSection', 'Section Settings'),
              S.documentTypeListItem('certifications').title('Certifications'),
            ])
        ),
      S.listItem()
        .title('Footer')
        .child(
          S.list()
            .title('Footer')
            .items([
              singleton(S, 'contactSection', 'Contact Section'),
              S.documentTypeListItem('contact').title('Submitted Messages'),
              singleton(S, 'siteFooterSection', 'Site Footer Bar'),
            ])
        ),
    ])
