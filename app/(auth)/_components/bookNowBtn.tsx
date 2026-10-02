'use client'

import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react';
import Link from 'next/link'

const BookNowBtn = () => {
    const {status} = useSession();

    return (
        <Link href={status === 'authenticated' ? '/book-now' : '/login'}>
            <Button className='px-8 py-4.5 bg-orange-600 hover:bg-orange-700 rounded-full'>Book Now</Button>
        </Link>
    )
}

export default BookNowBtn