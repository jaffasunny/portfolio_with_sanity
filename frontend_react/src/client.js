import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	// projectId: "401mjdck",
	dataset: "production",
	apiVersion: "2022-02-01",
	useCdn: true,
	token: process.env.REACT_APP_SANITY_TOKEN,
	// token:
	// "skgYoUzciGUUZe1afnEGkwnv6NcoFKSwXQNli6sk3kQQ72N4tIYWQZlwPY3liu3NoaVFbFQM9x7DrAWjeV5cqBoCiiQ5XBDfgeymErnBCfXmDDpDpyGqAivXLHzGtmLUcDBKMUAySgQkGW4eRICGQBWxpPBA0Y9NKiO3DCspYoCyKeQsudkz",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
