/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SANITY_PROJECT_ID: string;
	readonly VITE_SANITY_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "*.png" {
	const value: string;
	export default value;
}

declare module "*.jpg" {
	const value: string;
	export default value;
}

declare module "*.svg" {
	const value: string;
	export default value;
}
