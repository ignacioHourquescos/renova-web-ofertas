import { useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
	position: fixed;
	inset: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background-color: rgba(0, 0, 0, 0.85);
	cursor: zoom-out;
`;

const Image = styled.img`
	max-width: min(95vw, 900px);
	max-height: 90vh;
	object-fit: contain;
	border-radius: 4px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
	cursor: default;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 1rem;
	right: 1rem;
	border: none;
	background: transparent;
	color: white;
	font-size: 2rem;
	line-height: 1;
	cursor: pointer;
	padding: 0.25rem 0.5rem;
`;

const ImageLightbox = ({ imageUrl, alt = "Oferta ampliada", onClose }) => {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [onClose]);

	if (!imageUrl) {
		return null;
	}

	return (
		<Overlay onClick={onClose} role="dialog" aria-modal="true">
			<CloseButton type="button" aria-label="Cerrar" onClick={onClose}>
				×
			</CloseButton>
			<Image
				src={imageUrl}
				alt={alt}
				onClick={(event) => event.stopPropagation()}
			/>
		</Overlay>
	);
};

export default ImageLightbox;
