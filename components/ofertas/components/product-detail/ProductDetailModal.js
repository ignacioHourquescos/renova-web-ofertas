import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
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

/**
 * Detalle del artículo: galería con thumbnails y los datos cargados en el admin.
 * Las especificaciones que no tienen valor no se listan.
 */
const ProductDetailModal = ({
	images = [],
	title = "",
	brand = "",
	priceLabel = "",
	specs = [],
	description = "",
	initialIndex = 0,
	onClose,
}) => {
	const usable = useMemo(() => images.filter((image) => image?.url), [images]);
	const [index, setIndex] = useState(() =>
		usable.length ? Math.min(Math.max(initialIndex, 0), usable.length - 1) : 0
	);
	const [ready, setReady] = useState({});

	/**
	 * Storage tarda ~2s en responder, así que hasta que llega la imagen grande se
	 * muestra el thumbnail, que ya está en caché porque lo usó la tarjeta.
	 * Se precarga toda la galería para que cambiar de foto sea instantáneo.
	 */
	useEffect(() => {
		const loaders = usable.map((image) => {
			const loader = new window.Image();
			loader.onload = () => setReady((prev) => ({ ...prev, [image.url]: true }));
			loader.src = image.url;
			return loader;
		});

		return () => {
			loaders.forEach((loader) => {
				loader.onload = null;
			});
		};
	}, [usable]);

	const goTo = useCallback(
		(next) => {
			if (usable.length < 2) return;
			setIndex((next + usable.length) % usable.length);
		},
		[usable.length]
	);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose();
			if (event.key === "ArrowLeft") goTo(index - 1);
			if (event.key === "ArrowRight") goTo(index + 1);
		};

		document.addEventListener("keydown", handleKeyDown);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [goTo, index, onClose]);

	if (!usable.length) return null;

	const current = usable[Math.min(index, usable.length - 1)];
	const hasCarousel = usable.length > 1;

	return (
		<Styled.Overlay onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
			<Styled.Modal onClick={(event) => event.stopPropagation()}>
				<Styled.CloseButton type="button" aria-label="Cerrar" onClick={onClose}>
					×
				</Styled.CloseButton>
				<Styled.Gallery>
					<Styled.Stage>
						<Styled.MainImage
							src={ready[current.url] ? current.url : current.thumbUrl || current.url}
							alt={title || "Artículo"}
						/>
						{hasCarousel ? (
							<>
								<Styled.NavButton
									type="button"
									$side="left"
									aria-label="Imagen anterior"
									onClick={() => goTo(index - 1)}
								>
									<ChevronLeft />
								</Styled.NavButton>
								<Styled.NavButton
									type="button"
									$side="right"
									aria-label="Imagen siguiente"
									onClick={() => goTo(index + 1)}
								>
									<ChevronRight />
								</Styled.NavButton>
							</>
						) : null}
					</Styled.Stage>
					{hasCarousel ? (
						<Styled.Thumbs>
							{usable.map((image, idx) => (
								<Styled.Thumb
									key={image.url}
									type="button"
									$active={idx === index}
									aria-label={`Ver imagen ${idx + 1}`}
									aria-current={idx === index ? "true" : undefined}
									onClick={() => setIndex(idx)}
								>
									<img src={image.thumbUrl || image.url} alt="" />
								</Styled.Thumb>
							))}
						</Styled.Thumbs>
					) : null}
				</Styled.Gallery>
				<Styled.Info>
					{brand ? <Styled.Brand>{brand}</Styled.Brand> : null}
					{title ? <Styled.Title>{title}</Styled.Title> : null}
					{priceLabel ? <Styled.Price>{priceLabel}</Styled.Price> : null}
					{specs.length ? (
						<Styled.Specs>
							{specs.map((spec) => (
								<Fragment key={spec.label}>
									<dt>{spec.label}</dt>
									<dd>{spec.value}</dd>
								</Fragment>
							))}
						</Styled.Specs>
					) : null}
					{description ? <Styled.Description>{description}</Styled.Description> : null}
				</Styled.Info>
			</Styled.Modal>
		</Styled.Overlay>
	);
};

export default ProductDetailModal;
