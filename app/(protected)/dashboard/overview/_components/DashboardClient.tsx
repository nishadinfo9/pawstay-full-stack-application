"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "./app-sidebar"

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

import AvatarDropdown from "./avatar"

type Profile = {
  id: string
  fullName: string
  email: string
  avatar: string | null
}

type DashboardClientProps = {
  profilePromise: Promise<Profile>
  children: React.ReactNode
}

export default function DashboardClient({
  profilePromise,
  children,
}: DashboardClientProps) {
  const router = useRouter()

  const profile = use(profilePromise)
  console.log(profile)

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">

          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />

            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />

            <Breadcrumb>
              <BreadcrumbList>

                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard/overview">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Overview
                  </BreadcrumbPage>
                </BreadcrumbItem>

              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-3">

            <AvatarDropdown
              imageUrl={profile.avatar ?? undefined}
              name={profile.fullName}
              email={profile.email}
            />

          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}