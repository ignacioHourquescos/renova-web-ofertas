import OfertasLayout from "../../components/ofertas/OfertasLayout";
import PromocionesView from "../../components/ofertas/views/PromocionesView";
import { useOfertas } from "../../hooks/useOfertas";

export default function PromocionesPage() {
	const { flyers, loading, error } = useOfertas();

	return (
		<OfertasLayout loading={loading} error={error}>
			<PromocionesView flyers={flyers} />
		</OfertasLayout>
	);
}
