async function getProduct(uid) {
  const res = await fetch(`https://speck-24af8-default-rtdb.firebaseio.com/products/${uid}.json`)
  const product = await res.json()
  return product
}

export {getProduct}