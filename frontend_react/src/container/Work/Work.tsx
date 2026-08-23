import { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { SanityImage } from "../../components";
import { urlFor, client } from "../../client";
import { trackFetch } from "../../loadingStore";
import type { Work as WorkType, WorkSection } from "../../types/sanity";

const defaultSectionHeading = "Featured Projects";
const defaultFilterItems = ["Fullstack", "Web App", "Mobile App", "React JS", "All"];

// Cycled per card, echoing the solid green/purple/pink/blue thumbnail
// backgrounds behind each project in the Framer template.
const accentBg = ["bg-accent-green", "bg-accent-purple", "bg-accent-pink", "bg-accent-blue"];

const Work = () => {
	const [activeFilter, setActiveFilter] = useState("All");
	const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
	const [works, setWorks] = useState<WorkType[]>([]);
	const [filterWork, setFilterWork] = useState<WorkType[]>([]);
	const [section, setSection] = useState<WorkSection | null>(null);

	useEffect(() => {
		const query = '*[_type == "works"]';

		trackFetch(client.fetch<WorkType[]>(query)).then((data) => {
			setWorks(data);
			setFilterWork(data);
		});
	}, []);

	useEffect(() => {
		const query = '*[_type == "workSection"][0]';
		trackFetch(client.fetch<WorkSection>(query)).then((data) => setSection(data));
	}, []);

	// The hardcoded category names in `defaultFilterItems` ("Fullstack", "Web
	// App", ...) don't correspond to any tag actually present on `works`
	// (which are tech-stack tags like "#ReactJS"/"#NodeJS") — matching
	// against them in handleWorkFilter always came up empty. Building the
	// filter bar from the tags that actually exist on the loaded works
	// guarantees every button (other than "All") matches at least one card.
	const availableTags = Array.from(new Set(works.flatMap((work) => work.tags))).map(
		(tag) => tag.replace(/^#/, ""),
	);

	const sectionHeading = section?.sectionHeading ?? defaultSectionHeading;
	const filterItems = section?.filters?.length
		? section.filters
		: availableTags.length
			? [...availableTags, "All"]
			: defaultFilterItems;

	const handleWorkFilter = (item: string) => {
		setActiveFilter(item);
		setAnimateCard({ y: 20, opacity: 0 });

		setTimeout(() => {
			setAnimateCard({ y: 0, opacity: 1 });

			if (item === "All") {
				setFilterWork(works);
			} else {
				setFilterWork(works.filter((work) => work.tags.includes(`#${item}`)));
			}
		}, 400);
	};

	return (
		<>
			<div className="flex items-end justify-between">
				<h2 className="head-text">{sectionHeading}</h2>
			</div>

			<div className="my-8 flex flex-row flex-wrap items-center gap-2">
				{filterItems.map((item, index) => (
					<button
						type="button"
						key={index}
						onClick={() => handleWorkFilter(item)}
						className={`rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ease-out ${
							activeFilter === item
								? "bg-ink text-white"
								: "bg-white text-ink/60 hover:text-ink"
						}`}>
						{item}
					</button>
				))}
			</div>

			<motion.div
				animate={animateCard}
				transition={{ duration: 0.4 }}
				className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{filterWork.map((work, index) => (
					<div className="flex flex-col" key={work._id ?? index}>
						<div
							className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${
								accentBg[index % accentBg.length]
							}`}>
							<SanityImage
								src={urlFor(work.imgUrl).url()}
								alt={work.name}
								wrapperClassName="h-full w-full"
							/>

							<div className="app__flex absolute inset-0 gap-4 bg-black/50 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
								<a href={work.projectLink} target="_blank" rel="noreferrer">
									<div className="app__flex h-11 w-11 rounded-full bg-white/90 text-ink transition-transform duration-200 hover:scale-90">
										<AiFillEye className="h-1/2 w-1/2" />
									</div>
								</a>
								<a href={work.codeLink} target="_blank" rel="noreferrer">
									<div className="app__flex h-11 w-11 rounded-full bg-white/90 text-ink transition-transform duration-200 hover:scale-90">
										<AiFillGithub className="h-1/2 w-1/2" />
									</div>
								</a>
							</div>
						</div>

						<h4 className="bold-text mt-4">{work.title}</h4>
						<p className="eyebrow mt-1">{work.tags.slice(0, 3).join(" · ")}</p>
						<p className="p-text mt-2 line-clamp-3">{work.description}</p>
					</div>
				))}
			</motion.div>
		</>
	);
};

export default AppWrap(MotionWrap(Work), "work", "app__primarybg");
