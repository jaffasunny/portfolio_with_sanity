import { ComponentType } from "react";

/**
 * Section wrapper. The Framer template lays every section out as a single
 * full-width block with generous vertical whitespace and a centered content
 * column (~1180px), no side rails and no per-section background image —
 * unlike the old CRA-era layout this replaces. `idName` becomes the
 * scroll-anchor id used by the navbar links; `bgClass` sets the section
 * background (almost always the cream `app__primarybg`).
 *
 * `fullBleed` skips the standard `app__wrapper` padding/max-width container
 * — used only by the hero, which needs to own its own exact 100vh box
 * (padding from the standard wrapper would push it taller than the
 * viewport), matching the template's home section.
 */
const AppWrap = <P extends object>(
	Component: ComponentType<P>,
	idName: string,
	bgClass: string = "app__primarybg",
	fullBleed: boolean = false
) => {
	const HOC = (props: P) =>
		fullBleed ? (
			<section id={idName} className={`w-full ${bgClass}`}>
				<Component {...props} />
			</section>
		) : (
			<section id={idName} className={`w-full ${bgClass}`}>
				<div className="app__wrapper">
					<Component {...props} />
				</div>
			</section>
		);

	return HOC;
};

export default AppWrap;
