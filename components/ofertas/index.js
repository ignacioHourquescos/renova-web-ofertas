import React from "react";
import { Styled } from "./styles";
import ProductCard from "./components/product-card/ProductCard";
import Title from "./components/title/Title";
import PromotionalCard from "./components/promotional-card/PromotionalCard";

export const Ofertas = ({ categories, products }) => {
	return (
		<Styled.Container>
			<Title>DESTACADOS!</Title>
			{products
				.filter((element) => element.category == "DESTACADO")
				.map((element, idx) => (
					<PromotionalCard key={idx} promotions={element} />
				))}
			{categories.map(
				(categoryElement, idx) =>
					isBrandPresent(products, categoryElement) && (
						<>
							<Title key={idx}>{categoryElement}</Title>
							{products
								?.filter((element) => element.category == categoryElement)
								.map((element, idx) => (
									<ProductCard key={idx} products={element} />
								))}
						</>
					)
			)}
		</Styled.Container>
	);
};

const isBrandPresent = (productsArray, category) => {
	console.log("categoria", category);
	for (let i = 0; i < productsArray.length; i++) {
		if (productsArray[i].active && productsArray[i].category === category) {
			return true;
		}
	}
	return false;
};
