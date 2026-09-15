import "../styles/globals.css";
import SplashScreen from "../components/UI/splash/SplashScreen";
import { preloadOfertas } from "../hooks/useOfertas";

// Arranca la carga apenas se hidrata el cliente (antes / junto al splash).
if (typeof window !== "undefined") {
	preloadOfertas().catch(() => {});
}

function MyApp({ Component, pageProps }) {
	return (
		<>
			<SplashScreen />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
