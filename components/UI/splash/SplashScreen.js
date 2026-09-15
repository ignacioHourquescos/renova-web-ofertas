import { useEffect, useState } from "react";
import { preloadOfertas } from "../../../hooks/useOfertas";
import { Styled } from "./styles";

const MIN_SPLASH_MS = 1800;
const FADE_MS = 550;

/**
 * Splash de marca: dispara la carga de ofertas en paralelo
 * y no se va hasta que la data esté lista (con un mínimo de tiempo).
 */
export default function SplashScreen() {
	const [visible, setVisible] = useState(true);
	const [exiting, setExiting] = useState(false);

	useEffect(() => {
		let cancelled = false;
		let fadeTimer;

		const minWait = new Promise((resolve) => {
			window.setTimeout(resolve, MIN_SPLASH_MS);
		});

		const dataWait = preloadOfertas().catch((err) => {
			console.error("Error precargando ofertas:", err);
			return null;
		});

		Promise.all([minWait, dataWait]).then(() => {
			if (cancelled) return;
			setExiting(true);
			fadeTimer = window.setTimeout(() => {
				if (!cancelled) setVisible(false);
			}, FADE_MS);
		});

		return () => {
			cancelled = true;
			if (fadeTimer) window.clearTimeout(fadeTimer);
		};
	}, []);

	useEffect(() => {
		if (!visible) return undefined;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [visible]);

	if (!visible) return null;

	return (
		<Styled.Overlay $exiting={exiting} role="presentation" aria-label="Renova">
			<Styled.Logo
				src="/brand/logo-renova-splash.png"
				alt="Renova"
			/>
		</Styled.Overlay>
	);
}
