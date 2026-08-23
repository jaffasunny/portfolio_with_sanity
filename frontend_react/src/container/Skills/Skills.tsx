import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

import { AppWrap, MotionWrap } from "../../wrapper";
import { SanityImage } from "../../components";
import { urlFor, client } from "../../client";
import { trackFetch } from "../../loadingStore";
import type { Experience, Skill, SkillsSection } from "../../types/sanity";

const defaultSectionHeading = "Skills & Experience";

const Skills = () => {
	const [experiences, setExperiences] = useState<Experience[]>([]);
	const [skills, setSkills] = useState<Skill[]>([]);
	const [section, setSection] = useState<SkillsSection | null>(null);

	useEffect(() => {
		const query = '*[_type == "experiences"]';
		const skillsQuery = '*[_type == "skills"]';

		trackFetch(client.fetch<Experience[]>(query)).then((data) => {
			setExperiences(data);
		});

		trackFetch(client.fetch<Skill[]>(skillsQuery)).then((data) => {
			setSkills(data);
		});
	}, []);

	useEffect(() => {
		const query = '*[_type == "skillsSection"][0]';
		trackFetch(client.fetch<SkillsSection>(query)).then((data) => setSection(data));
	}, []);

	const sectionHeading = section?.sectionHeading ?? defaultSectionHeading;

	return (
		<>
			<h2 className="head-text">{sectionHeading}</h2>

			<div className="mt-12 flex flex-col gap-8 md:flex-row md:gap-20">
				<div className="flex flex-1 flex-wrap items-start justify-start gap-4">
					{skills.map((skill) => (
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="flex flex-col items-center text-center"
							key={skill.name}>
							<div
								className="app__flex h-[clamp(60px,15vw,72px)] w-[clamp(60px,15vw,72px)] rounded-full transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.1)]"
								style={{ backgroundColor: skill.bgColor }}>
								<SanityImage
									src={urlFor(skill.icon).url()}
									alt={skill.name}
									wrapperClassName="h-1/2 w-1/2"
									showSkeleton={false}
								/>
							</div>
							<p className="p-text mt-2 font-medium">{skill.name}</p>
						</motion.div>
					))}
				</div>

				<div className="flex flex-1 flex-col items-start justify-start">
					{experiences.map((experience) => (
						<div
							className="my-4 flex w-full flex-col items-start justify-start gap-2 border-t border-ink/10 pt-4 first:border-t-0 first:pt-0 sm:flex-row sm:gap-0"
							key={experience.year}>
						<div className="sm:mr-12">
								<p className="bold-text">{experience.year}</p>
							</div>
							<div className="flex-1">
								{experience.works.map((work) => (
									<div key={work._key}>
										<div
											className="mb-4 flex cursor-pointer flex-col items-start justify-start"
											data-tooltip-id={work.name}
											data-tooltip-content={work.desc}>
											<h4 className="bold-text font-medium">{work.name}</h4>
											<p className="p-text mt-[5px]">{work.company}</p>
										</div>
										<Tooltip
											id={work.name}
											place="top"
											opacity={1}
											className="!max-w-[300px] !rounded-xl !bg-ink !p-4 !text-center !text-sm !leading-[1.5] !text-white/80 3xl:!max-w-[500px] 3xl:!text-[1.75rem] 3xl:!leading-[2]"
										/>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default AppWrap(MotionWrap(Skills), "skills", "app__primarybg");
