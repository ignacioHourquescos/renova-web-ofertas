import React, { useMemo, useState } from "react";
import FilterControl, { FILTER_BAR_ENABLED } from "../components/filter/FilterControl";
import {
	applyDestacadosFilters,
	buildDestacadosFilterGroups,
} from "../components/filter/filterHelpers";
import Title from "../components/title/Title";
import ProductCard from "../components/product-card/ProductCard";
import { usePriceSort, sortByPrice } from "../../../hooks/usePriceSort";
import { useViewMode } from "../../../hooks/useViewMode";
import { Styled } from "../styles";

/** Destacados agrupados por marca / sección (como vienen del endpoint). */
export default function DestacadosView({ destacados = [] }) {
	const [selected, setSelected] = useState({ seccion: [], marca: [] });
	const { viewMode, toggleViewMode } = useViewMode();
	const { priceSort, togglePriceSort } = usePriceSort();
	// Sin la barra, la vista queda en tarjetas y sin orden por precio.
	const layout = FILTER_BAR_ENABLED ? viewMode : "cards";
	const sort = FILTER_BAR_ENABLED ? priceSort : null;
	const groups = useMemo(() => buildDestacadosFilterGroups(destacados), [destacados]);
	const filtered = useMemo(() => {
		const sections = applyDestacadosFilters(destacados, selected);
		if (!sort) return sections;
		return sections.map((seccion) => ({
			...seccion,
			items: sortByPrice(seccion.items || [], sort),
		}));
	}, [destacados, selected, sort]);

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
					<React.Fragment key={seccion.seccionId}>
						<Title>{seccion.seccionNombre}</Title>
						{seccion.items.map((item) => (
							<ProductCard
								key={item.id}
								layout={layout}
								product={{
									id: item.id,
									brand: item.marca,
									title: item.titulo,
									imageUrl: item.imagenThumbUrl || item.imagenUrl,
									priceLabel: item.precioFormateado,
									price: item.precio,
								}}
							/>
						))}
					</React.Fragment>
				))}
			</Styled.Section>
		</>
	);
}
