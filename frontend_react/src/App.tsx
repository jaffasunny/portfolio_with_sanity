import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Lenis from "lenis";

import { FloatingProfilePhoto, Navbar, PageLoader, SiteFooter } from "./components";
import { About, Footer, Header, Skills, Testimonial, Work } from "./container";
import Certifications from "./container/Certifications/Certifications";
import { urlFor, client } from "./client";
import { trackFetch, useIsLoading } from "./loadingStore";
import type { Profile } from "./types/sanity";

const App = () => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const isLoading = useIsLoading();
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		// Targets the singleton's fixed document id (see backend_sanity's
		// Studio structure) rather than `*[_type=="profile"][0]`, which would
		// pick an arbitrary document if a stray extra `profile` ever exists.
		const query = '*[_id=="profile"][0]';
		trackFetch(client.fetch<Profile>(query)).then((data) => setProfile(data));
	}, []);

	// Slow, smooth momentum-based scrolling site-wide (instead of the
	// default native jump-per-wheel-tick feel) — Lenis lerps the actual
	// scroll position toward its target every frame, so window.scrollY
	// still updates normally and FloatingProfilePhoto's scroll-driven
	// animation keeps working without any changes.
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.4,
			easing: (t: number) => 1 - Math.pow(1 - t, 3),
			smoothWheel: true,
		});
		lenisRef.current = lenis;

		let rafId: number;
		const raf = (time: number) => {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		};
		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	// Lock scrolling — both Lenis's own wheel/touch handling and the
	// underlying native scroll — while the full-page loader is up, so the
	// page can't be scrolled behind it before content has arrived. A layout
	// effect (not a passive one) so it applies in the same commit the loader
	// becomes visible/hidden in, instead of one paint later.
	useLayoutEffect(() => {
		if (isLoading) {
			lenisRef.current?.stop();
			document.documentElement.style.overflow = "hidden";
		} else {
			lenisRef.current?.start();
			document.documentElement.style.overflow = "";
		}
	}, [isLoading]);

	// Null until a `profile` document with a photo exists in Sanity —
	// FloatingProfilePhoto renders a skeleton in that case instead of a
	// fallback static image.
	const photoSrc = profile?.photo?.asset ? urlFor(profile.photo).url() : null;

	return (
		<div className="bg-primary font-base">
			<PageLoader />
			<Navbar />
			<Header />
			<About />
			<Work />
			<Skills />
			<Testimonial />
			<Certifications />
			<Footer />
			<SiteFooter />

			{/* The one real profile photo — see FloatingProfilePhoto for why
			    it lives here instead of inside Header/About directly. */}
			<FloatingProfilePhoto src={photoSrc} alt={profile?.name ?? "Jaffer Sunny"} />
		</div>
	);
};

export default App;
