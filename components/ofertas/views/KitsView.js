import { useMemo, useState } from "react";
import FilterControl from "../components/filter/FilterControl";
import {
	applyKitsFilters,
	buildKitsFilterGroups,
} from "../components/filter/filterHelpers";
import ProductCard from "../components/product-card/ProductCard";
import { usePriceSort, sortByPrice } from "../../../hooks/usePriceSort";
import { useViewMode } from "../../../hooks/useViewMode";
import { Styled } from "../styles";

export default function KitsView({ kits = [] }) {
	const [selected, setSelected] = useState({ tipoVehiculo: [] });
	const { viewMode, toggleViewMode } = useViewMode();
	const { priceSort, togglePriceSort } = usePriceSort();
	const groups = useMemo(() => buildKitsFilterGroups(kits), [kits]);
	const filtered = useMemo(() => {
		const list = applyKitsFilters(kits, selected);
		return sortByPrice(list, priceSort);
	}, [kits, selected, priceSort]);

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
				{filtered.map((kit) => (
					<ProductCard
						key={kit.id}
						layout={viewMode}
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
			</Styled.Section>
		</>
	);
}
