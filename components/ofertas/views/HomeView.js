import Link from "next/link";
import HomeCarousel from "../components/home-carousel/HomeCarousel";
import { NAV_ITEMS } from "../components/nav-header/NavHeader";
import { groupKitsBySeccion } from "../components/filter/filterHelpers";
import { Styled } from "../components/home-carousel/styles";

const MAX_ITEMS = 12;

const ArrowRight = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M4 12h15M13 6l6 6-6 6"
			stroke="currentColor"
			strokeWidth="2.6"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

function withImage(item) {
	return Boolean(item?.imagenThumbUrl || item?.imagenUrl);
}

function imageOf(item) {
	return item.imagenThumbUrl || item.imagenUrl;
}

function cards(list = [], mapper) {
	const usable = list.filter(withImage);
	return { total: usable.length, items: usable.slice(0, MAX_ITEMS).map(mapper) };
}

/** Intercala subsecciones: el primero de cada una, después el segundo, y así. */
function roundRobin(groups = []) {
	const lists = groups.map((items) => (items || []).filter(withImage));
	const longest = Math.max(0, ...lists.map((list) => list.length));
	const out = [];

	for (let round = 0; round < longest; round += 1) {
		lists.forEach((list) => {
			if (list[round]) out.push(list[round]);
		});
	}

	return out;
}

function flyerCards(flyers = []) {
	const ordered = [...flyers].sort(
		(a, b) => (Number(a.orden) || 0) - (Number(b.orden) || 0)
	);
	return cards(ordered, (flyer) => ({
		id: flyer.id,
		kind: "flyer",
		imageUrl: imageOf(flyer),
		title: flyer.titulo || "Oferta destacada",
	}));
}

/** Mismo mapeo que KitsView. */
function kitCards(kits = []) {
	const ordered = roundRobin(
		groupKitsBySeccion(kits).map((seccion) => seccion.items)
	);
	return cards(ordered, (kit) => ({
		id: kit.id,
		imageUrl: imageOf(kit),
		title:
			kit.titulo || [kit.modelo, kit.motor].filter(Boolean).join(" ") || kit.nombre,
		subtitle: kit.descripcion,
		priceLabel: kit.precioFormateado,
	}));
}

/** Mismo mapeo que DestacadosView. */
function destacadoCards(secciones = []) {
	const ordered = roundRobin(
		secciones.map((seccion) =>
			(seccion.items || []).map((item) => ({
				...item,
				seccionNombre: seccion.seccionNombre,
			}))
		)
	);
	return cards(ordered, (item) => ({
		id: item.id,
		imageUrl: imageOf(item),
		// El riel mezcla marcas y el payload no siempre trae `marca`.
		brand: item.marca || item.seccionNombre,
		title: item.titulo,
		priceLabel: item.precioFormateado,
	}));
}

function rowsFromData({ flyers, kits, destacados, otros }) {
	const byId = {
		promociones: flyerCards(flyers),
		filtros: kitCards(kits),
		lubricantes: destacadoCards(destacados),
		otros: destacadoCards(otros),
	};

	return NAV_ITEMS.map((section) => ({
		...section,
		...(byId[section.id] || { items: [], total: 0 }),
	})).filter((section) => section.items.length);
}

export default function HomeView({
	flyers = [],
	kits = [],
	destacados = [],
	otros = [],
}) {
	const rows = rowsFromData({ flyers, kits, destacados, otros });

	return (
		<Styled.Page>
			<Styled.Shell>
				{rows.map((row) => (
					<Styled.Row key={row.id}>
						<Link href={row.href} passHref legacyBehavior>
							<Styled.RowHead aria-label={`Ver todo en ${row.label}`}>
								<Styled.RowTitle>{row.label}</Styled.RowTitle>
								<Styled.RowArrow>
									<ArrowRight />
								</Styled.RowArrow>
							</Styled.RowHead>
						</Link>
						<HomeCarousel items={row.items} href={row.href} total={row.total} />
					</Styled.Row>
				))}
			</Styled.Shell>
		</Styled.Page>
	);
}
