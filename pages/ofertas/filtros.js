import OfertasLayout from "../../components/ofertas/OfertasLayout";
import KitsView from "../../components/ofertas/views/KitsView";
import { useOfertas } from "../../hooks/useOfertas";

export default function FiltrosPage() {
	const { kits, loading, error } = useOfertas();

	return (
		<OfertasLayout loading={loading} error={error}>
			<KitsView kits={kits} />
		</OfertasLayout>
	);
}
