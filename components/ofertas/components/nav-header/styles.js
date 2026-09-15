import styled from "styled-components";
import device from "../../../../utils/utils";

export const Styled = {
	Bar: styled.header`
		position: sticky;
		top: 0;
		z-index: 100;
		width: 100%;
		background: #111;
		border-bottom: none;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
	`,
	Inner: styled.nav`
		width: 75%;
		margin: 0 auto;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		gap: 0;

		@media ${device.mobileL} {
			width: 100%;
			padding: 0;
		}
	`,
	Item: styled.a`
		flex: 1;
		appearance: none;
		border: none;
		background: ${(props) => (props.$active ? "orange" : "transparent")};
		color: ${(props) => (props.$active ? "#111" : "#fff")};
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		padding: 0.85rem 0.35rem;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		text-decoration: none;
		position: relative;
		transition: color 0.15s ease, background 0.15s ease;

		&:hover {
			color: ${(props) => (props.$active ? "#111" : "orange")};
			background: ${(props) =>
				props.$active ? "orange" : "rgba(255, 255, 255, 0.04)"};
		}

		svg {
			width: 1.35rem;
			height: 1.35rem;
			flex-shrink: 0;
		}

		@media ${device.tablet} {
			font-size: 0.58rem;
			padding: 0.65rem 0.15rem;
			gap: 0.2rem;
			letter-spacing: 0;

			svg {
				width: 1.1rem;
				height: 1.1rem;
			}
		}
	`,
};
