import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import {
	getAtributosRows,
	getGraduacion,
	getImagenes,
} from "../components/ofertas/components/filter/filterHelpers";
import ProductCard from "../components/ofertas/components/product-card/ProductCard";

/** Destacado tal como lo devuelve /ofertas con atributos y galería. */
const item = {
	id: "4G3JNfKwPJXdmeY9MJ8l",
	titulo: "8100 ECO-NERGY 5W30 5L",
	descripcion: "Aceite motor Fuel Economy 100% sintético.",
	marca: "MOTUL",
	precioFormateado: "$94.000",
	precio: 94000,
	presentacion: "5L",
	atributos: {
		tipo: "sintetico",
		tipoNombre: "Sintético",
		graduacion: "5w30",
		graduacionNombre: "5W30",
		acea: "A5-B5",
		api: "SL",
	},
	imagenUrl: "https://example.test/bidon.webp",
	imagenThumbUrl: "https://example.test/bidon_thumb.webp",
	imagenes: [
		{ url: "https://example.test/bidon.webp", thumbUrl: "https://example.test/bidon_thumb.webp" },
		{ url: "https://example.test/logo.webp", thumbUrl: "https://example.test/logo_thumb.webp" },
	],
};

function renderCard(overrides = {}) {
	return render(
		<ProductCard
			product={{
				id: item.id,
				brand: item.marca,
				title: item.titulo,
				imageUrl: item.imagenThumbUrl,
				priceLabel: item.precioFormateado,
				badge: getGraduacion(item),
				detailImages: getImagenes(item),
				specs: getAtributosRows(item),
				description: item.descripcion,
				...overrides,
			}}
		/>
	);
}

describe("getGraduacion", () => {
	it("usa el nombre para mostrar", () => {
		expect(getGraduacion(item)).toBe("5W30");
	});

	it("cae al slug y lo pasa a mayúsculas", () => {
		expect(getGraduacion({ atributos: { graduacion: "10w40" } })).toBe("10W40");
	});

	it("devuelve vacío cuando no hay atributos", () => {
		expect(getGraduacion({ atributos: { graduacion: "   " } })).toBe("");
		expect(getGraduacion({})).toBe("");
		expect(getGraduacion()).toBe("");
	});
});

describe("getAtributosRows", () => {
	it("arma las filas en orden y omite las vacías", () => {
		expect(getAtributosRows(item)).toEqual([
			{ label: "Presentación", value: "5L" },
			{ label: "Tipo", value: "Sintético" },
			{ label: "Graduación", value: "5W30" },
			{ label: "Norma ACEA", value: "A5-B5" },
			{ label: "Norma API", value: "SL" },
		]);
	});

	it("no devuelve filas si el artículo no tiene atributos", () => {
		expect(getAtributosRows({ titulo: "Pelado" })).toEqual([]);
		expect(getAtributosRows()).toEqual([]);
	});
});

describe("getImagenes", () => {
	it("normaliza la galería del endpoint", () => {
		expect(getImagenes(item)).toHaveLength(2);
		expect(getImagenes(item)[1]).toEqual({
			url: "https://example.test/logo.webp",
			thumbUrl: "https://example.test/logo_thumb.webp",
		});
	});

	it("cae a la imagen principal cuando no hay galería", () => {
		expect(getImagenes({ imagenUrl: "https://example.test/solo.webp" })).toEqual([
			{ url: "https://example.test/solo.webp", thumbUrl: "https://example.test/solo.webp" },
		]);
	});

	it("devuelve lista vacía si no hay ninguna imagen", () => {
		expect(getImagenes({})).toEqual([]);
	});
});

describe("ProductCard", () => {
	it("muestra la graduación como chip", () => {
		renderCard();
		expect(screen.getByText("5W30")).toBeInTheDocument();
	});

	it("no dibuja el chip si no hay graduación", () => {
		renderCard({ badge: getGraduacion({}) });
		expect(screen.queryByText("5W30")).not.toBeInTheDocument();
	});

	it("al clickear la imagen abre el detalle con datos y thumbnails", () => {
		renderCard();
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: /Ver detalle/i }));

		const dialog = screen.getByRole("dialog");
		expect(dialog).toBeInTheDocument();
		// Una specs row por atributo cargado.
		expect(screen.getByText("Norma ACEA")).toBeInTheDocument();
		expect(screen.getByText("A5-B5")).toBeInTheDocument();
		expect(screen.getByText("Sintético")).toBeInTheDocument();
		expect(screen.getByText(item.descripcion)).toBeInTheDocument();
		// Un thumbnail por imagen de la galería.
		expect(screen.getAllByRole("button", { name: /Ver imagen/i })).toHaveLength(2);
	});

	it("el detalle se cierra con la X", () => {
		renderCard();
		fireEvent.click(screen.getByRole("button", { name: /Ver detalle/i }));
		fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("no muestra thumbnails cuando hay una sola imagen", () => {
		renderCard({ detailImages: getImagenes({ imagenUrl: "https://example.test/solo.webp" }) });
		fireEvent.click(screen.getByRole("button", { name: /Ver detalle/i }));
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: /Ver imagen/i })).not.toBeInTheDocument();
	});
});
