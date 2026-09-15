import { useEffect, useState } from "react";

const STORAGE_KEY = "ofertas-price-sort";

/** null | "asc" | "desc" */
export function usePriceSort() {
	const [priceSort, setPriceSort] = useState(null);

	useEffect(() => {
		try {
			const stored = window.sessionStorage.getItem(STORAGE_KEY);
			if (stored === "asc" || stored === "desc") {
				setPriceSort(stored);
			}
		} catch {
			/* ignore */
		}
	}, []);

	const setSort = (direction) => {
		const next = direction === "asc" || direction === "desc" ? direction : null;
		setPriceSort(next);
		try {
			if (next) window.sessionStorage.setItem(STORAGE_KEY, next);
			else window.sessionStorage.removeItem(STORAGE_KEY);
		} catch {
			/* ignore */
		}
	};

	const togglePriceSort = () => {
		setSort(priceSort === "asc" ? "desc" : "asc");
	};

	return { priceSort, setPriceSort: setSort, togglePriceSort };
}

export function sortByPrice(items = [], direction, priceKey = "precio") {
	if (!direction || !items.length) return items;
	const mult = direction === "desc" ? -1 : 1;
	return [...items].sort((a, b) => {
		const pa = Number(a?.[priceKey]) || 0;
		const pb = Number(b?.[priceKey]) || 0;
		return mult * (pa - pb);
	});
}
