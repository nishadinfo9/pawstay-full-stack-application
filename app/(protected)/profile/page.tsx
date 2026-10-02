'use client'

import { useSession } from "next-auth/react"

const Profile = () => {
  const { status, data } = useSession()
  const role = data?.user.role


  if (role === "admin") {
    return <div>{data?.user.email} Admin Profile</div>
  }

  if (role === "customer") {
    return <div>{data?.user.email} Customer Profile</div>
  }
}

export default Profile