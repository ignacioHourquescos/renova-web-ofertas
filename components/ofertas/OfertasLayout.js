import NavHeader from "./components/nav-header/NavHeader";
import { Styled } from "./styles";

export default function OfertasLayout({ loading, error, children }) {
	if (error) {
		return (
			<>
				<NavHeader />
				<p style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
					Error cargando ofertas.
				</p>
			</>
		);
	}

	return (
		<>
			<NavHeader />
			<Styled.Container>{loading ? null : children}</Styled.Container>
		</>
	);
}
