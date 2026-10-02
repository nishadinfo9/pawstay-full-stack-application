
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
import { makeCapitalName } from "@/utils/makeCapitalName"
import { LogOut, Settings, User } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"

type AvatarDropdownProps = {
  imageUrl?: string
  name: string
  email?: string
}

const navItem = [
  { name: 'Profile', path: '/dashboard/profile', icon: <User /> },
  { name: 'Settings', path: '/dashboard/settings', icon: <Settings /> },

]

async function AvatarDropdown({
  imageUrl,
  name,
  email,
}: AvatarDropdownProps) {

  const initials = makeCapitalName(name) //NH

  const handleLogout = () => {
    signOut({
      redirect: false,
      callbackUrl: "/login",
    })
  }


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
              <AvatarImage src={imageUrl} alt={name} />
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
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {name}
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

export default AvatarDropdown
