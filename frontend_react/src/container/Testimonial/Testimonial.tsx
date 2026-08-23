import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { SanityImage } from "../../components";
import { urlFor, client } from "../../client";
import { trackFetch } from "../../loadingStore";
import type {
	Brand,
	Testimonial as TestimonialType,
	TestimonialSection,
} from "../../types/sanity";

const defaultSectionHeading = "Testimonials";

const Testimonial = () => {
	const [brands, setBrands] = useState<Brand[]>([]);
	const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
	const [section, setSection] = useState<TestimonialSection | null>(null);

	useEffect(() => {
		const query = '*[_type == "testimonials"]';
		const brandsQuery = '*[_type == "brands"]';

		trackFetch(client.fetch<TestimonialType[]>(query)).then((data) => {
			setTestimonials(data);
		});

		trackFetch(client.fetch<Brand[]>(brandsQuery)).then((data) => {
			setBrands(data);
		});
	}, []);

	useEffect(() => {
		const query = '*[_type == "testimonialSection"][0]';
		trackFetch(client.fetch<TestimonialSection>(query)).then((data) => setSection(data));
	}, []);

	const sectionHeading = section?.sectionHeading ?? defaultSectionHeading;

	return (
		<>
			<h2 className="head-text">{sectionHeading}</h2>

			<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
				{testimonials.map((testimonial) => (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						key={testimonial._id}
						className="dark-card flex flex-col justify-between p-6">
						<p className="text-sm leading-[1.7] text-white/80">
							{testimonial.feedback}
						</p>
						<div className="mt-6 flex items-center gap-3">
							{testimonial.imageurl?.asset && (
								<SanityImage
									src={urlFor(testimonial.imageurl.asset._ref).url()}
									alt={testimonial.name}
									wrapperClassName="h-10 w-10 rounded-full"
									skeletonClassName="bg-white/10"
								/>
							)}
							<div>
								<p className="text-sm font-semibold text-white">
									{testimonial.name}
								</p>
								<p className="text-xs text-white/50">{testimonial.company}</p>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{brands.length > 0 && (
				<div className="mt-16 flex flex-wrap items-center gap-8">
					{brands.map(
						(brand) =>
							brand.imgUrl.asset && (
								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5 }}
									key={brand._id}
									className="group w-[clamp(80px,20vw,100px)]">
									<SanityImage
										src={urlFor(brand.imgUrl.asset._ref).url()}
										alt={brand.name}
										wrapperClassName="w-full aspect-[3/2]"
										objectFit="contain"
										className="grayscale transition-all duration-300 group-hover:grayscale-0"
									/>
								</motion.div>
							)
					)}
				</div>
			)}
		</>
	);
};

export default AppWrap(MotionWrap(Testimonial), "testimonial", "app__primarybg");
