import styled from "styled-components";
import device from "../../../../utils/utils";

export const Styled = {
	Overlay: styled.div`
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(0.75rem, 3vw, 2rem);
		background-color: rgba(0, 0, 0, 0.85);
		cursor: zoom-out;
	`,
	Modal: styled.div`
		position: relative;
		display: flex;
		width: 100%;
		max-width: 62rem;
		max-height: 90vh;
		overflow: hidden;
		border-radius: 12px;
		background: #fff;
		box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
		cursor: default;

		@media ${device.tablet} {
			flex-direction: column;
			overflow-y: auto;
		}
	`,
	CloseButton: styled.button`
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: none;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.92);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		color: #222;
		font-size: 1.35rem;
		line-height: 1;
		cursor: pointer;
	`,
	Gallery: styled.div`
		display: flex;
		flex-direction: column;
		flex: 0 0 52%;
		min-width: 0;
		background: #fafafa;
		padding: clamp(0.75rem, 2vw, 1.25rem);
		gap: 0.75rem;

		@media ${device.tablet} {
			flex: 0 0 auto;
		}
	`,
	Stage: styled.div`
		position: relative;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 0;

		@media ${device.tablet} {
			height: 45vw;
			max-height: 18rem;
		}
	`,
	MainImage: styled.img`
		max-width: 100%;
		max-height: min(58vh, 26rem);
		object-fit: contain;

		@media ${device.tablet} {
			max-height: 100%;
		}
	`,
	NavButton: styled.button`
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		${(props) => (props.$side === "left" ? "left: 0;" : "right: 0;")}
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.1rem;
		height: 2.1rem;
		padding: 0;
		border: none;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.92);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
		color: #222;
		cursor: pointer;

		svg {
			width: 1.1rem;
			height: 1.1rem;
		}
	`,
	Thumbs: styled.div`
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.4rem;
	`,
	Thumb: styled.button`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.25rem;
		height: 3.25rem;
		padding: 0.15rem;
		border: 2px solid ${(props) => (props.$active ? "#e67e00" : "rgba(0, 0, 0, 0.12)")};
		border-radius: 8px;
		background: #fff;
		cursor: pointer;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		@media ${device.mobileL} {
			width: 2.75rem;
			height: 2.75rem;
		}
	`,
	Info: styled.div`
		flex: 1;
		min-width: 0;
		overflow-y: auto;
		padding: clamp(1rem, 2.5vw, 1.75rem);
		padding-right: clamp(2.25rem, 3vw, 1.75rem);
	`,
	Brand: styled.div`
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #777;
	`,
	Title: styled.h2`
		margin: 0.2rem 0 0;
		font-size: clamp(1.05rem, 2.2vw, 1.4rem);
		font-weight: 700;
		line-height: 1.25;
		color: #1a1a1a;
	`,
	Price: styled.div`
		margin-top: 0.5rem;
		font-size: clamp(1.4rem, 3vw, 1.85rem);
		font-weight: 800;
		color: #e67e00;
		line-height: 1.1;
	`,
	Specs: styled.dl`
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.3rem 0.85rem;
		margin: 1rem 0 0;
		padding: 0.85rem 0 0;
		border-top: 1px solid rgba(0, 0, 0, 0.08);

		dt {
			font-size: 0.72rem;
			font-weight: 600;
			letter-spacing: 0.03em;
			text-transform: uppercase;
			color: #888;
		}

		dd {
			margin: 0;
			font-size: 0.85rem;
			font-weight: 600;
			color: #222;
		}
	`,
	Description: styled.p`
		margin: 1rem 0 0;
		padding-top: 0.85rem;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		font-size: 0.85rem;
		line-height: 1.55;
		color: #555;
		white-space: pre-line;
	`,
};
