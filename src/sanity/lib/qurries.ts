

export const allproducts = `
 *[_type == "product"]{
  _id,
  name,
  title,
  price,
  description,
  "imageUrl": productImage.asset->url,
  slug
}

`;