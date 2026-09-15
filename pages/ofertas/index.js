import { useEffect } from "react";
import { useRouter } from "next/router";

export default function OfertasIndex() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/ofertas/promociones");
	}, [router]);

	return null;
}
