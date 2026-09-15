import styled from "styled-components";
import device from "../../../../utils/utils";

export const Styled = {
	Bar: styled.div`
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 90;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		pointer-events: none;
		height: 7.5rem;
		padding: 0 1rem calc(1.25rem + env(safe-area-inset-bottom, 0));

		@media ${device.tablet} {
			height: 8rem;
			padding-bottom: calc(1.1rem + env(safe-area-inset-bottom, 0));
		}
	`,
	Actions: styled.div`
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		pointer-events: none;
	`,
	ViewToggle: styled.button`
		appearance: none;
		pointer-events: auto;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 10px;
		border: 3px solid orange;
		background: ${(props) => (props.$active ? "orange" : "#111")};
		color: ${(props) => (props.$active ? "#111" : "#fff")};
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(255, 165, 0, 0.35);
		transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
		flex-shrink: 0;

		&:hover {
			background: ${(props) => (props.$active ? "#ffb84d" : "#1c1c1c")};
			transform: translateY(-2px);
			box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(255, 165, 0, 0.45);
		}

		svg {
			width: 1.35rem;
			height: 1.35rem;
		}

		@media ${device.tablet} {
			width: 3.75rem;
			height: 3.75rem;
			border-radius: 10px;

			svg {
				width: 1.45rem;
				height: 1.45rem;
			}
		}
	`,
	BlurStrip: styled.div`
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	`,
	BlurLayer: styled.div`
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;

		${(props) =>
			props.$level === "strong"
				? `
			height: 55%;
			backdrop-filter: blur(14px) saturate(1.05);
			-webkit-backdrop-filter: blur(14px) saturate(1.05);
			background: linear-gradient(
				to top,
				rgba(248, 248, 248, 0.55) 0%,
				rgba(248, 248, 248, 0.28) 70%,
				rgba(248, 248, 248, 0) 100%
			);
			mask-image: linear-gradient(to top, #000 0%, #000 40%, transparent 100%);
			-webkit-mask-image: linear-gradient(to top, #000 0%, #000 40%, transparent 100%);
		`
				: props.$level === "mid"
				? `
			height: 78%;
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
			background: linear-gradient(
				to top,
				rgba(248, 248, 248, 0.22) 0%,
				rgba(248, 248, 248, 0.1) 50%,
				rgba(248, 248, 248, 0) 100%
			);
			mask-image: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0.55) 45%, transparent 100%);
			-webkit-mask-image: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0.55) 45%, transparent 100%);
		`
				: `
			height: 100%;
			backdrop-filter: blur(3px);
			-webkit-backdrop-filter: blur(3px);
			background: linear-gradient(
				to top,
				rgba(248, 248, 248, 0.12) 0%,
				rgba(248, 248, 248, 0.04) 40%,
				rgba(248, 248, 248, 0) 100%
			);
			mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.25) 50%, transparent 100%);
			-webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.25) 50%, transparent 100%);
		`}
	`,
	Pill: styled.button`
		position: relative;
		z-index: 1;
		appearance: none;
		border: 3px solid orange;
		cursor: pointer;
		pointer-events: auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		min-width: 12.5rem;
		min-height: 3.5rem;
		padding: 0.85rem 1.75rem;
		border-radius: 10px;
		background: ${(props) => (props.$active ? "orange" : "#111")};
		color: ${(props) => (props.$active ? "#111" : "#fff")};
		font-size: 1.05rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(255, 165, 0, 0.35);
		transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;

		&:hover {
			background: ${(props) => (props.$active ? "#ffb84d" : "#1c1c1c")};
			transform: translateY(-2px);
			box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(255, 165, 0, 0.45);
		}

		svg {
			width: 1.35rem;
			height: 1.35rem;
			flex-shrink: 0;
		}

		@media ${device.tablet} {
			min-width: 14rem;
			min-height: 3.75rem;
			padding: 0.95rem 2rem;
			font-size: 1.1rem;
			gap: 0.7rem;
			border-radius: 10px;

			svg {
				width: 1.45rem;
				height: 1.45rem;
			}
		}
	`,
	Badge: styled.span`
		min-width: 1.45rem;
		height: 1.45rem;
		padding: 0 0.35rem;
		border-radius: 999px;
		background: ${(props) => (props.$onOrange ? "#111" : "#fff")};
		color: ${(props) => (props.$onOrange ? "#fff" : "#111")};
		font-size: 0.78rem;
		font-weight: 800;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	`,
	Overlay: styled.div`
		position: fixed;
		inset: 0;
		z-index: 200;
		background: rgba(0, 0, 0, 0.45);
		display: flex;
		align-items: flex-end;
		justify-content: center;

		@media (min-width: 769px) {
			align-items: center;
			padding: 1.5rem;
		}
	`,
	Panel: styled.div`
		width: 100%;
		max-width: 420px;
		max-height: min(78vh, 560px);
		background: #fff;
		border-radius: 18px 18px 0 0;
		box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		overflow: hidden;

		@media (min-width: 769px) {
			border-radius: 16px;
			box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
			max-height: min(70vh, 520px);
		}
	`,
	PanelHeader: styled.div`
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.1rem 0.75rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		flex-shrink: 0;
	`,
	PanelTitle: styled.h2`
		margin: 0;
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: #111;
	`,
	Close: styled.button`
		appearance: none;
		border: none;
		background: transparent;
		color: #444;
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		padding: 0.15rem 0.35rem;
	`,
	PanelBody: styled.div`
		padding: 0.85rem 1.1rem 1.1rem;
		overflow-y: auto;
		flex: 1;
	`,
	Group: styled.div`
		& + & {
			margin-top: 1.15rem;
			padding-top: 1rem;
			border-top: 1px solid rgba(0, 0, 0, 0.06);
		}
	`,
	GroupLabel: styled.p`
		margin: 0 0 0.65rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #666;
	`,
	Chips: styled.div`
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	`,
	Chip: styled.button`
		appearance: none;
		border: 1px solid ${(props) => (props.$selected ? "orange" : "rgba(0, 0, 0, 0.18)")};
		background: ${(props) => (props.$selected ? "orange" : "#fff")};
		color: #111;
		cursor: pointer;
		border-radius: 999px;
		padding: 0.42rem 0.85rem;
		font-size: 0.8rem;
		font-weight: 600;
		transition: background 0.12s ease, border-color 0.12s ease;

		&:hover {
			border-color: orange;
		}
	`,
	PanelFooter: styled.div`
		display: flex;
		gap: 0.6rem;
		padding: 0.85rem 1.1rem 1.1rem;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		flex-shrink: 0;
	`,
	FooterBtn: styled.button`
		appearance: none;
		border: none;
		cursor: pointer;
		flex: 1;
		border-radius: 999px;
		padding: 0.7rem 1rem;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		background: ${(props) => (props.$primary ? "#111" : "transparent")};
		color: ${(props) => (props.$primary ? "#fff" : "#444")};
		border: 1px solid ${(props) => (props.$primary ? "#111" : "rgba(0, 0, 0, 0.18)")};

		&:disabled {
			opacity: 0.4;
			cursor: default;
		}
	`,
	Empty: styled.p`
		margin: 0.5rem 0 0;
		font-size: 0.85rem;
		color: #777;
	`,
};
