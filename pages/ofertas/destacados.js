import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DestacadosRedirect() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/ofertas/lubricantes");
	}, [router]);

	return null;
}
