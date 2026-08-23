import { motion } from "framer-motion";

interface TravelingPhotoProps {
	src: string;
	alt?: string;
	className?: string;
}

/**
 * The actual profile photo element — rendered by whichever section
 * currently "owns" it (Header or About), gated by the `showPhoto` prop
 * each of those sections receives from App. Both instances share the same
 * `layoutId`, so when App flips which one is mounted, framer-motion's
 * shared-layout FLIP animation smoothly interpolates position AND size
 * between the two spots — the photo visually travels from its hero
 * placement down into its resting spot in the "Hey" section, instead of
 * two independent photos each doing their own local entrance.
 */
const TravelingPhoto = ({ src, alt, className }: TravelingPhotoProps) => (
	<div style={{ perspective: 1200 }} className={className}>
		<motion.div
			layoutId="profile-photo"
			initial={{ opacity: 0, rotateY: 180, scale: 0.7 }}
			animate={{ opacity: 1, rotateY: 0, scale: 1 }}
			transition={{
				layout: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
				default: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
			}}
			style={{ transformStyle: "preserve-3d" }}
			className="h-full w-full overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
			<img src={src} alt={alt} className="h-full w-full object-cover" />
		</motion.div>
	</div>
);

export default TravelingPhoto;
