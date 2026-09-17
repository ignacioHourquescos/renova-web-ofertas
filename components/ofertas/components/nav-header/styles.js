import styled from "styled-components";
import device from "../../../../utils/utils";

export const Styled = {
	Bar: styled.header`
		position: sticky;
		top: 0;
		z-index: 100;
		width: 100%;
		background: #111;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(0.55rem, 1.4vw, 0.9rem);
		padding: clamp(0.9rem, 2.2vw, 1.5rem) 1rem clamp(0.6rem, 1.4vw, 0.95rem);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
	`,
	Brand: styled.a`
		display: block;
		line-height: 0;
	`,
	BrandImage: styled.img`
		width: clamp(7rem, 14vw, 10rem);
		height: auto;
		display: block;
	`,
	Inner: styled.nav`
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: clamp(1.1rem, 4vw, 3.25rem);

		@media ${device.tablet} {
			gap: 1.15rem;
		}
	`,
	Item: styled.a`
		position: relative;
		display: flex;
		align-items: center;
		padding-bottom: 0.32rem;
		color: ${(props) => (props.$active ? "orange" : "#fff")};
		font-size: clamp(0.66rem, 0.9vw, 0.8rem);
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		text-decoration: none;
		transition: color 0.15s ease;

		&::after {
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: 2px;
			border-radius: 2px;
			background: ${(props) => (props.$active ? "orange" : "transparent")};
		}

		&:hover {
			color: orange;
		}

		@media ${device.tablet} {
			letter-spacing: 0.04em;
		}
	`,
};
