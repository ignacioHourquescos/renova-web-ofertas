import styled from "styled-components";
import device from "../../../../utils/utils";

export const Styled = {
	Page: styled.div`
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding: clamp(0.6rem, 1.6vw, 1.1rem) 0 clamp(2rem, 5vw, 3.5rem);
	`,
	Shell: styled.main`
		width: min(92vw, 1240px);
		margin: 0 auto;
		display: flex;
		flex-direction: column;

		@media ${device.tablet} {
			width: 100%;
			padding: 0 0.95rem;
		}
	`,
	Row: styled.section`
		position: relative;
		width: 100%;
		padding: clamp(0.6rem, 1.5vw, 1.1rem) 0;
		margin-bottom: clamp(1.4rem, 3.2vw, 2.6rem);
	`,
	RowHead: styled.a`
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(0.45rem, 1vw, 0.8rem);
		width: 100%;
		padding: 0 0 clamp(0.35rem, 0.9vw, 0.6rem);
		color: #111;
		text-decoration: none;

		&:hover span:last-child {
			transform: translateX(4px);
		}
	`,
	RowTitle: styled.span`
		font-family: var(--font-title);
		font-style: italic;
		color: #111;
		font-size: clamp(1.3rem, 2vw, 1.7rem);
		font-weight: 800;
		letter-spacing: 0;
		text-transform: uppercase;
		text-align: center;
	`,
	RowArrow: styled.span`
		display: inline-flex;
		align-items: center;
		color: #e67e00;
		transition: transform 0.15s ease;

		svg {
			width: clamp(1.5rem, 2.4vw, 2.1rem);
			height: auto;
		}
	`,
	RailWrap: styled.div`
		position: relative;
		width: 100%;
	`,
	Rail: styled.div`
		display: flex;
		align-items: stretch;
		gap: var(--card-gap);
		/* Espacio vertical para que overflow-y: hidden no recorte la sombra. */
		padding: 0.85rem 0 1.35rem;
		overflow-x: auto;
		overflow-y: hidden;
		/* Deja pasar el scroll vertical de la página al arrastrar sobre el riel. */
		touch-action: pan-x pan-y;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;

		&::-webkit-scrollbar {
			display: none;
		}
	`,
	/** Fija cada tarjeta del riel al ancho y alto compartidos. */
	Item: styled.div`
		flex: 0 0 var(--card-w);
		width: var(--card-w);
		height: var(--card-h);
		cursor: pointer;

		& > div:first-child {
			transition: transform 0.18s ease, box-shadow 0.18s ease;
		}

		&:hover > div:first-child {
			transform: translateY(-3px);
			box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22);
		}

		&:focus-visible {
			outline: 2px solid orange;
			outline-offset: 3px;
		}
	`,
	SeeAll: styled.div`
		width: 100%;
		height: 100%;
		border: 1px dashed rgba(0, 0, 0, 0.18);
		border-radius: 12px;
		background: #f7f7f7;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.7rem;
		color: #111;
	`,
	SeeAllIcon: styled.span`
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: #111;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		svg {
			width: 1.35rem;
			height: 1.35rem;
		}
	`,
	SeeAllLabel: styled.span`
		font-family: var(--font-title);
		font-style: italic;
		font-size: clamp(0.85rem, 1.1vw, 1rem);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	`,
	SeeAllCount: styled.span`
		font-size: clamp(0.68rem, 0.85vw, 0.76rem);
		color: #777;
	`,
	Flyer: styled.div`
		width: 100%;
		height: 100%;
		border-radius: 12px;
		overflow: hidden;
		background-color: #fff;
		background-image: ${(props) =>
			props.$imageUrl ? `url("${props.$imageUrl}")` : "none"};
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		box-shadow: 0 8px 22px rgba(0, 0, 0, 0.16);
		border: 1px solid rgba(0, 0, 0, 0.07);
	`,
	NavButton: styled.button`
		appearance: none;
		position: absolute;
		top: 50%;
		${(props) => (props.$side === "left" ? "left: -0.6rem;" : "right: -0.6rem;")}
		transform: translateY(-50%);
		z-index: 5;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 50%;
		border: 1px solid rgba(0, 0, 0, 0.08);
		background: #fff;
		color: #111;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
		opacity: ${(props) => (props.$hidden ? 0 : 1)};
		pointer-events: ${(props) => (props.$hidden ? "none" : "auto")};
		transition: opacity 0.2s ease, background 0.15s ease;

		svg {
			width: 1.05rem;
			height: 1.05rem;
		}

		&:hover {
			background: #f5f5f5;
		}

		@media ${device.tablet} {
			display: none;
		}
	`,
};
