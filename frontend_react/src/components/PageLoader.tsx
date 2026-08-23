import { AnimatePresence, motion } from "framer-motion";

import { useIsLoading } from "../loadingStore";

/**
 * Full-page cover shown until every section's Sanity fetch (tracked via
 * trackFetch in loadingStore) has resolved, so the page never flashes
 * fallback copy before the real content arrives.
 */
const PageLoader = () => {
	const isLoading = useIsLoading();

	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="app__flex fixed inset-0 z-[100] bg-primary">
					<div className="loader" />
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default PageLoader;
