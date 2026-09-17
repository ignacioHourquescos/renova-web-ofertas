import styled from "styled-components";

/**
 * Mismo aspecto que el título de fila de la home (Styled.RowTitle en
 * components/ofertas/components/home-carousel/styles.js), pero sin flecha ni
 * link. El `width: 100%` fuerza el corte de fila dentro de `Styled.Section`.
 */
export const Inner = styled.div`
	font-family: var(--font-title);
	width: 100%;
	margin: clamp(1.2rem, 2.8vw, 1.9rem) 0 clamp(0.5rem, 1.1vw, 0.8rem);
	padding: clamp(0.6rem, 1.5vw, 1.1rem) 0 clamp(0.35rem, 0.9vw, 0.6rem);
	background-color: transparent;
	color: #111;
	text-align: center;
	font-size: clamp(1.3rem, 2vw, 1.7rem);
	font-style: italic;
	font-weight: 800;
	letter-spacing: 0;
	text-transform: uppercase;
	box-shadow: none;
`;
