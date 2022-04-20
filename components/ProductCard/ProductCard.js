import React from 'react';
import Image from 'next/image'
import {productCard, name, price, description} from './styles.module.scss'

function ProductCard ({children, product, ...props})  {
  const {productName, productPrice, productDescription, imageUrl, key}= {...product}
  return (
  <aside className={productCard}>
    <header>
      <Image
        src={imageUrl}
        alt={productName}
        width={420}
        height={280}
        quality={50}
      />
      
    </header>
    <h2 className={name}>{productName}</h2>
    <p className={price}>${productPrice}</p>
    <p className={description}>{productDescription}</p>
    <footer>
      <form action="api/checkout" method="POST">
        <input type="hidden" name="uid" value={key}/>
        <button type="submit">Buy Now</button>
      </form>
    </footer>
  </aside>
  )
}

export default ProductCard