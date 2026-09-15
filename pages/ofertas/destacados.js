import OfertasLayout from "../../components/ofertas/OfertasLayout";
import DestacadosView from "../../components/ofertas/views/DestacadosView";
import { useOfertas } from "../../hooks/useOfertas";

export default function DestacadosPage() {
	const { destacados, loading, error } = useOfertas();

	return (
		<OfertasLayout loading={loading} error={error}>
			<DestacadosView destacados={destacados} />
		</OfertasLayout>
	);
}
