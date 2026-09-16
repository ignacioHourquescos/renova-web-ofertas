import OfertasLayout from "../../components/ofertas/OfertasLayout";
import DestacadosView from "../../components/ofertas/views/DestacadosView";
import { useOfertas } from "../../hooks/useOfertas";

export default function OtrosPage() {
	const { otros, loading, error } = useOfertas();

	return (
		<OfertasLayout loading={loading} error={error}>
			<DestacadosView destacados={otros} />
		</OfertasLayout>
	);
}
