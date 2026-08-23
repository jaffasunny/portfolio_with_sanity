export interface SanityImageAsset {
	asset?: {
		_ref: string;
		_type?: string;
	};
}

export interface Profile {
	_id: string;
	name?: string;
	photo: SanityImageAsset;
}

export interface About {
	_id: string;
	title: string;
	description: string;
	imgUrl: SanityImageAsset;
}

export interface Certification {
	_id: string;
	title: string;
	description: string;
	imgUrl: SanityImageAsset;
	name?: string;
	tags: string[];
	certificationLink: string;
}

export interface Work {
	_id: string;
	title: string;
	description: string;
	imgUrl: SanityImageAsset;
	name?: string;
	tags: string[];
	projectLink: string;
	codeLink: string;
}

export interface Skill {
	name: string;
	bgColor: string;
	icon: SanityImageAsset;
}

export interface ExperienceWork {
	_key: string;
	name: string;
	company: string;
	desc: string;
}

export interface Experience {
	year: string;
	works: ExperienceWork[];
}

export interface Testimonial {
	_id: string;
	name: string;
	company: string;
	feedback: string;
	imageurl: SanityImageAsset;
}

export interface Brand {
	_id: string;
	name: string;
	imgUrl: SanityImageAsset;
}

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export interface NavItem {
	_key: string;
	label: string;
	sectionId: string;
}

export interface NavbarSettings {
	displayName: string;
	navItems: NavItem[];
}

export interface HeaderContent {
	headline: string;
	eyebrow: string;
}

export interface AboutIntro {
	heading: string;
	introLeft: string;
	introRight: string;
	statement: string;
}

export interface WorkSection {
	sectionHeading: string;
	filters: string[];
}

export interface SkillsSection {
	sectionHeading: string;
}

export interface TestimonialSection {
	sectionHeading: string;
}

export interface CertificationsSection {
	sectionHeading: string;
}

export interface SocialLink {
	_key: string;
	platform: "twitter" | "linkedin" | "github";
	url: string;
}

export interface ContactSection {
	sectionHeading: string;
	blurb: string;
	email: string;
	phone: string;
	socialLinks: SocialLink[];
}

export interface SiteFooterSection {
	tagline: string;
	quickLinks: NavItem[];
	wordmarkText: string;
	email: string;
	copyrightName: string;
}
