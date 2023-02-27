import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function Layout({ title, children }) {
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
                            <Link href="/cart"><span className='p-2'>Cart</span></Link>
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
