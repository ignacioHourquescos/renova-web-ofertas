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

const IconFiltros = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M5 5h14l-5.2 6.4V18l-3.6 2v-8.6L5 5Z"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinejoin="round"
		/>
	</svg>
);

const IconLubricantes = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M8 8.5V5.8c0-.4.2-.8.5-1L11 3h2l2.5 1.8c.3.2.5.6.5 1V8.5"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M7.5 8.5h9v11.2c0 .7-.6 1.3-1.3 1.3H8.8c-.7 0-1.3-.6-1.3-1.3V8.5Z"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinejoin="round"
		/>
		<path
			d="M10 13h4"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
		/>
	</svg>
);

const IconOtros = () => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<rect
			x="4"
			y="4"
			width="7"
			height="7"
			rx="1.4"
			stroke="currentColor"
			strokeWidth="1.8"
		/>
		<rect
			x="13"
			y="4"
			width="7"
			height="7"
			rx="1.4"
			stroke="currentColor"
			strokeWidth="1.8"
		/>
		<rect
			x="4"
			y="13"
			width="7"
			height="7"
			rx="1.4"
			stroke="currentColor"
			strokeWidth="1.8"
		/>
		<rect
			x="13"
			y="13"
			width="7"
			height="7"
			rx="1.4"
			stroke="currentColor"
			strokeWidth="1.8"
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
		id: "filtros",
		label: "Filtros",
		href: "/ofertas/filtros",
		Icon: IconFiltros,
	},
	{
		id: "lubricantes",
		label: "Lubricantes",
		href: "/ofertas/lubricantes",
		Icon: IconLubricantes,
	},
	{
		id: "otros",
		label: "Otros",
		href: "/ofertas/otros",
		Icon: IconOtros,
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
