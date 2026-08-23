import { useState, useEffect } from "react";

import { client } from "../client";
import { trackFetch } from "../loadingStore";
import type { NavItem, SiteFooterSection } from "../types/sanity";

const defaultTagline = "Building thoughtful, reliable software.";
const defaultQuickLinks: NavItem[] = [
	{ _key: "home", label: "Home", sectionId: "home" },
	{ _key: "about", label: "About", sectionId: "about" },
	{ _key: "work", label: "Work", sectionId: "work" },
	{ _key: "contact", label: "Contact", sectionId: "contact" },
];
const defaultEmail = "jaffer.sunny125@gmail.com";
const defaultWordmarkText = "Jaffer";
const defaultCopyrightName = "Jaffer Sunny";

/**
 * Full-bleed black footer bar with an oversized faded wordmark — matching
 * the "Scaling Start-ups for Growth." + giant name treatment at the very
 * bottom of the Framer template. Sits below the contact-form Footer
 * section.
 */
const SiteFooter = () => {
	const year = new Date().getFullYear();
	const [section, setSection] = useState<SiteFooterSection | null>(null);

	useEffect(() => {
		const query = '*[_type=="siteFooterSection"][0]';
		trackFetch(client.fetch<SiteFooterSection>(query)).then((data) => setSection(data));
	}, []);

	const tagline = section?.tagline ?? defaultTagline;
	const quickLinks = section?.quickLinks?.length ? section.quickLinks : defaultQuickLinks;
	const email = section?.email ?? defaultEmail;
	const wordmarkText = section?.wordmarkText ?? defaultWordmarkText;
	const copyrightName = section?.copyrightName ?? defaultCopyrightName;

	return (
		<footer className="w-full overflow-hidden bg-ink pt-16 text-white">
			<div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-8 sm:flex-row sm:justify-between">
				<h3 className="max-w-[280px] text-3xl font-extrabold leading-tight">
					{tagline}
				</h3>

				<div className="flex gap-16 sm:flex-row flex-col">
					<div>
						<p className="eyebrow !text-white/40">/Quick links</p>
						<ul className="mt-3 flex flex-col gap-2 text-sm text-white/70">
							{quickLinks.map((link) => (
								<li key={link._key ?? link.sectionId}>
									<a
										href={`#${link.sectionId}`}
										className="no-underline hover:text-white">
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className="eyebrow !text-white/40">/Contact</p>
						<p className="mt-3 text-sm text-white/70">{email}</p>
					</div>
				</div>
			</div>

			<p className="mt-10 select-none whitespace-nowrap text-center text-[18vw] font-extrabold uppercase leading-none text-white/5">
				{wordmarkText}
			</p>

			<p className="border-t border-white/10 py-4 text-center text-xs text-white/30">
				© {year} {copyrightName}. All rights reserved.
			</p>
		</footer>
	);
};

export default SiteFooter;
