import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";

import SanityImage from "./SanityImage";

export const HERO_PHOTO_SLOT_ID = "photo-slot-hero";
export const ABOUT_PHOTO_SLOT_ID = "photo-slot-about";

interface FloatingProfilePhotoProps {
	src: string | null;
	alt?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * The one real profile photo element on the page. Header and About each
 * plant an empty, invisible slot (see `photo-slot-hero` / `photo-slot-about`)
 * marking where the photo should visually sit in each section's layout.
 * This component reads both slots' live `getBoundingClientRect()` and
 * renders the actual photo as a `position: fixed` overlay, continuously
 * interpolated between them based on how far the About slot has scrolled
 * up into view.
 *
 * This used to poll every requestAnimationFrame tick and push the result
 * through React state (a re-render every frame). It's driven by
 * framer-motion now instead: `useScroll` supplies scrollY as a MotionValue
 * that only updates on an actual scroll event, and `useMotionValueEvent`
 * recomputes our own handful of MotionValues (top/left/width/height/
 * rotateY/scale/opacity) off that. Those MotionValues are then passed
 * straight to `motion.div`'s style, so framer-motion writes to the DOM
 * directly on change — no React re-render, no unconditional per-frame
 * polling — while `rotateY`/`scale` get composed into the element's
 * `transform` automatically instead of us building that string by hand.
 *
 * Movement is deliberately continuous across the *entire* hero scroll,
 * not held motionless in a "pinned" dead zone first. Progress is driven by
 * how close the About section's top edge is to the top of the viewport —
 * 0 right at the top of the page, 1 exactly when About has fully arrived —
 * so the photo visibly, gradually travels from the hero into the Hey
 * section starting on the very first pixel of scroll, then settles the
 * moment it gets there instead of snapping into motion partway through.
 *
 * Once it arrives, this keeps tracking the About slot's *live* rect (see
 * the t===1 branch below) so it scrolls normally with the page instead of
 * staying frozen on screen — it just keeps going with the rest of the
 * content from there, the same as any other element in the layout, and
 * scrolls off the top of the screen on its own like everything else does.
 */
const FloatingProfilePhoto = ({ src, alt }: FloatingProfilePhotoProps) => {
	// The hero photo's rest position and size, captured once and then
	// frozen — this is the t=0 end of the interpolation below, independent
	// of Header's own scroll.
	const restRectRef = useRef<{ top: number; left: number; width: number; height: number; locked: boolean } | null>(null);
	// Whatever scrollY the page happened to be at on mount — a reload can
	// land anywhere (e.g. the browser restoring scroll position at the Hey
	// section), not just at the top. Locking is "has the user scrolled at
	// all *from wherever they started*," not "is scrollY > 0."
	const initialScrollYRef = useRef<number | null>(null);

	const top = useMotionValue(0);
	const left = useMotionValue(0);
	const width = useMotionValue(0);
	const height = useMotionValue(0);
	const rotateY = useMotionValue(150);
	const scale = useMotionValue(0.8);
	const opacity = useMotionValue(0);

	const { scrollY } = useScroll();

	// One shared recompute function (kept in a ref so both the mount/resize
	// effect below and the scroll subscription always call the exact same
	// up-to-date logic, instead of two copies that could drift apart).
	const recomputeRef = useRef<() => void>();
	recomputeRef.current = () => {
		const heroEl = document.getElementById(HERO_PHOTO_SLOT_ID);
		const aboutEl = document.getElementById(ABOUT_PHOTO_SLOT_ID);
		const aboutSectionEl = document.getElementById("about");

		if (!heroEl || !aboutEl || !aboutSectionEl) return;

		const aboutRect = aboutEl.getBoundingClientRect();
		const aboutSectionRect = aboutSectionEl.getBoundingClientRect();

		if (initialScrollYRef.current === null) {
			initialScrollYRef.current = window.scrollY;
		}

		// Keep the rest rect fresh off the slot's *live* position only until
		// the user scrolls away from wherever the page started — that
		// absorbs any late layout shift right after mount (fonts or images
		// finishing load) without ever going stale. `r.top` is converted to
		// a scroll-invariant "document top" (`r.top + window.scrollY`) before
		// storing, so this is correct even when the page loads already
		// scrolled down (e.g. a refresh that lands mid-page) — without that
		// correction, refreshing at the Hey section would capture the hero
		// slot's rect from *that* scrolled viewport position as if it were
		// the true t=0 rest spot, so scrolling back up would lerp toward a
		// bogus position and the photo would fly off-screen.
		if (!restRectRef.current || !restRectRef.current.locked) {
			const r = heroEl.getBoundingClientRect();
			restRectRef.current = {
				top: r.top + window.scrollY,
				left: r.left,
				width: r.width,
				height: r.height,
				locked: window.scrollY !== initialScrollYRef.current,
			};
		}
		const rest = restRectRef.current;

		// The slot's position relative to its own section is fixed (it's
		// just normal layout inside a 100vh section) — only the section's
		// position on screen changes as you scroll. So the slot's *resting*
		// on-screen spot, i.e. where it'll sit once the About section has
		// fully scrolled into view, is this offset applied to a
		// section-top of 0.
		const restingLeft = aboutRect.left - aboutSectionRect.left;
		const restingTop = aboutRect.top - aboutSectionRect.top;

		// Continuous progress: 0 when the page is at the very top (About's
		// top sits a full viewport-height below), 1 the instant About's
		// top reaches the top of the viewport. No dead zone — the photo is
		// already inching along on the very first pixel of scroll, arriving
		// exactly when Hey does.
		const vh = window.innerHeight;
		const t = Math.min(1, Math.max(0, 1 - aboutSectionRect.top / vh));

		// While still traveling (t < 1), interpolate toward
		// `restingLeft/restingTop` — the offset-within-section math above,
		// which represents where the slot WILL be once the section has
		// fully arrived. Once t actually reaches 1, stop using that (it
		// goes stale — it's invariant to further scrolling by construction)
		// and track the slot's own live rect directly instead. That's what
		// makes it genuinely "stick" to the section afterward, scrolling
		// with the page like a normal element, instead of staying pinned
		// to a fixed screen position while everything else scrolls past.
		left.set(t < 1 ? lerp(rest.left, restingLeft, t) : aboutRect.left);
		top.set(t < 1 ? lerp(rest.top, restingTop, t) : aboutRect.top);
		width.set(lerp(rest.width, aboutRect.width, t));
		height.set(lerp(rest.height, aboutRect.height, t));
		rotateY.set(lerp(150, 0, t));
		scale.set(lerp(0.8, 1, t));
		opacity.set(1);
	};

	useEffect(() => {
		const handleResize = () => {
			// The rest rect is normally frozen once the user scrolls away
			// from wherever the page started (see recompute above) — that's
			// right for scrolling, but a viewport resize (rotating a phone,
			// resizing the browser window) can change which responsive
			// breakpoint the hero slot's classes fall into, so its actual
			// on-screen size/position genuinely changes too. Forcing a fresh
			// capture here (rather than trusting the frozen one) is what
			// keeps the photo correctly centered/sized after a resize —
			// without this, it kept using pre-resize measurements and drifted
			// off-center or the wrong size at the new viewport width.
			restRectRef.current = null;
			recomputeRef.current?.();
		};
		recomputeRef.current?.();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useMotionValueEvent(scrollY, "change", () => recomputeRef.current?.());

	return (
		<motion.div
			style={{
				position: "fixed",
				top,
				left,
				width,
				height,
				opacity,
				pointerEvents: "none",
				zIndex: 15,
				perspective: 1200,
				transformStyle: "preserve-3d",
				rotateY,
				scale,
			}}
			className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
			{src ? (
				<SanityImage src={src} alt={alt ?? ""} wrapperClassName="h-full w-full" />
			) : (
				<div className="h-full w-full animate-pulse bg-light-gray" />
			)}
		</motion.div>
	);
};

export default FloatingProfilePhoto;
