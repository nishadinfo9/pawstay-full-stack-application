'use client'

import { Button } from '@/components/ui/button'
import { useAuth, useClerk } from '@clerk/nextjs'

export const LogOutButton = () => {
  const { signOut } = useClerk()
  const { userId } = useAuth()

  if (!userId) return null

  return (
    <Button variant={'destructive'} onClick={() => signOut({ redirectUrl: '/login' })}>Log out</Button>
  )

}