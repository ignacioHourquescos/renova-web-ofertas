import device from "../../utils/utils";
import styled, { css } from "styled-components";

export const Styled = {
  Inner: styled.div`
    width: 100%;
    background-color: red;
  `,
  Container: styled.div`
    /* Casi todo el ancho de pantalla para que las cinco tarjetas por fila no
       queden angostas; el max-width evita tarjetas enormes en monitores anchos. */
    width: 88%;
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    background-color: none;
    /* Aire entre el header sticky y el comienzo del contenido. */
    padding-top: clamp(1.25rem, 2.5vw, 2.25rem);
    /* Con la barra de filtros oculta (FILTER_BAR_ENABLED) basta un margen normal;
       al reactivarla hay que volver a 6.5rem (y 7rem en mobile). */
    padding-bottom: 2rem;
    @media ${device.tablet} {
      width: 100%;
      margin: 0;
      padding: 0.9rem 0.6rem 1.75rem;
    }
  `,
  Section: styled.section`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    scroll-margin-top: 5.5rem;

    ${(props) =>
      props.$layout === "list"
        ? css`
            flex-direction: column;
            flex-wrap: nowrap;
          `
        : css`
            flex-direction: row;
            flex-wrap: wrap;
            gap: var(--card-gap);
            /* Cinco por fila en desktop: el ancho sale del contenedor, sin sobrante a la derecha. */
            --card-gap: clamp(1.1rem, 2vw, 1.85rem);
            --card-w: calc((100% - 4 * var(--card-gap)) / 5);

            @media ${device.tablet} {
              /* Tres por fila en tablet: el ancho sale del contenedor, sin sobrante a la derecha. */
              --card-gap: 0.7rem;
              --card-w: calc((100% - 2 * var(--card-gap)) / 3);
            }

            @media ${device.mobileXL} {
              /* Dos tarjetas por fila en celular. */
              --card-w: calc((100% - var(--card-gap)) / 2);
            }
          `}
  `,

  ProductsContainer: styled.div`
    width: 75%;
    margin: 0 12.5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    background-color: none;
    @media ${device.mobileL} {
      width: 90%;
      margin: 5%;
    }
  `,
};
