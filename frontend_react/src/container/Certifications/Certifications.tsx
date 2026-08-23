import { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";

import { AppWrap, MotionWrap } from "../../wrapper";
import { SanityImage } from "../../components";
import { urlFor, client } from "../../client";
import { trackFetch } from "../../loadingStore";
import type { Certification, CertificationsSection } from "../../types/sanity";

const defaultSectionHeading = "Certifications";

const Certifications = () => {
	const [certifications, setCertifications] = useState<Certification[]>([]);
	const [section, setSection] = useState<CertificationsSection | null>(null);

	useEffect(() => {
		const query = '*[_type == "certifications"]';

		trackFetch(client.fetch<Certification[]>(query)).then((data) => {
			setCertifications(data);
		});
	}, []);

	useEffect(() => {
		const query = '*[_type == "certificationsSection"][0]';
		trackFetch(client.fetch<CertificationsSection>(query)).then((data) =>
			setSection(data)
		);
	}, []);

	const sectionHeading = section?.sectionHeading ?? defaultSectionHeading;

	return (
		<>
			<h2 className="head-text">{sectionHeading}</h2>

			<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{certifications.map((certification, index) => (
					<div className="flex flex-col" key={certification._id ?? index}>
						<div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-ink/10 bg-white">
							<SanityImage
								src={urlFor(certification.imgUrl).url()}
								alt={certification.name}
								wrapperClassName="h-full w-full"
							/>

							<div className="app__flex absolute inset-0 bg-black/50 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
								<a
									href={certification.certificationLink}
									target="_blank"
									rel="noreferrer">
									<div className="app__flex h-11 w-11 rounded-full bg-white/90 text-ink transition-transform duration-200 hover:scale-90">
										<AiFillEye className="h-1/2 w-1/2" />
									</div>
								</a>
							</div>
						</div>

						<h4 className="bold-text mt-4">{certification.title}</h4>
						<p className="p-text mt-2">{certification.description}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default AppWrap(
	MotionWrap(Certifications),
	"certifications",
	"app__primarybg"
);
