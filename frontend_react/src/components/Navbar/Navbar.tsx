import { useState, useEffect } from "react";
import { HiOutlineDotsHorizontal, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

import { client } from "../../client";
import { trackFetch } from "../../loadingStore";
import type { NavbarSettings } from "../../types/sanity";

const defaultNavItems = [
	{ _key: "home", label: "Home", sectionId: "home" },
	{ _key: "about", label: "About", sectionId: "about" },
	{ _key: "work", label: "Work", sectionId: "work" },
	{ _key: "skills", label: "Skills", sectionId: "skills" },
	{ _key: "contact", label: "Contact", sectionId: "contact" },
];

/**
 * Floating black pill nav, centered at the top of the page — matches the
 * template exactly: it's always just the name pill + a "..." button, at
 * every screen width (no separate inline desktop nav). Clicking it expands
 * a dropdown panel with each section as its own rounded white button.
 */
const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [settings, setSettings] = useState<NavbarSettings | null>(null);

	useEffect(() => {
		const query = '*[_type=="navbar"][0]';
		trackFetch(client.fetch<NavbarSettings>(query)).then((data) => setSettings(data));
	}, []);

	const displayName = settings?.displayName ?? "Jaffer Sunny";
	const navItems = settings?.navItems?.length ? settings.navItems : defaultNavItems;

	return (
		<nav className="fixed top-6 left-1/2 z-[20] w-full max-w-[95%] -translate-x-1/2">
			<div className="dark-card mx-auto flex w-fit max-w-full items-center gap-3 rounded-full py-2 pl-5 pr-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
				<span className="text-sm font-semibold">{displayName}</span>

				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					aria-label={open ? "Close menu" : "Open menu"}
					className="app__flex h-8 w-8 shrink-0 rounded-full bg-white text-ink transition-transform duration-150 hover:scale-105">
					{open ? (
						<HiX className="h-4 w-4" />
					) : (
						<HiOutlineDotsHorizontal className="h-4 w-4" />
					)}
				</button>
			</div>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -12 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
						className="dark-card mx-auto mt-2 flex w-[10rem] max-w-full flex-col items-stretch gap-2 rounded-2xl p-3">
						{navItems.map((item) => (
							<a
								key={item._key ?? item.sectionId}
								href={`#${item.sectionId}`}
								onClick={() => setOpen(false)}
								className="rounded-lg bg-white px-4 py-2 text-center text-sm font-medium text-ink no-underline transition-opacity hover:opacity-80">
								{item.label}
							</a>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
