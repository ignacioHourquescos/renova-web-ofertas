import { Client } from "@notionhq/client";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		const notion = new Client({
			auth: "secret_4yG0RqGh5tXyLuKm3gRMhyvRf1ygu6sNRINVQliEofc",
		});

		const notionResponse = await notion.databases.query({
			database_id: "2bca360b3aae4517abae717845adbc9a",
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
		});

		res.status(200).json(notionResponse);
	} catch (error) {
		console.error("Error fetching Notion data:", error);
		res.status(500).json({ error: "Failed to fetch Notion data" });
	}
}
