import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Title from '../components/title';
import { getProducts, Product } from '../lib/products';

interface HomePageProps {
  products: Product[]
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log('[Homepage] getStaticProps()');
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
};

const HomePage: React.FC<HomePageProps> = ( { products} ) => {
  console.log('[HomePage] render:', products)
  return (
    <>
      <Head>
        <title>
          Next Shop
        </title>
      </Head>
      <main className="p-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id} >
              {product.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default HomePage;
