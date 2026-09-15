import OfertasLayout from "../../components/ofertas/OfertasLayout";
import ComparativaView from "../../components/ofertas/views/ComparativaView";
import { useOfertas } from "../../hooks/useOfertas";

export default function ComparativaPage() {
	const { destacados, loading, error } = useOfertas();

	return (
		<OfertasLayout loading={loading} error={error}>
			<ComparativaView destacados={destacados} />
		</OfertasLayout>
	);
}
