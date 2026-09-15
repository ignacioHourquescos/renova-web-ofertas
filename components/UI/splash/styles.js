import styled, { keyframes, css } from "styled-components";

const fadeOut = keyframes`
	from { opacity: 1; visibility: visible; }
	to { opacity: 0; visibility: hidden; }
`;

const logoIn = keyframes`
	from {
		opacity: 0;
		transform: scale(0.9);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
`;

export const Styled = {
	Overlay: styled.div`
		position: fixed;
		inset: 0;
		z-index: 100000;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		pointer-events: all;
		${(props) =>
			props.$exiting
				? css`
						animation: ${fadeOut} 0.6s ease forwards;
				  `
				: ""}
	`,
	Logo: styled.img`
		position: relative;
		z-index: 1;
		width: min(78vw, 360px);
		height: auto;
		display: block;
		animation: ${logoIn} 0.65s ease both;
	`,
};
