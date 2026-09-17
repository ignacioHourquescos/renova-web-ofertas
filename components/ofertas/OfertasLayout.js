import NavHeader from "./components/nav-header/NavHeader";
import { Styled } from "./styles";

export default function OfertasLayout({ loading, error, children, home = false }) {
	if (error) {
		return (
			<>
				<NavHeader />
				<p style={{ color: "#111", textAlign: "center", marginTop: "2rem" }}>
					Error cargando ofertas.
				</p>
			</>
		);
	}

	return (
		<>
			<NavHeader />
			{home ? (
				loading ? null : (
					children
				)
			) : (
				<Styled.Container>{loading ? null : children}</Styled.Container>
			)}
		</>
	);
}
