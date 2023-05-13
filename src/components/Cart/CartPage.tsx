import React from 'react'
import CartItem from './CartItem'
import Product from '../../models/product'
interface CartPageProps {
  cartItems: Product[]
  increaseProductQty: (clickedItem: Product) => void
  decreaceProductQty: (id: number) => void
  handleRemoveFromCart: (id: number) => void
}

const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  increaseProductQty,
  decreaceProductQty,
  handleRemoveFromCart,
}) => {
  //   const total = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0)
  const calculateTotal = (items: Product[]) =>
    items.reduce((ack: number, item) => ack + item.quantity * item.price, 0)
  return (
    <div className='flex-wrap w-full mx-auto'>
      <div className='flex-wrap w-full px-5 pt-10'>
        <table className='table-auto  min-w-full px-5 border-collapse border border-slate-400 '>
          <thead className='bg-gray-400'>
            <tr>
              <th className='px-4 py-2 font-normal sm:text-base text-white '>
                number
              </th>
              <th className='px-4 py-2 font-normal text-white'>Title</th>
              <th className='px-4 py-2 font-normal text-white'>Description</th>
              <th className='px-4 py-2 font-normal text-white'>Quantity</th>
              <th className='px-4 py-2 font-normal text-white'>Price</th>
              <th className='px-4 py-2 font-normal text-white'>Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody className=' [&>*:nth-child(odd)]:bg-gray-200'>
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                increaseProductQty={increaseProductQty}
                decreaceProductQty={decreaceProductQty}
                handleRemoveFromCart={handleRemoveFromCart}
                index={index}
              />
            ))}
          </tbody>
          <tfoot className='h-20'>
            <tr>
              <td colSpan={5} className='text-left ps-16 '>
                Total:
              </td>

              <td className=' text-center'>
                {calculateTotal(cartItems).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default CartPage
