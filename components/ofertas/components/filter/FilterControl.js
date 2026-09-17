import { useEffect, useState } from "react";
import { countActiveFilters } from "./filterHelpers";
import { Styled } from "./styles";

const IconFilter = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M4 6h16M7 12h10M10 18h4"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

const IconList = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="round"
		/>
	</svg>
);

const IconCards = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M4 5.5h7v7H4v-7ZM13 5.5h7v7h-7v-7ZM4 14.5h7v7H4v-7ZM13 14.5h7v7h-7v-7Z"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinejoin="round"
		/>
	</svg>
);

const IconPriceAsc = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M7 18V7M7 7l-3 3M7 7l3 3"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M13 8h7M13 12h5M13 16h3"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

const IconPriceDesc = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M7 6v11M7 17l-3-3M7 17l3-3"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M13 8h3M13 12h5M13 16h7"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

/**
 * Interruptor único de la barra flotante de filtros (pastilla + vista + orden).
 * Está apagada "por ahora": las vistas muestran sólo títulos y tarjetas.
 * Para volver a habilitarla: poner `true` acá y devolver el `padding-bottom`
 * de `Styled.Container` (components/ofertas/styles.js) a 6.5rem / 7rem mobile,
 * que es el aire que necesita la barra al pie.
 */
export const FILTER_BAR_ENABLED = false;

/**
 * Pastilla "Filtrar" + botones de vista y orden por precio.
 * `groups`: [{ key, label, options: [{ value, label }] }]
 * `selected`: { [groupKey]: string[] }
 */
export default function FilterControl({
	groups = [],
	selected = {},
	onChange,
	viewMode = "cards",
	onToggleView,
	priceSort = null,
	onTogglePriceSort,
}) {
	const [open, setOpen] = useState(false);
	const [draft, setDraft] = useState(selected);
	const activeCount = countActiveFilters(selected);
	const hasGroups = groups.some((g) => g.options?.length);
	const showViewToggle = typeof onToggleView === "function";
	const showPriceSort = typeof onTogglePriceSort === "function";

	useEffect(() => {
		if (open) setDraft(selected);
	}, [open, selected]);

	useEffect(() => {
		if (!open) return undefined;

		const onKey = (event) => {
			if (event.key === "Escape") setOpen(false);
		};

		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKey);

		return () => {
			document.body.style.overflow = prevOverflow;
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	if (!hasGroups && !showViewToggle && !showPriceSort) return null;

	const toggleDraft = (groupKey, value) => {
		setDraft((prev) => {
			const current = prev[groupKey] || [];
			const next = current.includes(value)
				? current.filter((v) => v !== value)
				: [...current, value];
			return { ...prev, [groupKey]: next };
		});
	};

	const apply = () => {
		onChange?.(draft);
		setOpen(false);
	};

	const clear = () => {
		const empty = {};
		groups.forEach((g) => {
			empty[g.key] = [];
		});
		setDraft(empty);
		onChange?.(empty);
		setOpen(false);
	};

	const isList = viewMode === "list";
	const sortLabel =
		priceSort === "desc"
			? "Ordenar: mayor a menor"
			: "Ordenar: menor a mayor";

	return (
		<>
			{!open ? (
				<Styled.Bar>
					<Styled.BlurStrip aria-hidden="true">
						<Styled.BlurLayer $level="soft" />
						<Styled.BlurLayer $level="mid" />
						<Styled.BlurLayer $level="strong" />
					</Styled.BlurStrip>
					<Styled.Actions>
						{showViewToggle ? (
							<Styled.ViewToggle
								type="button"
								onClick={onToggleView}
								aria-label={isList ? "Ver en cards" : "Ver en lista"}
								title={isList ? "Ver en cards" : "Ver en lista"}
							>
								{isList ? <IconCards /> : <IconList />}
							</Styled.ViewToggle>
						) : null}
						{hasGroups ? (
							<Styled.Pill
								type="button"
								$active={activeCount > 0}
								aria-expanded={open}
								aria-haspopup="dialog"
								onClick={() => setOpen(true)}
							>
								<IconFilter />
								<span>Filtrar</span>
								{activeCount > 0 ? (
									<Styled.Badge $onOrange={activeCount > 0}>{activeCount}</Styled.Badge>
								) : null}
							</Styled.Pill>
						) : null}
						{showPriceSort ? (
							<Styled.ViewToggle
								type="button"
								$active={Boolean(priceSort)}
								onClick={onTogglePriceSort}
								aria-label={sortLabel}
								title={sortLabel}
							>
								{priceSort === "desc" ? <IconPriceDesc /> : <IconPriceAsc />}
							</Styled.ViewToggle>
						) : null}
					</Styled.Actions>
				</Styled.Bar>
			) : null}

			{open && hasGroups ? (
				<Styled.Overlay onClick={() => setOpen(false)} role="presentation">
					<Styled.Panel
						role="dialog"
						aria-modal="true"
						aria-label="Filtros"
						onClick={(event) => event.stopPropagation()}
					>
						<Styled.PanelHeader>
							<Styled.PanelTitle>Filtrar</Styled.PanelTitle>
							<Styled.Close type="button" aria-label="Cerrar" onClick={() => setOpen(false)}>
								×
							</Styled.Close>
						</Styled.PanelHeader>

						<Styled.PanelBody>
							{groups.map((group) => (
								<Styled.Group key={group.key}>
									<Styled.GroupLabel>{group.label}</Styled.GroupLabel>
									<Styled.Chips>
										{group.options.map((option) => {
											const isSelected = (draft[group.key] || []).includes(option.value);
											return (
												<Styled.Chip
													key={option.value}
													type="button"
													$selected={isSelected}
													aria-pressed={isSelected}
													onClick={() => toggleDraft(group.key, option.value)}
												>
													{option.label}
												</Styled.Chip>
											);
										})}
									</Styled.Chips>
								</Styled.Group>
							))}
						</Styled.PanelBody>

						<Styled.PanelFooter>
							<Styled.FooterBtn
								type="button"
								onClick={clear}
								disabled={countActiveFilters(draft) === 0 && activeCount === 0}
							>
								Limpiar
							</Styled.FooterBtn>
							<Styled.FooterBtn type="button" $primary onClick={apply}>
								Aplicar
							</Styled.FooterBtn>
						</Styled.PanelFooter>
					</Styled.Panel>
				</Styled.Overlay>
			) : null}
		</>
	);
}
