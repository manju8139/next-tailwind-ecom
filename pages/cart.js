import Layout from '@/components/Layout';
import { Store } from '@/utils/Strore'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic';

function CartScreen() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems }
    } = state;
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    }
    const updateCartHandler = (item, qty) => {
        const quantity = Number(qty);
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
    }
    return (
        <Layout title="Shopping Cart">
            <h1 className='mb-4 textxl'>Shopping Cart</h1>
            {
                cartItems.length === 0 ?
                    (
                        <div>
                            Cart is empty. <Link href="/">Go shopping</Link>
                        </div>
                    ) : (
                        <div className='grid md:grid-cols-4 md:gap-5'>
                            <div className='overflow-x-auto md:col-span-3'>
                                <table className='min-w-full'>
                                    <thead className='border-b'>
                                        <tr>
                                            <th className='px-5 text-left'>Item</th>
                                            <th className='p-5 text-right'>Quantity</th>
                                            <th className='p-5 text-right'>Price</th>
                                            <th className='p-5'>Action</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.slug} className='border-b'>
                                                <td>
                                                    <Link href={`/product/${item.slug}`}>
                                                        <span className='flex items-center'>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}>

                                                        </Image>
                                                        
                                                        &nbsp;
                                                    {item.name}
                                                    </span>
                                                    </Link>
                                                   
                                                </td>
                                                <td className='p-5 text-right'>
                                                    <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                                <td className='p-5 text-right'>Rs. {item.price}</td>
                                                <td className='p-5 text-center'>
                                                    <button onClick={() => removeItemHandler(item)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='card p-5'>
                                <ul>
                                    <li>
                                        <div className='pb-3 text-xl'>
                                            sub total ({cartItems.reduce((a, c) => a + c.quantity, 0)})
                                            {' '}
                                            : Rs
                                            {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                        </div>
                                    </li>
                                    <li>
                                        <button className='primary-button w-full' onClick={() => router.push('login?redirect=/shipping')}>checkout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
            }
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })




