import OfertasLayout from "../../components/ofertas/OfertasLayout";
import HomeView from "../../components/ofertas/views/HomeView";
import { useOfertas } from "../../hooks/useOfertas";

export default function OfertasHomePage() {
	const { flyers, kits, destacados, otros, loading, error } = useOfertas();

	return (
		<OfertasLayout loading={loading} error={error} home>
			<HomeView
				flyers={flyers}
				kits={kits}
				destacados={destacados}
				otros={otros}
			/>
		</OfertasLayout>
	);
}
