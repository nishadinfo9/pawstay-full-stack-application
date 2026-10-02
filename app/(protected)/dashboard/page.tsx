"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter()

  const { status, data } = useSession()
  const role = data?.user.role
  console.log({ status, data })


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

export default Dashboard