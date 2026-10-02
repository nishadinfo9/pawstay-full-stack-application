import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href={'/'}>
            <h2 className='text-2xl font-bold'>Pow
                <span className='text-orange-600'>Stay</span>
            </h2>
        </Link>
    )
}

export default Logo