import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../product-card/ProductCard";
import { Styled } from "./styles";

const ChevronLeft = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path
			d="M15 6l-6 6 6 6"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const ChevronRight = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path
			d="M9 6l6 6-6 6"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default function HomeCarousel({ items = [], href, total = 0 }) {
	const router = useRouter();
	const railRef = useRef(null);
	const [edges, setEdges] = useState({ start: true, end: false });

	const syncEdges = () => {
		const rail = railRef.current;
		if (!rail) return;
		const max = rail.scrollWidth - rail.clientWidth;
		setEdges({ start: rail.scrollLeft <= 4, end: rail.scrollLeft >= max - 4 });
	};

	useEffect(() => {
		syncEdges();
		window.addEventListener("resize", syncEdges);
		return () => window.removeEventListener("resize", syncEdges);
	}, [items.length]);

	useEffect(() => {
		const rail = railRef.current;
		if (!rail) return undefined;

		// Sobre un riel horizontal, Chrome convierte el wheel vertical en scroll
		// lateral y la página deja de bajar: se lo devolvemos a la ventana.
		const onWheel = (event) => {
			if (event.shiftKey) return;
			if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
			event.preventDefault();
			window.scrollBy({ top: event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY });
		};

		rail.addEventListener("wheel", onWheel, { passive: false });
		return () => rail.removeEventListener("wheel", onWheel);
	}, []);

	const scrollByPage = (direction) => {
		const rail = railRef.current;
		if (!rail) return;
		rail.scrollBy({ left: direction * rail.clientWidth * 0.85, behavior: "smooth" });
	};

	const linkProps = (label) => ({
		role: "link",
		tabIndex: 0,
		"aria-label": label,
		onClick: () => router.push(href),
		onKeyDown: (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				router.push(href);
			}
		},
	});

	if (!items.length) return null;

	return (
		<Styled.RailWrap>
			<Styled.Rail ref={railRef} onScroll={syncEdges}>
				{items.map((item) => (
					<Styled.Item key={item.id} {...linkProps(item.title || "Ver sección")}>
						{item.kind === "flyer" ? (
							<Styled.Flyer $imageUrl={item.imageUrl} />
						) : (
							<ProductCard
								layout="cards"
								enableZoom={false}
								product={{
									id: item.id,
									brand: item.brand,
									title: item.title,
									subtitle: item.subtitle,
									imageUrl: item.imageUrl,
									priceLabel: item.priceLabel,
								}}
							/>
						)}
					</Styled.Item>
				))}
				<Styled.Item {...linkProps("Ver todo")}>
					<Styled.SeeAll>
						<Styled.SeeAllIcon>
							<ChevronRight />
						</Styled.SeeAllIcon>
						<Styled.SeeAllLabel>Ver todo</Styled.SeeAllLabel>
						{total ? <Styled.SeeAllCount>{total} ofertas</Styled.SeeAllCount> : null}
					</Styled.SeeAll>
				</Styled.Item>
			</Styled.Rail>
			<Styled.NavButton
				type="button"
				$side="left"
				$hidden={edges.start}
				aria-label="Anterior"
				onClick={() => scrollByPage(-1)}
			>
				<ChevronLeft />
			</Styled.NavButton>
			<Styled.NavButton
				type="button"
				$side="right"
				$hidden={edges.end}
				aria-label="Siguiente"
				onClick={() => scrollByPage(1)}
			>
				<ChevronRight />
			</Styled.NavButton>
		</Styled.RailWrap>
	);
}
