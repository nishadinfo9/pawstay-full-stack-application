'use client'

import { AppSidebar } from "./dashboard/_components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AvatarDropdown from "./dashboard/_components/avatar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


function Dashboard({children}: {children: React.ReactNode}) {
  const router = useRouter()

    const session = useSession()

  if (!session?.status || session.status === "unauthenticated") {
    router.push("/login")
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">

          {/* Left side */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />

            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Pet Hostel
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* <AvatarDropdown
              imageUrl={user.imageUrl}
              name={user.fullName ?? user.firstName ?? "User"}
              email={user.primaryEmailAddress?.emailAddress}
            /> */}

          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard