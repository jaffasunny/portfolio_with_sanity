import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-scrubbed version of `PhotoReveal`. The plain `PhotoReveal` plays a
 * fixed-duration tween the instant the photo enters the viewport; this one
 * ties rotateY/scale/y directly to scroll progress (same mechanism as
 * `ScrollRevealWords`), so the flip-and-settle actually tracks how far
 * you've scrolled instead of running on its own timer — matching the
 * template's hero photo, which visibly rotates and drops into place as you
 * scroll it into the "Hey" section rather than animating on a timer.
 */
interface ScrollPhotoRevealProps {
	children: ReactNode;
	className?: string;
}

const ScrollPhotoReveal = ({ children, className }: ScrollPhotoRevealProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.95", "start 0.4"],
	});

	const rotateY = useTransform(scrollYProgress, [0, 1], [180, 0]);
	const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
	const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
	const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

	return (
		<div ref={ref} style={{ perspective: 1200 }} className={className}>
			<motion.div
				style={{ rotateY, scale, y, opacity, transformStyle: "preserve-3d" }}
				className="h-full w-full">
				{children}
			</motion.div>
		</div>
	);
};

export default ScrollPhotoReveal;
