import device from "../../utils/utils";
import styled from "styled-components";

export const Styled = {
  Inner: styled.div`
    width: 100%;
    background-color: red;
  `,
  Container: styled.div`
    width: 75%;
    margin: 0 12.5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    background-color: none;
    padding-bottom: 6.5rem;
    @media ${device.mobileL} {
      width: 90%;
      margin: 5%;
      padding-bottom: 7rem;
    }
  `,
  Section: styled.section`
    width: 100%;
    display: flex;
    flex-direction: ${(props) => (props.$layout === "list" ? "column" : "row")};
    flex-wrap: ${(props) => (props.$layout === "list" ? "nowrap" : "wrap")};
    justify-content: flex-start;
    align-content: flex-start;
    scroll-margin-top: 5.5rem;
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
