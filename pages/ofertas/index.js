// import Product from "./Sections/Product/Product";

import { Client } from "@notionhq/client";
import { useEffect, useState } from "react";
import { get_prices } from "../api/renovapp/prices";
import { get_products_filters } from "../api/sheets/product_filters";
import { get_products_non_filters } from "../api/sheets/products_non_filters";
import { Ofertas as OfertasDetail } from "../../components/ofertas/index";
import Loader from "../../components/UI/Loader";

export default function Home({ items }) {
	const [products, setProducts] = useState();
	const [loading, setLoading] = useState(true);
	// const [brands, setBrands] = useState(null);
	const [filters, setFilters] = useState();
	const categories = [
		"FRAM",
		"MOTUL",
		"ORIGINALES",
		"SINTETICO",
		"MINERAL",
		"SEMI-SINTETICO",
		"LOCX",
		"TOTAL",
		"PUMA",
		"VALVOLINE",
		"PETRONAS",
		"SHELL-OMNICRAFT",
		"SHELL",
		"LOCX",
		"VARIOS",
		"OFERTAS FILTROS",
		"ACEITES",
		"KITS",
	];
	let notionArray = [];

	items.forEach((item) => {
		notionArray.push({
			internalNotionCode: item?.id,
			id: item.properties.codigo.title[0]?.plain_text,
			title: item.properties.titulo.rich_text[0]?.plain_text,
			brand: item.properties.marca.rich_text[0]?.plain_text,
			active: item.properties.activo?.checkbox,
			discount: item.properties.descuento?.number,
			imageUrl: item.properties.imagen.files[0]?.file.url,
			category: item.properties.categoria.select?.name,
			specialPrice: item.properties.precio?.number,
			detail: item.properties.detalle?.rich_text[0]?.plain_text,
		});
	});

	console.log("aca esta el array", notionArray);

	useEffect(() => {
		const fetch_all = async () => {
			const productPriceArray = await Promise.all([null, null, get_prices()]);

			const consolidatedProductPrice = notionArray.map((element) => ({
				...element,
				price:
					productPriceArray[2].filter(
						(element2) => element2.id == element.id
					)[0]?.pr *
					1.21 *
					(1 - element.discount),
			}));
			setProducts(consolidatedProductPrice);
			setLoading(false);
			console.log("PRODUCTS ARRAY", consolidatedProductPrice);
			// setProducts(consolidatedProductPrice_non_filter);
		};

		fetch_all();
	}, []);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<OfertasDetail categories={categories} products={products} />
			)}
		</>
	);
}

// prettier-ignore
export async function getStaticProps() {
	const notion = new Client({auth: "secret_4yG0RqGh5tXyLuKm3gRMhyvRf1ygu6sNRINVQliEofc"});
	const response = await notion.databases.query({
		database_id: "2bca360b3aae4517abae717845adbc9a",

    sorts: [
      {
        property: "codigo",
        direction: "ascending"
        }
    ],
    filter: {
      property: "activo",
      checkbox: {
        equals: true
      }
    }
  
	});
  console.log("Results de Notion", response.results)
	return {
    
		props: {items: response.results},
		revalidate: 60,
	};
}
