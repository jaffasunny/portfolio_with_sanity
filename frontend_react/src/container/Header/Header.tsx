import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import { client } from "../../client";
import { trackFetch } from "../../loadingStore";
import type { HeaderContent } from "../../types/sanity";

// Small tech-stack icons standing in for the sparkle/bolt accents that flank
// the headline in the Framer template — like the template's icons, these
// are large enough to overlap the headline's corners, and draggable (drag +
// a little inertia, snapping back on release).
const accentIcons = [images.react, images.node];

// Same word-by-word gray -> ink reveal used by the template's hero, just
// played once on load (staggered) instead of scrubbed by scroll.
const container: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.12, delayChildren: 0.1 },
	},
};

const word: Variants = {
	hidden: { opacity: 1, color: "rgba(17,17,17,0.15)", y: 16 },
	show: {
		color: "rgba(17,17,17,1)",
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const defaultHeadline = "Web & Mobile App Developer";
const defaultEyebrow = "/Creating since 2020";

const currentYear = new Date().getFullYear();

const Header = () => {
	const [content, setContent] = useState<HeaderContent | null>(null);

	useEffect(() => {
		const query = '*[_type=="header"][0]';
		trackFetch(client.fetch<HeaderContent>(query)).then((data) => setContent(data));
	}, []);

	const headlineWords = (content?.headline ?? defaultHeadline).split(" ");
	const eyebrow = content?.eyebrow ?? defaultEyebrow;

	return (
		<div className="relative flex h-screen w-full flex-col overflow-hidden px-5 pb-2 pt-28 max-w-[1180px] mx-auto sm:px-8">
			<div className="flex flex-1 flex-col items-center justify-center">
				<div className="relative w-full">
					<motion.img
						drag
						dragMomentum={false}
						dragElastic={0.2}
						whileDrag={{ scale: 1.15 }}
						initial={{ opacity: 0, rotate: -12, scale: 0.6 }}
						animate={{ opacity: 1, rotate: 0, scale: 1 }}
						transition={{ duration: 0.6 }}
						src={accentIcons[0]}
						alt=""
						className="absolute md:left-0 md:top-0 top-[-45px] left-[-20px] h-[clamp(3rem,min(8vw,14vh),8rem)] w-[clamp(3rem,min(8vw,14vh),8rem)] shrink-0 -translate-x-[15%] -translate-y-[30%] cursor-grab active:cursor-grabbing "
					/>

					<motion.h1
						variants={container}
						initial="hidden"
						animate="show"
						style={{ fontFamily: "Archivo, sans-serif" }}
						className="w-full text-center text-[clamp(3rem,min(13vw,20vh),174px)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]">
						{headlineWords.map((w, i) => (
							<motion.span
								key={i}
								variants={word}
								className="mr-[0.2em] inline-block last:mr-0">
								{w}
							</motion.span>
						))}
					</motion.h1>

					<motion.img
						drag
						dragMomentum={false}
						dragElastic={0.2}
						whileDrag={{ scale: 1.15 }}
						initial={{ opacity: 0, rotate: 12, scale: 0.6 }}
						animate={{ opacity: 1, rotate: 0, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						src={accentIcons[1]}
						alt=""
						className="absolute md:bottom-0 right-0 bottom-[-45px] h-[clamp(3rem,min(8vw,14vh),8rem)] w-[clamp(3rem,min(8vw,14vh),8rem)] shrink-0 translate-x-[15%] translate-y-[30%] cursor-grab active:cursor-grabbing"
					/>
				</div>
			</div>

			{/* Date, photo, and eyebrow all share this one row now — the photo
			    sits right in line with "©2026" and "/Creating since 2020"
			    instead of floating above them. Grid (not flex) so the middle
			    column stays truly centered regardless of how wide the two
			    side labels are. The empty slot below is just a placeholder:
			    the real photo is a single `FloatingProfilePhoto` rendered
			    once in App, positioned every frame from this slot's live
			    coordinates — that's what makes it a genuinely continuous
			    scroll-driven "travel" into the Hey section, instead of two
			    separate photos swapping at a threshold. */}
			<div className="flex flex-col items-center gap-4 text-center sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-end sm:text-left">
				<p
					style={{ fontFamily: "Archivo, sans-serif" }}
					className="text-lg font-semibold text-ink sm:text-3xl">
					©{currentYear}
				</p>
				<div
					id="photo-slot-hero"
					className="aspect-[1/1] h-[clamp(10rem,min(22vw,32vh),20rem)]"
				/>
				<p className="eyebrow sm:justify-self-end">{eyebrow}</p>
			</div>
		</div>
	);
};

export default AppWrap(Header, "home", "app__primarybg", true);
