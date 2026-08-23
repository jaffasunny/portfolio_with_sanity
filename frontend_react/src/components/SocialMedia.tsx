import type { ComponentType } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

import type { SocialLink } from "../types/sanity";

const icons: Record<SocialLink["platform"], ComponentType> = {
	twitter: BsTwitter,
	linkedin: FaLinkedinIn,
	github: FaGithub,
};

const defaultLinks: SocialLink[] = [
	{ _key: "twitter", platform: "twitter", url: "https://twitter.com/bbjaffer" },
	{
		_key: "linkedin",
		platform: "linkedin",
		url: "https://www.linkedin.com/in/jaffer-sunny",
	},
	{ _key: "github", platform: "github", url: "https://github.com/jaffasunny" },
];

interface SocialMediaProps {
	links?: SocialLink[];
}

/**
 * Small row of social icon circles — used in the footer, echoing the
 * X/Instagram/Facebook/YouTube row above "Let's talk." in the template.
 */
const SocialMedia = ({ links = defaultLinks }: SocialMediaProps) => {
	return (
		<div className="flex items-center gap-3">
			{links.map((link) => {
				const Icon = icons[link.platform];
				if (!Icon) return null;

				return (
					<a
						key={link._key ?? link.platform}
						href={link.url}
						target="_blank"
						rel="noreferrer">
						<div className="app__flex h-9 w-9 rounded-full border border-ink/10 bg-white transition-all duration-300 ease-in-out hover:bg-ink [&_svg]:h-[14px] [&_svg]:w-[14px] [&_svg]:text-ink/60 hover:[&_svg]:text-white">
							<Icon />
						</div>
					</a>
				);
			})}
		</div>
	);
};

export default SocialMedia;
