class Product {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string

  constructor(
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string
  ) {
    this.id = id
    this.title = title
    this.price = price
    this.category = category
    this.description = description
    this.image = image
  }
}

export default Product
