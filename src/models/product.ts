class Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  quantity: number

  constructor(
    id: number,
    title: string,
    price: number,
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
    this.quantity = 0
  }
}

export default Product
