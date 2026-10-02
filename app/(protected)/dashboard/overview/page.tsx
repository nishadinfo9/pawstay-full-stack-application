"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Overview = () => {
  const router = useRouter()

  const { status, data } = useSession()
  const role = data?.user.role
  console.log(data?.user)


  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  if (role === "admin") {
    return <div>Admin Dashboard</div>
  }

  if (role === "customer") {
    return <div>Customer Dashboard</div>
  }

}

export default Overview