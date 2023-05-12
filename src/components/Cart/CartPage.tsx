import React from 'react'
import CartItem from './CartItem'
import Product from '../../models/product'
interface CartPageProps {
  cartItems: Product[]
  addToCart: (clickedItem: Product) => void
  removeFromCart: (id: number) => void
}

const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  //   const total = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0)
  const calculateTotal = (items: Product[]) =>
    items.reduce((ack: number, item) => ack + item.quantity * item.price, 0)
  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Cart</h1>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='px-4 py-2'>number</th>
            <th className='px-4 py-2'>Title</th>
            <th className='px-4 py-2'>Description</th>
            <th className='px-4 py-2'>Quantity</th>
            <th className='px-4 py-2'>Price</th>
            <th className='px-4 py-2'>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className='text-right font-bold px-4 py-2'>
              Total:
            </td>
            <td className='font-bold px-4 py-2'>
              {calculateTotal(cartItems).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default CartPage
