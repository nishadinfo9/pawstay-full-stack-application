import { profileActions } from "./actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { makeCapitalName } from "@/utils/makeCapitalName"

const ProfilePage = async () => {
  const profile = await profileActions()

  const initials = makeCapitalName(profile.fullName)

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Profile
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your account information and profile details.
          </p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your account information.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatar || ''} alt={profile.fullName} />
                <AvatarFallback className="text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  {profile.fullName}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {profile.email}
                </p>

                <Badge variant="secondary" className="capitalize">
                  {profile.role}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Details */}
            <div className="grid gap-6 sm:grid-cols-2">

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Full Name
                </p>

                <p className="font-medium">
                  {profile.fullName}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p className="font-medium">
                  {profile.email}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Account Role
                </p>

                <p>
                  <Badge variant="outline" className="capitalize">
                    {profile.role}
                  </Badge>
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default ProfilePage