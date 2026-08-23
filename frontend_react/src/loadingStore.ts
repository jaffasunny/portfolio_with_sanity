import { useSyncExternalStore } from "react";

// Tiny external store tracking how many Sanity fetches are in flight
// site-wide, so a single full-page loader (see PageLoader) can stay up
// until every section's data has arrived — without threading a loading
// prop through every container.
let pendingCount = 0;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};

const getSnapshot = () => pendingCount > 0;

export const trackFetch = <T,>(promise: Promise<T>): Promise<T> => {
	pendingCount += 1;
	notify();

	return promise.finally(() => {
		pendingCount -= 1;
		notify();
	});
};

export const useIsLoading = () => useSyncExternalStore(subscribe, getSnapshot);
