import { useEffect } from "react";
import { useRouter } from "next/router";

export default function KitsRedirect() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/ofertas/filtros");
	}, [router]);

	return null;
}
