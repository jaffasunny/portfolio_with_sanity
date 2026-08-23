import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client: SanityClient = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
	dataset: "production",
	apiVersion: "2022-02-01",
	useCdn: true,
	token: import.meta.env.VITE_SANITY_TOKEN,
	ignoreBrowserTokenWarning: true,
	// Explicit regardless of apiVersion's default: never resolve to a
	// document's draft revision. Without this, an unpublished draft (a
	// document that only exists as `drafts.<id>`, never actually published)
	// would still be returned by a plain fetch and show up on the live site.
	perspective: "published",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
