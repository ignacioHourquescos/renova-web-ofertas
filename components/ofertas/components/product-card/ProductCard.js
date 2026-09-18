import { useEffect, useRef, useState } from "react";
import { addCommasForThousands } from "../../../../utils/brandColorFunction";
import ImageLightbox from "../../../UI/ImageLightbox";
import { Styled } from "./styles";

const SWIPE_THRESHOLD = 40;

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

function buildSlides(product) {
	if (Array.isArray(product.images) && product.images.length) {
		return product.images.filter((slide) => slide?.kind === "grid" || slide?.url);
	}
	if (product.imageUrl) {
		return [
			{
				url: product.imageUrl,
				fullUrl: product.imageUrl,
				label: product.title || "Producto",
			},
		];
	}
	return [];
}

const ProductCard = ({ product, layout = "cards", enableZoom = true }) => {
	const [lightbox, setLightbox] = useState(null);
	const [index, setIndex] = useState(0);
	const touchStartX = useRef(null);
	const didSwipe = useRef(false);
	const productId = product?.id;

	useEffect(() => {
		setIndex(0);
	}, [productId]);

	if (!product) return null;

	const slides = buildSlides(product);
	const badge = String(product.badge || "").trim();
	const safeIndex = slides.length ? Math.min(index, slides.length - 1) : 0;
	const current = slides[safeIndex];
	const hasCarousel = slides.length > 1;

	const priceText =
		product.priceLabel ||
		(product.price != null
			? `$${addCommasForThousands(Math.ceil(Number(product.price) / 5) * 5)}`
			: null);

	const goTo = (next) => {
		if (!slides.length) return;
		setIndex((next + slides.length) % slides.length);
	};

	const openLightbox = (url, alt) => {
		if (!enableZoom || !url || didSwipe.current) return;
		setLightbox({ url, alt: alt || product.title || "Producto ampliado" });
	};

	const onTouchStart = (event) => {
		if (!hasCarousel) return;
		didSwipe.current = false;
		touchStartX.current = event.changedTouches[0]?.clientX ?? null;
	};

	const onTouchEnd = (event) => {
		if (!hasCarousel || touchStartX.current == null) return;
		const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
		const delta = endX - touchStartX.current;
		touchStartX.current = null;
		if (Math.abs(delta) < SWIPE_THRESHOLD) return;
		didSwipe.current = true;
		goTo(safeIndex + (delta < 0 ? 1 : -1));
	};

	const showingGrid = current?.kind === "grid";

	return (
		<>
			<Styled.Inner $layout={layout}>
				<Styled.Media
					$layout={layout}
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				>
					{showingGrid ? (
						<Styled.Grid $layout={layout}>
							{(current.cells || []).map((cell) => (
								<Styled.GridCell
									key={cell.tipo}
									type="button"
									$layout={layout}
									disabled={!cell.url}
									aria-label={
										cell.url
											? `Ampliar ${cell.label || cell.caption}`
											: cell.caption || "Sin imagen"
									}
									onClick={(event) => {
										event.stopPropagation();
										openLightbox(cell.fullUrl || cell.url, cell.label);
									}}
								>
									{cell.url ? (
										<Styled.GridImage src={cell.url} alt={cell.label || cell.caption} />
									) : (
										<Styled.GridEmpty>{cell.caption || "—"}</Styled.GridEmpty>
									)}
								</Styled.GridCell>
							))}
						</Styled.Grid>
					) : (
						<Styled.Image
							$layout={layout}
							$imageUrl={current?.url}
							$zoom={enableZoom}
							onClick={() =>
								openLightbox(current?.fullUrl || current?.url, current?.label)
							}
							role={enableZoom && current?.url ? "button" : undefined}
							aria-label={
								enableZoom && current?.url
									? `Ampliar imagen${current.label ? `: ${current.label}` : ""}`
									: undefined
							}
						/>
					)}
					{hasCarousel ? (
						<>
							<Styled.NavButton
								type="button"
								$side="left"
								$layout={layout}
								aria-label="Imagen anterior"
								onClick={(event) => {
									event.stopPropagation();
									goTo(safeIndex - 1);
								}}
							>
								<ChevronLeft />
							</Styled.NavButton>
							<Styled.NavButton
								type="button"
								$side="right"
								$layout={layout}
								aria-label="Imagen siguiente"
								onClick={(event) => {
									event.stopPropagation();
									goTo(safeIndex + 1);
								}}
							>
								<ChevronRight />
							</Styled.NavButton>
							{current?.caption && !showingGrid ? (
								<Styled.Caption $layout={layout}>{current.caption}</Styled.Caption>
							) : null}
							<Styled.Dots $layout={layout}>
								{slides.map((slide, idx) => (
									<Styled.Dot
										key={slide.kind === "grid" ? "grid" : `${slide.url}-${idx}`}
										type="button"
										$active={idx === safeIndex}
										aria-label={slide.label || `Imagen ${idx + 1}`}
										onClick={(event) => {
											event.stopPropagation();
											setIndex(idx);
										}}
									/>
								))}
							</Styled.Dots>
						</>
					) : null}
					{badge ? <Styled.Badge $layout={layout}>{badge}</Styled.Badge> : null}
				</Styled.Media>
				<Styled.Information $layout={layout}>
					<Styled.TextBlock $layout={layout}>
						{product.brand ? (
							<Styled.Brand $layout={layout}>{product.brand}</Styled.Brand>
						) : null}
						{product.title ? (
							<Styled.Title $layout={layout}>{product.title}</Styled.Title>
						) : null}
						{product.subtitle ? (
							<Styled.Subtitle $layout={layout}>{product.subtitle}</Styled.Subtitle>
						) : null}
					</Styled.TextBlock>
					<Styled.DetailContainer $layout={layout}>
						{priceText ? <Styled.Price $layout={layout}>{priceText}</Styled.Price> : null}
					</Styled.DetailContainer>
				</Styled.Information>
			</Styled.Inner>
			{lightbox?.url ? (
				<ImageLightbox
					imageUrl={lightbox.url}
					alt={lightbox.alt || product.title || "Producto ampliado"}
					onClose={() => setLightbox(null)}
				/>
			) : null}
		</>
	);
};

export default ProductCard;
