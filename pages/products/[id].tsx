import Head from "next/head";
import React from "react";
import { getProduct, getProducts, Product } from "../../lib/products";
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from "querystring";
import { ApiError } from "next/dist/server/api-utils";
import Title from "../../components/title";

interface ProductPageProps {
    product: Product
}

interface ProductPageParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
    const products = await getProducts();

    return {
        paths: products.map((product) => ({
            params: { id: product.id.toString() }
        })),
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({ params: { id } }) => {
    try {

        const product = await getProduct(id);

        return {
            props: { product },
            revalidate: parseInt(process.env.REVALIDATE_SECONDS),
        }
    } catch (error) {
        if (error instanceof ApiError && error.statusCode == 404) {
            return { notFound: true }
        }

        throw error;
    }

}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    return (
        <>
            <Head>
                <title>
                    {product.title} - Products
                </title>
            </Head>
            <main>
                <Title>{product.title}</Title>
                <p>
                    {product.description}
                </p>
            </main>
        </>
    );
}

export default ProductPage;