import React, { useMemo, useState } from "react";
import FilterControl from "../components/filter/FilterControl";
import {
	applyComparativaFilters,
	buildComparativaFilterGroups,
} from "../components/filter/filterHelpers";
import Title from "../components/title/Title";
import ProductCard from "../components/product-card/ProductCard";
import { usePriceSort, sortByPrice } from "../../../hooks/usePriceSort";
import { useViewMode } from "../../../hooks/useViewMode";
import { Styled } from "../styles";
import { flattenDestacados, groupByCategoria } from "../../../hooks/useOfertas";

/**
 * Comparativa: mismos productos destacados, agrupados por categoría
 * (campo `categoria` del endpoint; mientras no exista → "Sin categoría").
 * Filtros: marca + presentación.
 */
export default function ComparativaView({ destacados = [] }) {
	const [selected, setSelected] = useState({ marca: [], presentacion: [] });
	const { viewMode, toggleViewMode } = useViewMode();
	const { priceSort, togglePriceSort } = usePriceSort();

	const items = useMemo(() => flattenDestacados(destacados), [destacados]);
	const groups = useMemo(() => buildComparativaFilterGroups(items), [items]);
	const filteredItems = useMemo(
		() => applyComparativaFilters(items, selected),
		[items, selected]
	);
	const grupos = useMemo(() => {
		const grouped = groupByCategoria(filteredItems);
		if (!priceSort) return grouped;
		return grouped.map((grupo) => ({
			...grupo,
			items: sortByPrice(grupo.items || [], priceSort),
		}));
	}, [filteredItems, priceSort]);

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
				<Title>COMPARATIVA</Title>
				{grupos.map((grupo) => (
					<React.Fragment key={grupo.nombre}>
						{grupo.nombre !== "Sin categoría" && <Title>{grupo.nombre}</Title>}
						{grupo.items.map((item) => (
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
