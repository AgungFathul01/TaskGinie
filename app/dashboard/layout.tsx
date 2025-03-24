"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, Calendar, BarChart3, CreditCard, LogOut, Settings, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        {/* Sidebar */}
        <Sidebar className="border-r bg-gradient-to-b from-background to-background/80 backdrop-blur-sm md:w-64">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-primary/20 blur-sm"></div>
                <Brain className="relative h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                TaskGenie
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <div className="mb-4">
              <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Main</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  className="relative group flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-primary/10"
                >
                  <Link href="/dashboard">
                    <div className="absolute left-0 h-full w-1 rounded-r-full bg-primary opacity-0 transition-opacity group-[.active]:opacity-100"></div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary/80 group-hover:text-primary"
                    >
                      <rect x="3" y="3" width="7" height="9"></rect>
                      <rect x="14" y="3" width="7" height="5"></rect>
                      <rect x="14" y="12" width="7" height="9"></rect>
                      <rect x="3" y="16" width="7" height="5"></rect>
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/calendar"}
                  className="relative group flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-primary/10"
                >
                  <Link href="/dashboard/calendar">
                    <div className="absolute left-0 h-full w-1 rounded-r-full bg-primary opacity-0 transition-opacity group-[.active]:opacity-100"></div>
                    <Calendar className="h-5 w-5 text-primary/80 group-hover:text-primary" />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/analytics"}
                  className="relative group flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-primary/10"
                >
                  <Link href="/dashboard/analytics">
                    <div className="absolute left-0 h-full w-1 rounded-r-full bg-primary opacity-0 transition-opacity group-[.active]:opacity-100"></div>
                    <BarChart3 className="h-5 w-5 text-primary/80 group-hover:text-primary" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="mt-8 mb-4">
              <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account</h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/subscription"}
                  className="relative group flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-primary/10"
                >
                  <Link href="/dashboard/subscription">
                    <div className="absolute left-0 h-full w-1 rounded-r-full bg-primary opacity-0 transition-opacity group-[.active]:opacity-100"></div>
                    <CreditCard className="h-5 w-5 text-primary/80 group-hover:text-primary" />
                    <span>Subscription</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-6">
            <div className="flex items-center gap-4">
              <Avatar className="border-2 border-primary/20">
                <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name || "Guest User"}</span>
                <span className="text-xs text-muted-foreground">{user?.email || "guest@example.com"}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto rounded-full hover:bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-auto w-full max-w-full">{children}</div>
      </div>
    </SidebarProvider>
  )
}

