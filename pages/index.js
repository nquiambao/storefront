import Head from 'next/head'

import {loadStripe} from '@stripe/stripe-js'
import {PageTitle} from './../components/PageTitle'
import {ProductCard} from './../components/ProductCard'

import {store, productsList} from './../styles/Home.module.css'

export default function Home(props) {
  const products = props.products
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  
  return (
    <>
    <Head>
      <meta charset="UTF-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content="speck eyewear provides all kinds of glasses for everyone."/>
      <title>speck eyewear</title>

    </Head>
      <PageTitle title="speck eyewear" tagline="featured products"/>
      <main className={store}>
        <div className={productsList}>
          {products.map(product=><ProductCard product={product} key={product.key} />)}
        </div>
      </main>
    </>
  )  
}

export async function getStaticProps() {
  const res = await fetch('https://speck-24af8-default-rtdb.firebaseio.com/products.json')
  const productData = await res.json()
  const products = Object.values(productData)

  return {
    props: {
      products
    },
    revalidate: 60
  }
}