import styled from "styled-components";
import device from "../../../../utils/utils";

export const Inner = styled.div`
	width: 100%;
	margin: 1.75rem 0 1.25rem;
	padding: 0.65rem 0 0.55rem;
	background-color: transparent;
	color: #1a1a1a;
	text-align: left;
	font-size: 1.35rem;
	font-weight: 800;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
	box-shadow: none;

	@media ${device.mobileL} {
		width: 100%;
		margin: 1rem 0 0.85rem;
		font-size: 1.05rem;
		padding: 0.45rem 0 0.4rem;
	}
`;
