import { useState } from "react";
import { addCommasForThousands } from "../../../../utils/brandColorFunction";
import ImageLightbox from "../../../UI/ImageLightbox";
import { Styled } from "./styles";
// import { brandColorHandler } from "../../utils/brandColorFunction";

const ProductCard = ({ products }) => {
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	return (
		<>
			{products.active && (
				<Styled.Inner borderColor="#CF1A0E">
					<Styled.Image
						imageUrl={products.imageUrl}
						onClick={() => setIsLightboxOpen(true)}
						role="button"
						aria-label="Ampliar imagen del producto"
					>
						<Styled.Brand>{products.brand}</Styled.Brand>
						{products.type ? (
							<Styled.Presentation>{products.type}</Styled.Presentation>
						) : (
							""
						)}
					</Styled.Image>
					<Styled.Information>
						<Styled.Title>{products.title}</Styled.Title>
						<Styled.DetailContainer>
							<Styled.Code>{products.id}</Styled.Code>

							<Styled.Price>
								$
								{addCommasForThousands(
									Math.ceil(products.price.toFixed() / 5) * 5
								)}
							</Styled.Price>
						</Styled.DetailContainer>
					</Styled.Information>
				</Styled.Inner>
			)}
			{isLightboxOpen && (
				<ImageLightbox
					imageUrl={products.imageUrl}
					alt={products.title || products.id || "Producto ampliado"}
					onClose={() => setIsLightboxOpen(false)}
				/>
			)}
		</>
	);
};

export default ProductCard;
