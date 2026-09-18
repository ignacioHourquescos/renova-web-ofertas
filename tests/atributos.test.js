import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { getGraduacion } from "../components/ofertas/components/filter/filterHelpers";
import ProductCard from "../components/ofertas/components/product-card/ProductCard";

/** Destacado tal como lo devuelve /ofertas una vez que la API manda `atributos`. */
const item = {
	id: "4G3JNfKwPJXdmeY9MJ8l",
	titulo: "8100 ECO-NERGY 5W30 5L",
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
};

describe("getGraduacion", () => {
	it("usa el nombre para mostrar", () => {
		expect(getGraduacion(item)).toBe("5W30");
	});

	it("cae al slug y lo pasa a mayúsculas", () => {
		expect(getGraduacion({ atributos: { graduacion: "10w40" } })).toBe("10W40");
	});

	it("devuelve vacío cuando la API todavía no manda atributos", () => {
		expect(getGraduacion({ titulo: "Sin atributos" })).toBe("");
		expect(getGraduacion({ atributos: { graduacion: "   " } })).toBe("");
		expect(getGraduacion({})).toBe("");
		expect(getGraduacion()).toBe("");
	});
});

describe("ProductCard", () => {
	it("muestra la graduación como chip", () => {
		render(
			<ProductCard
				product={{
					id: item.id,
					brand: item.marca,
					title: item.titulo,
					imageUrl: "https://example.test/motul.webp",
					priceLabel: item.precioFormateado,
					badge: getGraduacion(item),
				}}
			/>
		);

		expect(screen.getByText("5W30")).toBeInTheDocument();
	});

	it("no dibuja el chip si no hay graduación", () => {
		render(
			<ProductCard
				product={{
					id: "x",
					title: "Producto sin atributos",
					priceLabel: "$1.000",
					badge: getGraduacion({}),
				}}
			/>
		);

		expect(screen.getByText("Producto sin atributos")).toBeInTheDocument();
		expect(screen.queryByText("5W30")).not.toBeInTheDocument();
	});
});
