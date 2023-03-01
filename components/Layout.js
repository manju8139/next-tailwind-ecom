import { Store } from '@/utils/Strore';
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function Layout({ title, children }) {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    return (
        <>
            <Head>
                <title>{title ? title + ' - ecom' : 'ecom'}</title>
                <meta name="description" content="ecommerce website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
                        <Link href="/" ><span className='text-lg font-bold'>ecom</span></Link>
                        <div>
                            <Link href="/cart"><span className='p-2'>Cart
                                {cart.cartItems.length > 0 && (
                                    <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </span>
                                )}
                            </span></Link>
                            <Link href="/login"><span className='p-2'>Login</span></Link>
                        </div>

                    </nav>
                </header>
                <main className='container m-auto mt-4 px-4'>
                    {children}
                </main>
                <footer className='flex justify-center items-center h-10 shadow-inner'>
                    <p>copyrights 2023</p>
                </footer>
            </div>
        </>
    )
}
