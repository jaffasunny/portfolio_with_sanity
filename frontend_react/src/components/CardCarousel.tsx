import { ReactNode, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface CardCarouselProps {
	children: ReactNode[];
}

/**
 * Swipeable slider (Embla, unstyled so it inherits this site's own card
 * look) for a row of fixed-width cards that no longer fit in one line —
 * arrow buttons plus a dot per slide, both wired to the same Embla
 * instance so clicking a dot and swiping stay in sync.
 */
const CardCarousel = ({ children }: CardCarouselProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
	});
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const [isScrollable, setIsScrollable] = useState(false);

	const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
		setSelectedIndex(api.selectedScrollSnap());
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
		setIsScrollable(api.scrollSnapList().length > 1);
	}, []);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect(emblaApi);
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
		emblaApi.on("resize", onSelect);
	}, [emblaApi, onSelect]);

	return (
		<div>
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex gap-8 justify-between">
					{children.map((child, i) => (
						<div className="min-w-0 max-sm:w-full shrink-0" key={i}>
							{child}
						</div>
					))}
				</div>
			</div>

			{isScrollable && (
				<div className="mt-6 flex items-center justify-center gap-5">
					<button
						type="button"
						aria-label="Previous"
						onClick={() => emblaApi?.scrollPrev()}
						disabled={!canScrollPrev}
						className="app__flex h-10 w-10 shrink-0 rounded-full border border-ink/15 text-ink transition-opacity disabled:opacity-30">
						<HiChevronLeft size={20} />
					</button>

					<div className="flex items-center gap-2">
						{children.map((_, i) => (
							<button
								type="button"
								key={i}
								aria-label={`Go to slide ${i + 1}`}
								onClick={() => emblaApi?.scrollTo(i)}
								className={`h-2 rounded-full bg-ink transition-all ${
									i === selectedIndex ? "w-5 opacity-100" : "w-2 opacity-20"
								}`}
							/>
						))}
					</div>

					<button
						type="button"
						aria-label="Next"
						onClick={() => emblaApi?.scrollNext()}
						disabled={!canScrollNext}
						className="app__flex h-10 w-10 shrink-0 rounded-full border border-ink/15 text-ink transition-opacity disabled:opacity-30">
						<HiChevronRight size={20} />
					</button>
				</div>
			)}
		</div>
	);
};

export default CardCarousel;
