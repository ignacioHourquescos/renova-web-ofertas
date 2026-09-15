import styled from "styled-components";
import device from "../../../../utils/utils";

export const Styled = {
	Inner: styled.div`
		width: 30%;
		margin: 1.5%;
		margin-bottom: 3%;
		border-radius: 12px;
		overflow: hidden;
		border: none;
		background: #fff;
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
		transition: box-shadow 0.25s ease, transform 0.25s ease;

		&:hover {
			box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
			transform: translateY(-2px);
		}

		@media ${device.tablet} {
			width: 100%;
			margin: 0;
			margin-bottom: 1.75rem;
			border-radius: 10px;
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
