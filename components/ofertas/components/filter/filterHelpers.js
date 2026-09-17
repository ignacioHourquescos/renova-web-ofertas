/** Labels amigables para tipoVehiculo de kits. */
export const TIPO_VEHICULO_LABELS = {
	liviano: "Autos",
	camioneta: "Camionetas",
};

export function uniqueSorted(values = []) {
	return [...new Set(values.map((v) => String(v || "").trim()).filter(Boolean))].sort((a, b) =>
		a.localeCompare(b, "es")
	);
}

export function getPresentacion(item = {}) {
	return String(item.presentacion || item.etiquetaPrecio || "").trim();
}

/** Opciones de filtro para Kits: Autos / Camionetas. */
export function buildKitsFilterGroups(kits = []) {
	const tipos = uniqueSorted(kits.map((k) => k.tipoVehiculo));
	const options = tipos
		.map((value) => ({
			value,
			label: TIPO_VEHICULO_LABELS[value] || value,
		}))
		.sort((a, b) => a.label.localeCompare(b.label, "es"));

	if (!options.length) return [];

	return [
		{
			key: "tipoVehiculo",
			label: "Tipo de vehículo",
			options,
		},
	];
}

export function applyKitsFilters(kits = [], selected = {}) {
	const tipos = selected.tipoVehiculo || [];
	if (!tipos.length) return kits;
	return kits.filter((kit) => tipos.includes(kit.tipoVehiculo));
}

const SECCION_KITS = "KITS";
const SECCION_FILTROS = "FILTROS";
const SECCION_ORDER = [SECCION_KITS, SECCION_FILTROS];

function looksLikeKit(kit = {}) {
	const titulo = String(kit.titulo || kit.nombre || "").trim();
	const codigo = String(kit.codigoArticulo || "").trim();
	return /^kit\b/i.test(titulo) || /^kit\b/i.test(codigo);
}

/** Nombre de sección para un ítem de la pestaña Filtros. */
export function getKitSeccion(kit = {}) {
	const explicit = String(
		kit.seccionNombre || kit.seccion || kit.categoria || kit.category || ""
	).trim();
	if (explicit) return explicit.toUpperCase();
	return looksLikeKit(kit) ? SECCION_KITS : SECCION_FILTROS;
}

/** Agrupa kits primero, filtros después (como Lubricantes por sección). */
export function groupKitsBySeccion(kits = []) {
	const groups = new Map();

	kits.forEach((kit) => {
		const key = getKitSeccion(kit);
		if (!groups.has(key)) groups.set(key, []);
		groups.get(key).push(kit);
	});

	return [...groups.entries()]
		.map(([nombre, items]) => ({
			nombre,
			items: items.sort((a, b) => (Number(a.orden) || 0) - (Number(b.orden) || 0)),
		}))
		.sort((a, b) => {
			const ia = SECCION_ORDER.indexOf(a.nombre.toUpperCase());
			const ib = SECCION_ORDER.indexOf(b.nombre.toUpperCase());
			if (ia === -1 && ib === -1) return a.nombre.localeCompare(b.nombre, "es");
			if (ia === -1) return 1;
			if (ib === -1) return -1;
			return ia - ib;
		});
}

/** Opciones para Comparativa: marca + presentación. */
export function buildComparativaFilterGroups(items = []) {
	const marcas = uniqueSorted(items.map((i) => i.marca));
	const presentaciones = uniqueSorted(items.map(getPresentacion));
	const groups = [];

	if (marcas.length) {
		groups.push({
			key: "marca",
			label: "Marca",
			options: marcas.map((value) => ({ value, label: value })),
		});
	}

	if (presentaciones.length) {
		groups.push({
			key: "presentacion",
			label: "Presentación",
			options: presentaciones.map((value) => ({ value, label: value })),
		});
	}

	return groups;
}

export function applyComparativaFilters(items = [], selected = {}) {
	const marcas = selected.marca || [];
	const presentaciones = selected.presentacion || [];

	return items.filter((item) => {
		if (marcas.length && !marcas.includes(item.marca)) return false;
		if (presentaciones.length) {
			const presentacion = getPresentacion(item);
			if (!presentaciones.includes(presentacion)) return false;
		}
		return true;
	});
}

/** Opciones para Destacados: sección + marca. */
export function buildDestacadosFilterGroups(destacados = []) {
	const secciones = uniqueSorted(destacados.map((s) => s.seccionNombre));
	const marcas = uniqueSorted(
		destacados.flatMap((s) => (s.items || []).map((i) => i.marca))
	);
	const groups = [];

	if (secciones.length) {
		groups.push({
			key: "seccion",
			label: "Sección",
			options: secciones.map((value) => ({ value, label: value })),
		});
	}

	if (marcas.length) {
		groups.push({
			key: "marca",
			label: "Marca",
			options: marcas.map((value) => ({ value, label: value })),
		});
	}

	return groups;
}

export function applyDestacadosFilters(destacados = [], selected = {}) {
	const secciones = selected.seccion || [];
	const marcas = selected.marca || [];

	return destacados
		.filter((seccion) => {
			if (secciones.length && !secciones.includes(seccion.seccionNombre)) return false;
			return true;
		})
		.map((seccion) => {
			if (!marcas.length) return seccion;
			return {
				...seccion,
				items: (seccion.items || []).filter((item) => marcas.includes(item.marca)),
			};
		})
		.filter((seccion) => (seccion.items || []).length > 0);
}

export function countActiveFilters(selected = {}) {
	return Object.values(selected).reduce((acc, list) => acc + (list?.length || 0), 0);
}
