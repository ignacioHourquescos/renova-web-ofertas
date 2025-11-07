import { Client } from "@notionhq/client";
import { get_prices } from "./renovapp/prices";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		// Check if environment variables are set
		if (!process.env.NOTION_SECRET) {
			throw new Error("NOTION_SECRET is not configured");
		}
		if (!process.env.NOTION_DATABASE_ID) {
			throw new Error("NOTION_DATABASE_ID is not configured");
		}

		const notion = new Client({ auth: process.env.NOTION_SECRET });

		try {
			const [notionResponse, prices] = await Promise.all([
				notion.databases.query({
					database_id: process.env.NOTION_DATABASE_ID,
					sorts: [
						{
							property: "codigo",
							direction: "ascending",
						},
					],
					filter: {
						property: "activo",
						checkbox: {
							equals: true,
						},
					},
				}),
				get_prices(),
			]);

			console.log("Notion Response:", notionResponse); // Debug log
			console.log("Prices:", prices); // Debug log

			const notionArray = notionResponse.results.map((item) => ({
				internalNotionCode: item?.id || "",
				id: item.properties.codigo.title[0]?.plain_text || "",
				title: item.properties.titulo.rich_text[0]?.plain_text || "",
				brand: item.properties.marca.rich_text[0]?.plain_text || "",
				active: item.properties.activo?.checkbox || false,
				discount: item.properties.descuento?.number || 0,
				imageUrl: item.properties.imagen.files[0]?.file?.url || "",
				category: item.properties.categoria.select?.name || "",
				specialPrice: item.properties.precio?.number || 0,
				detail: item.properties.detalle?.rich_text[0]?.plain_text || "",
			}));

			const products = notionArray.map((element) => ({
				...element,
				price:
					(prices.find((element2) => element2.id == element.id)?.pr || 0) *
					1.21 *
					(1 - element.discount),
			}));

			return res.status(200).json(products);
		} catch (error) {
			console.error("Error in data processing:", error);
			throw error;
		}
	} catch (error) {
		console.error("API Error:", error);
		return res.status(500).json({
			message: "Error fetching data",
			error: error.message,
		});
	}
}
