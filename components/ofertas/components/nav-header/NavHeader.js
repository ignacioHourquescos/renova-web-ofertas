import Link from "next/link";
import { useRouter } from "next/router";
import { Styled } from "./styles";

const IconPromociones = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9.2c.4 0 .77.16 1.05.44l3.81 3.81c.28.28.44.66.44 1.05V18.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-13Z"
			stroke="currentColor"
			strokeWidth="1.8"
		/>
		<path
			d="M14 4.2V8a1 1 0 0 0 1 1h3.8"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
		/>
		<path
			d="M8 13h8M8 16.5h5"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
		/>
	</svg>
);

const IconKits = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5v-7Z"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinejoin="round"
		/>
		<path
			d="M12 12 4.7 7.7M12 12l7.3-4.3M12 12v8"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
		/>
	</svg>
);

const IconDestacados = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="m12 3.5 2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.5l-4.7 2.45.9-5.23-3.8-3.7 5.25-.76L12 3.5Z"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinejoin="round"
		/>
	</svg>
);

const IconComparativa = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M5 19V9M10 19V5M15 19v-7M20 19V8"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
		/>
		<path
			d="M3.5 19.5h17"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
		/>
	</svg>
);

export const NAV_ITEMS = [
	{
		id: "promociones",
		label: "Promociones",
		href: "/ofertas/promociones",
		Icon: IconPromociones,
	},
	{
		id: "destacados",
		label: "Destacados",
		href: "/ofertas/destacados",
		Icon: IconDestacados,
	},
	{ id: "kits", label: "Kits", href: "/ofertas/kits", Icon: IconKits },
	{
		id: "comparativa",
		label: "Comparativa",
		href: "/ofertas/comparativa",
		Icon: IconComparativa,
	},
];

const NavHeader = () => {
	const router = useRouter();
	const path = router.asPath.split("?")[0];

	return (
		<Styled.Bar>
			<Styled.Inner>
				{NAV_ITEMS.map(({ id, label, href, Icon }) => {
					const active = path === href || path.startsWith(`${href}/`);
					return (
						<Link key={id} href={href} passHref legacyBehavior>
							<Styled.Item
								$active={active}
								aria-current={active ? "page" : undefined}
							>
								<Icon />
								<span>{label}</span>
							</Styled.Item>
						</Link>
					);
				})}
			</Styled.Inner>
		</Styled.Bar>
	);
};

export default NavHeader;
