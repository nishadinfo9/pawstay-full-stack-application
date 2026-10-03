"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import { makeCapitalName } from "@/utils/makeCapitalName"
import { LogOut, Settings, User } from "lucide-react"
import Link from "next/link"

type Profile = {
    id: string
    fullName: string
    email: string
    avatar: string | null
}

const navItem = [
    { name: 'Profile', path: '/dashboard/profile', icon: <User /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings /> },
]

export default function AvatarDropdownClient({ profile }: { profile: Profile }) {
    const handleLogout = () => {
        signOut({
            redirect: true,
            callbackUrl: "/login",
        });
    };

    const { avatar, email, fullName } = profile

    const initials = makeCapitalName(fullName)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                    >
                        <Avatar className="size-9">
                            <AvatarImage src={avatar || ''} alt={fullName} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                    </Button>
                }
            />

            <DropdownMenuContent
                align="end"
                className="w-64"
            >
                {/* User info */}
                <div className="flex items-center gap-3 p-2">
                    <Avatar className="size-10">
                        <AvatarImage src={avatar || ''} alt={fullName} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                            {fullName}
                        </p>

                        {email && (
                            <p className="truncate text-xs text-muted-foreground">
                                {email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {navItem.map((item) => (
                        <Link key={item.name} href={item.path}>
                            <DropdownMenuItem>
                                {item.icon}
                                {item.name}
                            </DropdownMenuItem>
                        </Link>
                    ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    variant="destructive"
                    onClick={handleLogout}
                >
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}