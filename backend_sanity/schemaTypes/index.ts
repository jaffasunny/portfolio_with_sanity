import {type SchemaTypeDefinition} from 'sanity'

// Global (not tied to a single section)
import profile from './profile'

// Navbar
import navbar from './navbar'

// Header (hero)
import header from './header'

// About
import aboutIntro from './aboutIntro'
import abouts from './abouts'

// Work
import workSection from './workSection'
import works from './works'

// Skills
import skillsSection from './skillsSection'
import skills from './skills'
import experiences from './experiences'
import workExperience from './workExperience'

// Testimonial
import testimonialSection from './testimonialSection'
import testimonials from './testimonials'
import brands from './brands'

// Certifications
import certificationsSection from './certificationsSection'
import certifications from './certifications'

// Footer (contact form section) + Site Footer (bottom bar)
import contactSection from './contactSection'
import contact from './contact'
import siteFooterSection from './siteFooterSection'

export const schemaTypes: SchemaTypeDefinition[] = [
  profile,
  navbar,
  header,
  aboutIntro,
  abouts,
  workSection,
  works,
  skillsSection,
  skills,
  workExperience,
  experiences,
  testimonialSection,
  testimonials,
  brands,
  certificationsSection,
  certifications,
  contactSection,
  contact,
  siteFooterSection,
]
