import { fetchJson } from "./api";

const { CMS_URL } = process.env;

export interface Product {
    id: number;
    title: string;
}

export async function getProducts(): Promise<Product[]> {
    const products = await fetchJson(`${CMS_URL}/products`);
    return products.map(stripProduct);
}


function stripProduct(product:any): Product {
    return {
        id: product.id,
        title: product.title,
    }
}