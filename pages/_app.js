import { useEffect } from "react";
import "../styles/globals.css";
import SplashScreen from "../components/UI/splash/SplashScreen";
import { preloadOfertas } from "../hooks/useOfertas";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		preloadOfertas().catch(() => {});
	}, []);

	return (
		<>
			<SplashScreen />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
