import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ComparativaRedirect() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/ofertas/otros");
	}, [router]);

	return null;
}
