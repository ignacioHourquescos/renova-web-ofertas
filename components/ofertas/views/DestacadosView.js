import React, { useMemo, useState } from "react";
import FilterControl from "../components/filter/FilterControl";
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
	const groups = useMemo(() => buildDestacadosFilterGroups(destacados), [destacados]);
	const filtered = useMemo(() => {
		const sections = applyDestacadosFilters(destacados, selected);
		if (!priceSort) return sections;
		return sections.map((seccion) => ({
			...seccion,
			items: sortByPrice(seccion.items || [], priceSort),
		}));
	}, [destacados, selected, priceSort]);

	return (
		<>
			<FilterControl
				groups={groups}
				selected={selected}
				onChange={setSelected}
				viewMode={viewMode}
				onToggleView={toggleViewMode}
				priceSort={priceSort}
				onTogglePriceSort={togglePriceSort}
			/>
			<Styled.Section $layout={viewMode}>
				{filtered.map((seccion) => (
					<React.Fragment key={seccion.seccionId}>
						<Title>{seccion.seccionNombre}</Title>
						{seccion.items.map((item) => (
							<ProductCard
								key={item.id}
								layout={viewMode}
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
