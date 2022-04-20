import Head from 'next/head'

import {loadStripe} from '@stripe/stripe-js'
import {PageTitle} from './../components/PageTitle'
import {ProductCard} from './../components/ProductCard'

import {store, productsList} from './../styles/Home.module.css'

export default function Home(props) {
  // JSON Array of objects
  // array will be the firebase data
  // display 3 products
  // add stripe
  // create payment button
  // api routes, ssr, isr (service side rendering, incremental static regeneration/rendering??)
  // getStaticPaths, getStaticPages
  // const productData = [1,2,3,4,5]
  // productData.map(item=>console.log(item))
  // use data coming in along with a component

  /* 
    SSG static site generation
    data + page component => html+css => edge server/cdn

  */

  const products = props.products

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

  return (
    <>
    <Head>
      <meta charset="UTF-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content="speck eyewear provides all kinds of glasses for everyone."/>
      <title>Storefront</title>

    </Head>
      <PageTitle title="Storefront" tagline="featured products"/>
      <main className={store}>
        <div className={productsList}>
          {products.map(product=><ProductCard product={product} key={product.key} />)}
        </div>
      </main>
      {/* <ul>
        {productData.map(product=><ListItem key={product} number={product}/>)}
      </ul> */}
    </>
  )

  /*
      getStaticProps => server Node.js
  */

  function ListItem({number, props}) {
    return <li>{number}</li>
  }
  
}

export async function getStaticProps() {
  // node.js code ... web apis filesystem read writes fetch
  // nextjs    five top level fetch api
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