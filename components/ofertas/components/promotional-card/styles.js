import styled from "styled-components";
import device from "../../../../utils/utils";

export const Styled = {
	Inner: styled.div.attrs((props) => ({
		type: "text",
		imageUrl: props.imageUrl,
	}))`
		border-radius: 5px;
		box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.1);
		width: 30%;
		background-color: white;
		margin: 1.5%;
		position: relative;
		display: flex;
		flex-direction: column;

		background-image: url(${(props) => props.imageUrl});

		@media ${device.tablet} {
			width: 100%;
			margin: 0%;
			background-size: cover;
			background-position: center;
			margin-bottom: 10%;
		}
	`,
	Image: styled.div.attrs((props) => ({
		type: "text",
		imageUrl: props.imageUrl,
	}))`
		width: 100%;
		height: 250px;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;

		background-image: url(${(props) => props.imageUrl});
	`,

	Ribbon: styled.div`
		width: 100%;
		padding: 3%;
		display: flex;
		justify-content: space-between;
		border-top: 10px solid orange;
		background-color: rgb(0, 0, 0, 0.9);
		height: 150px;

		bottom: 0;
		right: 0;
		border-radius: 0 0 5px 5px;
	`,
	TextContainer: styled.div`
		padding: 0.5rem;
		width: 70%;
	`,
	Title: styled.div`
		width: 100%;
		font-size: 1.3rem;
		color: White;
		top: 3%;
		font-weight: bold;
		padding-bottom: 0.5rem;
		@media ${device.mobileS} {
			font-size: 0.5rem;
		}
	`,
	Description: styled.div`
		width: 100%;
		font-size: 1rem;
		color: white;
		font-weight: 200;
		@media ${device.mobileL} {
			font-size: 0.8rem;
		}
	`,
	Detail: styled.div`
		width: 100%;
		font-size: 0.5rem;
		color: white;
		margin-top: 0.5rem;
		font-weight: 100;
		@media ${device.mobileS} {
			font-size: 0.5rem;
		}
	`,
	Validity: styled.div`
		color: black;
		position: absolute;
		right: 3%;
		top: 3%;
		background-color: grey;
		font-size: 0.8rem;
	`,
	IndividualPrice: styled.div`
		border-left: 1px solid white;
		padding-left: 1rem;
		display: flex;
		flex-direction: column;
		align-content: flex-end;
		align-items: flex-end;
		width: 30%;
		margin-top: 1rem;
	`,
	PriceIndicator: styled.div`
		margin-bottom: 0.7rem;
		font-size: 0.6rem;
		color: white;
	`,

	Price: styled.div`
		color: orange;
		font-size: 1.4rem;
		font-weight: bold;
	`,
};
