import { useState } from "react";
import ImageLightbox from "../../../UI/ImageLightbox";
import { Styled } from "./styles";

const PromotionalCard = ({ flyer }) => {
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	if (!flyer?.imagenUrl) return null;

	return (
		<>
			<Styled.Inner>
				<Styled.FlyerImage
					src={flyer.imagenThumbUrl || flyer.imagenUrl}
					alt={flyer.titulo || "Oferta destacada"}
					onClick={() => setIsLightboxOpen(true)}
					role="button"
					aria-label="Ampliar imagen de la oferta"
				/>
			</Styled.Inner>
			{isLightboxOpen && (
				<ImageLightbox
					imageUrl={flyer.imagenUrl}
					alt={flyer.titulo || "Oferta ampliada"}
					onClose={() => setIsLightboxOpen(false)}
				/>
			)}
		</>
	);
};

export default PromotionalCard;
