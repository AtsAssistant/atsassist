"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  CalendarDays,
  FileArchive,
  Settings,
  User,
} from "lucide-react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Applied Jobs",
    href: "/applied-jobs",
    icon: Briefcase,
  },
  {
    title: "Call Letters",
    href: "/call-letters",
    icon: FileText,
  },
  {
    title: "Interviews",
    href: "/interviews",
    icon: CalendarDays,
  },
  {
    title: "Resume Versions",
    href: "/resumes",
    icon: FileArchive,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const

interface NavItemProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  isActive?: boolean
}

function NavItem({ href, icon: Icon, children, isActive }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
          isActive ? "bg-accent" : "text-muted-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{children}</span>
      </Link>
    </li>
  )
}

function UserProfile() {
  const { user } = useUser()
  const firstName = user?.firstName || "User"
  const email = user?.emailAddresses?.[0]?.emailAddress || ""

  return (
    <div className="mt-auto border-t p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <User className="h-5 w-5" />
        </div>
        <div className="grid gap-0.5 text-sm">
          <div className="font-medium">Welcome, {firstName}</div>
          <div className="text-xs text-muted-foreground">{email}</div>
        </div>
      </div>
    </div>
  )
}

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { isLoaded } = useUser()

  if (!isLoaded) {
    return null
  }

  return (
    <Sidebar className={cn("flex flex-col", className)} {...props}>
      <SidebarHeader>
        <div className="flex h-16 items-center px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-2 text-lg font-semibold">ATS Assistant</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <nav className="grid gap-1 p-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              isActive={pathname === item.href}
            >
              {item.title}
            </NavItem>
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
