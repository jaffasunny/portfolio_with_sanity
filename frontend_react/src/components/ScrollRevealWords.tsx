import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * Recreates the template's signature "From idea to launch..." effect: each
 * word starts at ~10%-opacity ink and turns fully solid black one at a time
 * as the page scrolls through a pinned section (a continuous
 * scroll-progress-driven reveal, not a one-shot fade). Confirmed by
 * inspecting the live template — words sit at `rgba(0,0,0,0.1)` until their
 * slice of scrollYProgress is reached, then land on `rgb(17,17,17)`.
 */
const Word = ({
	children,
	progress,
	range,
}: {
	children: ReactNode;
	progress: MotionValue<number>;
	range: [number, number];
}) => {
	const color = useTransform(
		progress,
		range,
		["rgba(17,17,17,0.15)", "rgba(17,17,17,1)"]
	);
	return (
		<motion.span style={{ color }} className="inline-block whitespace-pre">
			{children}
		</motion.span>
	);
};

interface ScrollRevealWordsProps {
	text: string;
	className?: string;
}

const ScrollRevealWords = ({ text, className }: ScrollRevealWordsProps) => {
	// A tall run of extra scroll room, not just the paragraph's own height —
	// `sticky` needs a container taller than the viewport to have anywhere
	// to hold still *within*. Tracking progress off this container's own
	// start/end (rather than the paragraph's position relative to the
	// viewport) means progress hits exactly 0 the instant the section pins
	// and exactly 1 the instant it un-pins, so the last word lands right as
	// normal scrolling resumes instead of finishing early or late.
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const words = text.split(" ");

	return (
		<div ref={containerRef} className="relative h-[250vh]">
			<div className="sticky top-0 flex h-screen items-center justify-center">
				<p className={className}>
					{words.map((word, i) => {
						const start = i / words.length;
						const end = start + 1 / words.length;
						return (
							<Word key={i} progress={scrollYProgress} range={[start, end]}>
								{word + (i === words.length - 1 ? "" : " ")}
							</Word>
						);
					})}
				</p>
			</div>
		</div>
	);
};

export default ScrollRevealWords;
