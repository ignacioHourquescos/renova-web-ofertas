import styled from "styled-components";
import device from "../../../../utils/utils";

export const Styled = {
	Inner: styled.div`
		/* Cuatro flyers por fila; el espaciado lo da el gap de la sección. */
		flex: 0 0 auto;
		width: calc((100% - 3 * var(--card-gap)) / 4);
		margin: 0;
		border-radius: 12px;
		overflow: hidden;
		border: none;
		background: #fff;
		box-shadow: 0 10px 26px rgba(0, 0, 0, 0.16);
		transition: box-shadow 0.25s ease, transform 0.25s ease;

		&:hover {
			box-shadow: 0 16px 34px rgba(0, 0, 0, 0.22);
			transform: translateY(-2px);
		}

		@media ${device.tablet} {
			width: 100%;
			border-radius: 10px;
			/* Uno por fila: el gap de la sección no alcanza para separarlos. */
			margin-bottom: 1.75rem;
		}
	`,
	FlyerImage: styled.img`
		width: 100%;
		height: auto;
		display: block;
		object-fit: contain;
		cursor: zoom-in;
		vertical-align: middle;
	`,
};
