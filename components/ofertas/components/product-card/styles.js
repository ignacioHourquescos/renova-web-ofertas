import styled from "styled-components";
import device from "../../../../utils/utils";

export const Styled = {
	Inner: styled.div`
		box-shadow: 0 0 7px 0px rgba(0, 0, 0, 0.4);
		width: 18%;
		height: 40vh;
		margin: 1%;
		border-color: ${(props) => props.borderColor};
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		background-color: white;
		position: relative;
		border-radius: 5px;

		@media ${device.tablet} {
			width: 31.33%;
			height: 25vh;
			background-size: cover;
			background-position: center;
			margin: 1%;
		}
	`,
	Image: styled.div.attrs((props) => ({
		type: "text",
		imageUrl: props.imageUrl,
	}))`
		background-image: url(${(props) => props.imageUrl});
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		height: 55%;
		width: 80%;
		margin: 7.5% 10%;

		@media ${device.mobileL} {
			width: 80%;
			margin: 7.5% 10%;
		}
	`,
	Brand: styled.div`
		position: absolute;
		right: 0.5rem;
		font-size: 0.8rem;
		top: 0.5rem;
		color: white;
		background-color: black;
		font-weight: 400;
		padding: 0.1rem;
		display: flex;
		@media ${device.mobileL} {
			font-size: 0.6rem;
			right: 0;
		}
	`,
	Presentation: styled.div`
		position: absolute;
		right: 0.5rem;
		font-size: 0.8rem;
		top: 1.7rem;
		color: white;
		background-color: black;
		font-weight: 400;
		padding: 0.1rem;
		display: flex;
		@media ${device.mobileL} {
			font-size: 0.6rem;
			right: 0;
			top: 1.4rem;
		}
	`,
	Information: styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		justify-items: center;
		align-content: center;
		align-items: flex-start;
		background-color: black;
		color: white;
		height: 35%;
	`,
	DetailContainer: styled.div`
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: space-between;
		justify-items: space-between;
		align-content: center;
		align-items: center;
		padding: 0.3rem;
		background-color: black;
	`,
	Title: styled.div`
		font-size: 1rem;
		background-color: #464646;
		color: white;
		width: 100%;
		padding: 0.3rem;
		text-align: center;
		height: 40%;
		@media ${device.mobileL} {
			font-size: 0.7rem;
			padding: 0.3rem 0rem;
		}
	`,
	Code: styled.div`
		font-size: 0.8rem;
		color: white;
		font-weight: bold;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		margin-bottom: 0.2rem;
		text-transform: uppercase;
		text-align: center;
		font-weight: 200;
		@media ${device.mobileL} {
			font-size: 0.5rem;
			margin: 0;
			padding: 0;
		}
	`,
	Price: styled.div`
		right: 0.5rem;
		bottom: 0.5rem;
		font-size: 1.5rem;
		text-shadow: #000 1px 0 10px;
		font-weight: 800;
		color: orange;

		@media ${device.mobileL} {
			font-size: 01rem;
		}
	`,
	InnerUnavailable: styled.div`
		position: absolute;
		top: 0;
		right: 0;
		background-color: rgba(28, 28, 28, 0.638);
		text-align: center;
		padding: 50% 0;
		color: white;
		width: 100%;
		height: 100%;
		font-weight: bold;
	`,
};
