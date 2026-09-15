import { useState, useEffect } from "react";

const OFERTAS_URL = `${process.env.NEXT_PUBLIC_URL}/ofertas`;

let cache = null;
let inflight = null;

async function loadOfertas() {
	if (cache) return cache;
	if (inflight) return inflight;

	inflight = fetch(OFERTAS_URL)
		.then(async (res) => {
			if (!res.ok) throw new Error(`Error ${res.status} al cargar ofertas`);
			const data = await res.json();
			cache = {
				flyers: Array.isArray(data.flyers) ? data.flyers : [],
				kits: Array.isArray(data.kits) ? data.kits : [],
				destacados: Array.isArray(data.destacados) ? data.destacados : [],
			};
			return cache;
		})
		.finally(() => {
			inflight = null;
		});

	return inflight;
}

/** Arranca (o reutiliza) la carga de ofertas. Ideal para el splash. */
export function preloadOfertas() {
	return loadOfertas();
}

export function getOfertasCache() {
	return cache;
}

export function useOfertas() {
	const [flyers, setFlyers] = useState(cache?.flyers || []);
	const [kits, setKits] = useState(cache?.kits || []);
	const [destacados, setDestacados] = useState(cache?.destacados || []);
	const [loading, setLoading] = useState(!cache);
	const [error, setError] = useState(null);

	useEffect(() => {
		let cancelled = false;

		if (cache) {
			setFlyers(cache.flyers);
			setKits(cache.kits);
			setDestacados(cache.destacados);
			setLoading(false);
			return;
		}

		setLoading(true);
		loadOfertas()
			.then((data) => {
				if (cancelled) return;
				setFlyers(data.flyers);
				setKits(data.kits);
				setDestacados(data.destacados);
				setError(null);
			})
			.catch((err) => {
				console.error("Error fetching ofertas:", err);
				if (!cancelled) setError(err);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	return { flyers, kits, destacados, loading, error };
}

/** Aplana secciones de destacados en una lista de ítems. */
export function flattenDestacados(destacados = []) {
	return destacados.flatMap((seccion) =>
		(seccion.items || []).map((item) => ({
			...item,
			seccionId: seccion.seccionId,
			seccionNombre: seccion.seccionNombre,
		}))
	);
}

/**
 * Agrupa ítems por categoría.
 * Usa `categoria` cuando exista en el payload; si no, cae a "Sin categoría".
 */
export function groupByCategoria(items = []) {
	const groups = new Map();

	items.forEach((item) => {
		const key = String(item.categoria || item.category || "").trim() || "Sin categoría";
		if (!groups.has(key)) groups.set(key, []);
		groups.get(key).push(item);
	});

	return [...groups.entries()]
		.map(([nombre, groupItems]) => ({
			nombre,
			items: groupItems.sort((a, b) => (Number(a.orden) || 0) - (Number(b.orden) || 0)),
		}))
		.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}
