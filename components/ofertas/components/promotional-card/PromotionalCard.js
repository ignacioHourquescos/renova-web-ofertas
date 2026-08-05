import { useState } from "react";
import ImageLightbox from "../../../UI/ImageLightbox";
import { Styled } from "./styles";

const PromotionalCard = ({ promotions }) => {
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	return (
		<>
			{promotions.active && (
				<Styled.Inner>
					<Styled.Image
						imageUrl={promotions?.imageUrl}
						onClick={() => setIsLightboxOpen(true)}
						role="button"
						aria-label="Ampliar imagen de la oferta"
					/>
					<Styled.Ribbon>
						<Styled.TextContainer>
							<Styled.Title>{promotions.id}</Styled.Title>
							<Styled.Description>{promotions?.title}</Styled.Description>
							<Styled.Detail>{promotions?.detail}</Styled.Detail>
						</Styled.TextContainer>
						{promotions?.specialPrice ? (
							<Styled.IndividualPrice>
								<Styled.PriceIndicator>Pagas x bidon</Styled.PriceIndicator>
								<Styled.Price>
									${addThousandSeparator(promotions?.specialPrice)}
								</Styled.Price>
							</Styled.IndividualPrice>
						) : (
							<></>
						)}
					</Styled.Ribbon>
					{/* <Styled.Validity>
            Valido hasta: {promotions?.validity}
          </Styled.Validity> */}
				</Styled.Inner>
			)}
			{isLightboxOpen && (
				<ImageLightbox
					imageUrl={promotions?.imageUrl}
					alt={promotions?.title || promotions?.id || "Oferta ampliada"}
					onClose={() => setIsLightboxOpen(false)}
				/>
			)}
		</>
	);
};

export default PromotionalCard;

function addThousandSeparator(number) {
	// Convert number to string
	let numberString = number?.toString();

	// Split the string into parts before and after the decimal point (if any)
	let parts = numberString?.split(".");
	if (parts)
		// Add a dot as a thousand separator to the part before the decimal point
		parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

	// Join the parts back together with a dot as the decimal separator
	return parts?.join(".");
}
