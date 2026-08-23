import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { ScrollRevealWords, PhotoReveal, CardCarousel, SanityImage } from "../../components";
import { urlFor, client } from "../../client";
import { trackFetch } from "../../loadingStore";
import type { About as AboutType, AboutIntro } from "../../types/sanity";

const AboutCard = ({ about }: { about: AboutType }) => (
	<motion.div
		whileHover={{ y: -6 }}
		transition={{ duration: 0.3, type: "tween" }}
		className="flex w-[220px] shrink-0 flex-col items-start max-sm:w-full 3xl:w-[370px]">
		<PhotoReveal className="h-[240px] w-full 3xl:h-[320px]">
			<SanityImage
				src={urlFor(about.imgUrl).url()}
				alt={about.title}
				wrapperClassName="h-full w-full"
				className="rounded-2xl"
			/>
		</PhotoReveal>
		<h3 className="bold-text mt-5">{about.title}</h3>
		<p className="p-text mt-[10px]">{about.description}</p>
	</motion.div>
);

const defaultHeading = "Hey!";

const defaultStatement =
	"From first commit to production. I build reliable, scalable software that ships fast, stays simple to maintain, and holds up in the real world — driven by clear systems and intentional design.";

const defaultIntroLeft =
	"I'm Jaffer, a software engineer who likes turning complex problems into simple, dependable products — from the first prototype to something people actually rely on.";

const defaultIntroRight =
	"I focus on building reliable, scalable software across web and mobile, with an eye for clean interfaces and systems that hold up as they grow. Take a look through some of the work below.";

const About = () => {
	const [abouts, setAbouts] = useState<AboutType[]>([]);
	const [intro, setIntro] = useState<AboutIntro | null>(null);

	useEffect(() => {
		const query = '*[_type=="abouts"]';
		trackFetch(client.fetch<AboutType[]>(query)).then((data) => setAbouts(data));
	}, []);

	useEffect(() => {
		const query = '*[_type=="aboutIntro"][0]';
		trackFetch(client.fetch<AboutIntro>(query)).then((data) => setIntro(data));
	}, []);

	const heading = intro?.heading ?? defaultHeading;
	const introLeft = intro?.introLeft ?? defaultIntroLeft;
	const introRight = intro?.introRight ?? defaultIntroRight;
	const statement = intro?.statement ?? defaultStatement;

	return (
		<div className="flex flex-col gap-4">
			{/* Intro block — heading + bio on the left, an empty slot for the
			    profile photo in the middle, a second bio paragraph on the
			    right. Exactly 100vh, same as the hero. The photo itself isn't
			    rendered here — see FloatingProfilePhoto in App.tsx, which
			    tracks this slot's live position every frame so the photo can
			    travel continuously from the hero into this spot as you
			    scroll, instead of the two sections each owning their own
			    copy. */}
			<div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center px-5 sm:px-8">
				<div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
					<div>
						<h2 className="head-text">{heading}</h2>
						<p className="p-text mt-6 max-w-sm">{introLeft}</p>
					</div>

					<div
						id="photo-slot-about"
						className="mx-auto h-[clamp(280px,38vw,360px)] w-[clamp(220px,30vw,280px)]"
					/>

					<p className="p-text max-w-sm md:self-end md:pb-4">{introRight}</p>
				</div>
			</div>

			<div className="mx-auto w-full max-w-[1180px] px-5 pb-8 sm:px-8 sm:pb-24">
				{/* <div className="lg:hidden"> */}
					<CardCarousel>
						{abouts.map((about) => (
							<AboutCard about={about} key={about._id} />
						))}
					</CardCarousel>
				{/* </div> */}

				{/* <div className="hidden flex-wrap gap-8 lg:flex justify-center">
					{abouts.map((about) => (
						<AboutCard about={about} key={about._id} />
					))}
				</div> */}
			</div>

			{/* Pinned, scroll-scrubbed word-by-word reveal — same mechanism as
			    the template's "From idea to launch..." paragraph, but held in
			    place (`position: sticky`) for a full extra-tall scroll pass so
			    the whole sentence resolves before the page moves on, instead
			    of racing past while it's merely passing through the viewport. */}
			<ScrollRevealWords
				text={statement}
				className="mx-auto max-w-[720px] px-8 text-center text-2xl font-medium leading-snug 3xl:text-4xl"
			/>
		</div>
	);
};

export default AppWrap(About, "about", "app__primarybg", true);
