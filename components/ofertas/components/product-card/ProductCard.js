import { useEffect, useRef, useState } from "react";
import { addCommasForThousands } from "../../../../utils/brandColorFunction";
import ProductDetailModal from "../product-detail/ProductDetailModal";
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

/**
 * Galería del detalle. Usa la del endpoint si viene; si no, reconstruye una
 * desde los slides de la tarjeta (las grillas de filtros aportan cada celda).
 */
function buildDetailImages(product, slides) {
	if (Array.isArray(product.detailImages) && product.detailImages.length) {
		return product.detailImages
			.map((image) => ({
				url: image?.url || image?.thumbUrl || "",
				thumbUrl: image?.thumbUrl || image?.url || "",
			}))
			.filter((image) => image.url);
	}

	return slides.flatMap((slide) => {
		if (slide.kind === "grid") {
			return (slide.cells || [])
				.filter((cell) => cell.url)
				.map((cell) => ({ url: cell.fullUrl || cell.url, thumbUrl: cell.url }));
		}
		return slide.url ? [{ url: slide.fullUrl || slide.url, thumbUrl: slide.url }] : [];
	});
}

const ProductCard = ({ product, layout = "cards", enableZoom = true }) => {
	const [detailIndex, setDetailIndex] = useState(null);
	const [index, setIndex] = useState(0);
	const touchStartX = useRef(null);
	const didSwipe = useRef(false);
	const productId = product?.id;

	useEffect(() => {
		setIndex(0);
	}, [productId]);

	if (!product) return null;

	const slides = buildSlides(product);
	const detailImages = buildDetailImages(product, slides);
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

	const openDetail = (url) => {
		if (!enableZoom || didSwipe.current || !detailImages.length) return;
		const at = detailImages.findIndex((image) => image.url === url);
		setDetailIndex(at >= 0 ? at : 0);
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
										openDetail(cell.fullUrl || cell.url);
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
							onClick={() => openDetail(current?.fullUrl || current?.url)}
							role={enableZoom && current?.url ? "button" : undefined}
							aria-label={
								enableZoom && current?.url
									? `Ver detalle${product.title ? `: ${product.title}` : ""}`
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
			{detailIndex != null ? (
				<ProductDetailModal
					images={detailImages}
					initialIndex={detailIndex}
					brand={product.brand}
					title={product.title}
					priceLabel={priceText}
					specs={product.specs || []}
					description={product.description}
					onClose={() => setDetailIndex(null)}
				/>
			) : null}
		</>
	);
};

export default ProductCard;
