import React from 'react'
import RoomForm from './form/room-form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const RoomPage = async () => {
  const session = await getServerSession(authOptions)
  if (session?.user.role !== 'admin') {
    redirect('/unauthorized')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <RoomForm />
    </div>
  )
}

export default RoomPage