import { useState } from "react";

interface SanityImageProps {
	src: string;
	alt?: string;
	wrapperClassName?: string;
	className?: string;
	skeletonClassName?: string;
	showSkeleton?: boolean;
	objectFit?: "cover" | "contain";
}

const SanityImage = ({
	src,
	alt = "",
	wrapperClassName = "",
	className = "",
	skeletonClassName = "bg-light-gray",
	showSkeleton = true,
	objectFit = "cover",
}: SanityImageProps) => {
	const [loaded, setLoaded] = useState(false);
	const [errored, setErrored] = useState(false);

	if (errored) {
		return (
			<span
				role="img"
				aria-label={alt}
				className={`relative block overflow-hidden ${skeletonClassName} ${wrapperClassName}`}
			/>
		);
	}

	return (
		<span className={`relative block overflow-hidden ${wrapperClassName}`}>
			{showSkeleton && !loaded && (
				<span className={`absolute inset-0 animate-pulse ${skeletonClassName}`} />
			)}
			<img
				src={src}
				alt={alt}
				loading="lazy"
				decoding="async"
				onLoad={() => setLoaded(true)}
				onError={() => setErrored(true)}
				className={`h-full w-full ${
					objectFit === "contain" ? "object-contain" : "object-cover"
				} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
			/>
		</span>
	);
};

export default SanityImage;
