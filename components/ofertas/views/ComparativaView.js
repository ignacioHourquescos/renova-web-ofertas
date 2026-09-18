import React, { useMemo, useState } from "react";
import FilterControl, { FILTER_BAR_ENABLED } from "../components/filter/FilterControl";
import {
	applyComparativaFilters,
	buildComparativaFilterGroups,
	getAtributosRows,
	getGraduacion,
	getImagenes,
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
	// Sin la barra, la vista queda en tarjetas y sin orden por precio.
	const layout = FILTER_BAR_ENABLED ? viewMode : "cards";
	const sort = FILTER_BAR_ENABLED ? priceSort : null;

	const items = useMemo(() => flattenDestacados(destacados), [destacados]);
	const groups = useMemo(() => buildComparativaFilterGroups(items), [items]);
	const filteredItems = useMemo(
		() => applyComparativaFilters(items, selected),
		[items, selected]
	);
	const grupos = useMemo(() => {
		const grouped = groupByCategoria(filteredItems);
		if (!sort) return grouped;
		return grouped.map((grupo) => ({
			...grupo,
			items: sortByPrice(grupo.items || [], sort),
		}));
	}, [filteredItems, sort]);

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
				<Title>COMPARATIVA</Title>
				{grupos.map((grupo) => (
					<React.Fragment key={grupo.nombre}>
						{grupo.nombre !== "Sin categoría" && <Title>{grupo.nombre}</Title>}
						{grupo.items.map((item) => (
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
									badge: getGraduacion(item),
									detailImages: getImagenes(item),
									specs: getAtributosRows(item),
									description: item.descripcion,
								}}
							/>
						))}
					</React.Fragment>
				))}
			</Styled.Section>
		</>
	);
}
