import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { profileActions } from "./profile/actions"
import DashboardClient from "./overview/_components/DashboardClient"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  console.log('session', session)

  if (!session?.user?.id) {
    return null
  }

  return (
    <DashboardClient>
      {children}
    </DashboardClient>
  )
}