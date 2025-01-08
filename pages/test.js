import { Client } from "@notionhq/client";
import { useEffect } from "react";

const notion = new Client({
	auth: "secret_4yG0RqGh5tXyLuKm3gRMhyvRf1ygu6sNRINVQliEofc",
});

function App({ items }) {
	useEffect(() => {
		let array = [];

		items.forEach((item) => {
			array.push({
				id: item.id,
				name: item.properties.codigo.title[0].plain_text,
				description: item.properties.titulo.rich_text[0].plain_text,
				activo: item.properties.activo.checkbox,
				descuento: item.properties.descuento.number,
				image: item.properties.imagen.files[0]?.file.url,
				category: item.properties.categoria.rich_text[0],
			});
		});

		console.log("aca esta el array", array);

		console.log("USE EFFECT" + items);
	});

	return (
		<div className="App">
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
		</div>
	);
}

export default App;

//id =f81df32bac964878af140c249adf7e72

export async function getStaticProps() {
	const notion = new Client({
		auth: "secret_4yG0RqGh5tXyLuKm3gRMhyvRf1ygu6sNRINVQliEofc",
	});
	const response = await notion.databases.query({
		database_id: "2bca360b3aae4517abae717845adbc9a",
		sorts: [
			{
				timestamp: "created_time",
				direction: "ascending",
			},
		],
	});
	console.log("get static props", response);

	return {
		props: {
			items: response.results,
		},
		revalidate: 1,
	};
}
