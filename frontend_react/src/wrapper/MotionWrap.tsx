import { ComponentType } from "react";
import { motion } from "framer-motion";

/**
 * Scroll-reveal wrapper — mirrors the Framer template's subtle fade/rise-in
 * as each section enters the viewport (e.g. the "From idea to launch..."
 * paragraph, which fades from gray to black on scroll).
 */
const MotionWrap = <P extends object>(
	Component: ComponentType<P>,
	classNames: string = ""
) => {
	const HOC = (props: P) => (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: "some" }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className={`${classNames} w-full flex flex-col`}>
			<Component {...props} />
		</motion.div>
	);

	return HOC;
};

export default MotionWrap;
