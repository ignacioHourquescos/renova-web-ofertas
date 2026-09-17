import Link from "next/link";
import { useRouter } from "next/router";
import { Styled } from "./styles";

export const HOME_HREF = "/ofertas";

export const NAV_ITEMS = [
	{
		id: "promociones",
		label: "Promociones",
		href: "/ofertas/promociones",
	},
	{
		id: "filtros",
		label: "Filtros",
		href: "/ofertas/filtros",
	},
	{
		id: "lubricantes",
		label: "Lubricantes",
		href: "/ofertas/lubricantes",
	},
	{
		id: "otros",
		label: "Otros",
		href: "/ofertas/otros",
	},
];

const NavHeader = () => {
	const router = useRouter();
	const path = router.asPath.split("?")[0];

	return (
		<Styled.Bar>
			<Link href={HOME_HREF} passHref legacyBehavior>
				<Styled.Brand aria-label="Inicio">
					<Styled.BrandImage src="/brand/logo-renova.png" alt="Renova" />
				</Styled.Brand>
			</Link>
			<Styled.Inner>
				{NAV_ITEMS.map(({ id, label, href }) => {
					const active = path === href || path.startsWith(`${href}/`);
					return (
						<Link key={id} href={href} passHref legacyBehavior>
							<Styled.Item
								$active={active}
								aria-current={active ? "page" : undefined}
							>
								{label}
							</Styled.Item>
						</Link>
					);
				})}
			</Styled.Inner>
		</Styled.Bar>
	);
};

export default NavHeader;
