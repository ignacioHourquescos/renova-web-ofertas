import { useEffect, useState } from "react";

const STORAGE_KEY = "ofertas-view-mode";

export function useViewMode() {
	const [viewMode, setViewMode] = useState("cards");

	useEffect(() => {
		try {
			const stored = window.sessionStorage.getItem(STORAGE_KEY);
			if (stored === "list" || stored === "cards") {
				setViewMode(stored);
			}
		} catch {
			/* ignore */
		}
	}, []);

	const setMode = (mode) => {
		const next = mode === "list" ? "list" : "cards";
		setViewMode(next);
		try {
			window.sessionStorage.setItem(STORAGE_KEY, next);
		} catch {
			/* ignore */
		}
	};

	const toggleViewMode = () => {
		setMode(viewMode === "cards" ? "list" : "cards");
	};

	return { viewMode, setViewMode: setMode, toggleViewMode };
}
