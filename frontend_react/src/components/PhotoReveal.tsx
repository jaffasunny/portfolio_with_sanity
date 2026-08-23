import { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * The template's photo entrance, decoded from its computed transform at
 * rest: `matrix3d(-0.5,0,0,0, 0,0.5,0,0, 0,0,-1,0.00083, 0,114,0,1)` inside a
 * perspective(1200px) context — i.e. the photo starts mirrored (scaleX -1),
 * half-size, flipped back in 3D space and nudged down, then un-flips/grows
 * to identity as it scrolls into view. Framer-motion has no matrix3d prop,
 * so this reproduces it with rotateY + scale + perspective, which resolves
 * to the same "flips and grows into place" read.
 */
const PhotoReveal = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => (
	<div style={{ perspective: 1200 }} className={className}>
		<motion.div
			initial={{ opacity: 0, scale: 0.5, rotateY: 180, y: 40 }}
			whileInView={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
			viewport={{ once: true, amount: 0.4 }}
			transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
			style={{ transformStyle: "preserve-3d" }}
			className="h-full w-full">
			{children}
		</motion.div>
	</div>
);

export default PhotoReveal;
