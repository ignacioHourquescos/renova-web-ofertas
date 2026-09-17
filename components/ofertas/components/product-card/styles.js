import styled, { css } from "styled-components";
import device from "../../../../utils/utils";

/** Medida única de tarjeta (--card-w/--card-h): la comparten home y secciones. */
const cardLayout = css`
	flex: 0 0 auto;
	width: var(--card-w);
	height: var(--card-h);
	margin: 0;
	flex-direction: column;
`;

const listLayout = css`
	width: 100%;
	height: auto;
	min-height: 5.5rem;
	margin: 0 0 0.65rem;
	flex-direction: row;
	align-items: center;

	@media ${device.tablet} {
		width: 100%;
		height: auto;
		min-height: 4.75rem;
		margin: 0 0 0.55rem;
	}
`;

export const Styled = {
	Inner: styled.div`
		box-shadow: 0 8px 22px rgba(0, 0, 0, 0.16);
		border: 1px solid rgba(0, 0, 0, 0.07);
		box-sizing: border-box;
		background-color: #fff;
		position: relative;
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		${(props) => (props.$layout === "list" ? listLayout : cardLayout)}
	`,
	Media: styled.div`
		position: relative;
		flex-shrink: 0;
		/* Sin touch-action propio: si se limita a pan-y, el riel de la home no se
		   puede arrastrar cuando el gesto arranca sobre la imagen. */

		${(props) =>
			props.$layout === "list"
				? `
			width: 4.75rem;
			height: 4.75rem;
			margin: 0.55rem 0.35rem 0.55rem 0.65rem;

			@media ${device.mobileL} {
				width: 4rem;
				height: 4rem;
				margin: 0.45rem 0.25rem 0.45rem 0.5rem;
			}
		`
				: `
			flex: 0 0 65%;
			height: 65%;
			width: 100%;
			margin: 0;
			padding: 5% 8% 3%;
		`}
	`,
	Image: styled.div`
		background-image: ${(props) =>
			props.$imageUrl ? `url("${props.$imageUrl}")` : "none"};
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		height: 100%;
		cursor: ${(props) => (props.$zoom && props.$imageUrl ? "zoom-in" : "default")};
	`,
	Grid: styled.div`
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		width: 100%;
		box-sizing: border-box;
		gap: 2px;
		background: #ececec;

		${(props) =>
			props.$layout === "list"
				? `
			height: calc(100% - 0.7rem);
		`
				: `
			height: calc(100% - 0.95rem);
		`}
	`,
	GridCell: styled.button`
		appearance: none;
		position: relative;
		min-width: 0;
		min-height: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		margin: 0;
		padding: 0;
		border: none;
		background: #fff;
		cursor: ${(props) => (props.disabled ? "default" : "zoom-in")};
	`,
	GridImage: styled.img`
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: #fff;
	`,
	GridEmpty: styled.span`
		color: #bbb;
		font-size: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-align: center;
		padding: 0.15rem;
	`,
	NavButton: styled.button`
		appearance: none;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.92);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
		color: #222;
		cursor: pointer;
		padding: 0;

		${(props) =>
			props.$side === "left"
				? `left: ${props.$layout === "list" ? "0" : "0.15rem"};`
				: `right: ${props.$layout === "list" ? "0" : "0.15rem"};`}

		${(props) =>
			props.$layout === "list"
				? `
			width: 1.15rem;
			height: 1.15rem;

			svg {
				width: 0.7rem;
				height: 0.7rem;
			}
		`
				: `
			width: 1.85rem;
			height: 1.85rem;

			svg {
				width: 1rem;
				height: 1rem;
			}

			@media ${device.mobileL} {
				width: 1.5rem;
				height: 1.5rem;

				svg {
					width: 0.85rem;
					height: 0.85rem;
				}
			}
		`}
	`,
	Caption: styled.span`
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		padding: 0.12rem 0.45rem;
		border-radius: 999px;
		background: rgba(17, 17, 17, 0.72);
		color: #fff;
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		white-space: nowrap;
		pointer-events: none;

		${(props) =>
			props.$layout === "list"
				? `
			display: none;
		`
				: `
			bottom: 1.15rem;

			@media ${device.mobileL} {
				font-size: 0.52rem;
				bottom: 0.95rem;
			}
		`}
	`,
	Dots: styled.div`
		position: absolute;
		left: 0;
		right: 0;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.28rem;
		pointer-events: none;

		${(props) =>
			props.$layout === "list"
				? `
			bottom: 0.12rem;
			gap: 0.18rem;
		`
				: `
			bottom: 0.2rem;
		`}
	`,
	Dot: styled.button`
		appearance: none;
		pointer-events: auto;
		width: 0.42rem;
		height: 0.42rem;
		padding: 0;
		border: none;
		border-radius: 999px;
		background: ${(props) => (props.$active ? "#e67e00" : "rgba(0, 0, 0, 0.28)")};
		cursor: pointer;
	`,
	Brand: styled.div`
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #666;
		line-height: 1.2;
		background-color: transparent;

		${(props) =>
			props.$layout === "list"
				? `
			font-size: 0.7rem;
			text-align: left;

			@media ${device.mobileL} {
				font-size: 0.62rem;
			}
		`
				: `
			font-size: 0.72rem;
			text-align: center;
			flex-shrink: 0;

			@media ${device.mobileL} {
				font-size: 0.58rem;
			}
		`}
	`,
	Presentation: styled.div`
		display: none;
	`,
	Information: styled.div`
		display: flex;
		background-color: #f7f7f7;
		color: #222;
		border-top: 1px solid rgba(0, 0, 0, 0.06);

		${(props) =>
			props.$layout === "list"
				? `
			flex: 1;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: auto;
			min-height: 100%;
			padding: 0.55rem 1rem 0.55rem 0.35rem;
			border-top: none;
			background-color: transparent;
			gap: 0.75rem;
		`
				: `
			flex: 0 0 35%;
			flex-direction: column;
			justify-content: space-between;
			align-items: stretch;
			height: 35%;
			min-height: 0;
			overflow: hidden;
			gap: 0.1rem;
			padding: 0.35rem 0 0.45rem;
		`}
	`,
	TextBlock: styled.div`
		display: flex;
		flex-direction: column;
		background-color: transparent;
		gap: 0.15rem;

		${(props) =>
			props.$layout === "list"
				? `
			flex: 1;
			align-items: flex-start;
			justify-content: center;
			min-width: 0;
			padding: 0;
		`
				: `
			width: 100%;
			flex: 0 1 auto;
			min-height: 0;
			overflow: hidden;
			align-items: center;
			justify-content: flex-start;
			gap: 0.12rem;
			padding: 0 0.4rem;

			@media ${device.mobileL} {
				padding: 0 0.25rem;
			}
		`}
	`,
	DetailContainer: styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: transparent;

		${(props) =>
			props.$layout === "list"
				? `
			width: auto;
			padding: 0;
			align-items: flex-end;
			flex-shrink: 0;
		`
				: `
			width: 100%;
			flex: 0 0 auto;
			padding: 0 0.4rem;
			gap: 0.1rem;
		`}
	`,
	Title: styled.div`
		font-weight: 700;
		line-height: 1.25;
		color: #1a1a1a;
		background-color: transparent;

		${(props) =>
			props.$layout === "list"
				? `
			font-size: 0.95rem;
			text-align: left;
			padding: 0;
			width: auto;

			@media ${device.mobileL} {
				font-size: 0.8rem;
			}
		`
				: `
			font-size: 0.95rem;
			width: 100%;
			padding: 0;
			flex-shrink: 0;
			text-align: center;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;

			@media ${device.mobileL} {
				font-size: 0.68rem;
			}
		`}
	`,
	Subtitle: styled.div`
		font-weight: 500;
		line-height: 1.3;
		color: #777;
		background-color: transparent;

		${(props) =>
			props.$layout === "list"
				? `
			font-size: 0.78rem;
			text-align: left;
			padding: 0;
			width: auto;

			@media ${device.mobileL} {
				font-size: 0.68rem;
			}
		`
				: `
			font-size: 0.72rem;
			width: 100%;
			padding: 0.05rem 0.3rem 0;
			flex-shrink: 0;
			text-align: center;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;

			@media ${device.mobileL} {
				font-size: 0.58rem;
			}
		`}
	`,
	Code: styled.div`
		display: none;
	`,
	Price: styled.div`
		font-weight: 800;
		color: #e67e00;
		text-shadow: none;
		line-height: 1.1;

		${(props) =>
			props.$layout === "list"
				? `
			font-size: 1.15rem;
			white-space: nowrap;

			@media ${device.mobileL} {
				font-size: 1rem;
			}
		`
				: `
			font-size: 1.45rem;

			@media ${device.mobileL} {
				font-size: 1rem;
			}
		`}
	`,
	InnerUnavailable: styled.div`
		position: absolute;
		top: 0;
		right: 0;
		background-color: rgba(28, 28, 28, 0.55);
		text-align: center;
		padding: 50% 0;
		color: white;
		width: 100%;
		height: 100%;
		font-weight: bold;
	`,
};
