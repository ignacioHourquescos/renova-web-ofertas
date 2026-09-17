import React, { useMemo, useState } from "react";
import FilterControl, { FILTER_BAR_ENABLED } from "../components/filter/FilterControl";
import {
	applyKitsFilters,
	buildKitsFilterGroups,
	groupKitsBySeccion,
} from "../components/filter/filterHelpers";
import Title from "../components/title/Title";
import ProductCard from "../components/product-card/ProductCard";
import { usePriceSort, sortByPrice } from "../../../hooks/usePriceSort";
import { useViewMode } from "../../../hooks/useViewMode";
import { Styled } from "../styles";

export default function KitsView({ kits = [] }) {
	const [selected, setSelected] = useState({ tipoVehiculo: [] });
	const { viewMode, toggleViewMode } = useViewMode();
	const { priceSort, togglePriceSort } = usePriceSort();
	// Sin la barra, la vista queda en tarjetas y sin orden por precio.
	const layout = FILTER_BAR_ENABLED ? viewMode : "cards";
	const sort = FILTER_BAR_ENABLED ? priceSort : null;
	const groups = useMemo(() => buildKitsFilterGroups(kits), [kits]);
	const filtered = useMemo(() => {
		const list = applyKitsFilters(kits, selected);
		const secciones = groupKitsBySeccion(list);
		if (!sort) return secciones;
		return secciones.map((seccion) => ({
			...seccion,
			items: sortByPrice(seccion.items || [], sort),
		}));
	}, [kits, selected, sort]);

	return (
		<>
			{FILTER_BAR_ENABLED ? (
				<FilterControl
					groups={groups}
					selected={selected}
					onChange={setSelected}
					viewMode={viewMode}
					onToggleView={toggleViewMode}
					priceSort={priceSort}
					onTogglePriceSort={togglePriceSort}
				/>
			) : null}
			<Styled.Section $layout={layout}>
				{filtered.map((seccion) => (
					<React.Fragment key={seccion.nombre}>
						<Title>{seccion.nombre}</Title>
						{seccion.items.map((kit) => (
							<ProductCard
								key={kit.id}
								layout={layout}
								product={{
									id: kit.id,
									title:
										kit.titulo ||
										[kit.modelo, kit.motor].filter(Boolean).join(" ") ||
										kit.nombre,
									subtitle: kit.descripcion,
									imageUrl: kit.imagenThumbUrl || kit.imagenUrl,
									priceLabel: kit.precioFormateado,
									price: kit.precio,
								}}
							/>
						))}
					</React.Fragment>
				))}
			</Styled.Section>
		</>
	);
}
