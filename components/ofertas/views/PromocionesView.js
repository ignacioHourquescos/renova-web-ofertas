import React from "react";
import PromotionalCard from "../components/promotional-card/PromotionalCard";
import { Styled } from "../styles";

export default function PromocionesView({ flyers = [] }) {
	return (
		<Styled.Section>
			{flyers.map((flyer) => (
				<PromotionalCard key={flyer.id} flyer={flyer} />
			))}
		</Styled.Section>
	);
}
