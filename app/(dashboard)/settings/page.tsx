"use client";   
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs"

export default function SettingsPage() {
  const { user } = useUser()
  const firstName = user?.firstName || ""
  const lastName = user?.lastName || ""
  const email = user?.emailAddresses?.[0]?.emailAddress || ""

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-8">
            {/* Profile Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium">Profile</h2>
                <p className="text-sm text-muted-foreground">
                  Update your profile information
                </p>
              </div>
              <Separator />
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>
                      {firstName[0]}
                      {lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                </div>
                <div className="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue={firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue={lastName} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={email} disabled />
                    <p className="text-xs text-muted-foreground">
                      Contact support to change your email address
                    </p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us a little bit about yourself"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium">Preferences</h2>
                <p className="text-sm text-muted-foreground">
                  Configure how you want to use the application
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications about your applications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark theme
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Weekly Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      Get a weekly summary of your job search activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* Account Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-destructive">Danger Zone</h2>
                <p className="text-sm text-muted-foreground">
                  Proceed with caution. These actions are irreversible.
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex flex-col justify-between rounded-lg border border-destructive/20 p-4 md:flex-row md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-medium">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
                <div className="flex flex-col justify-between rounded-lg border border-destructive/20 p-4 md:flex-row md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-medium">Export Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Download all your data in a ZIP file
                    </p>
                  </div>
                  <Button variant="outline">Export Data</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
