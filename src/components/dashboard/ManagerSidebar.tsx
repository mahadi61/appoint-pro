import { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
  Calendar,
  Users,
  Settings,
  BarChart3,
  FileText,
  Ticket,
  Building2,
  ChevronDown,
  LogOut,
  User,
  Globe
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

const managerMenuItems = [
  {
    title: "Dashboard",
    url: "/manager",
    icon: BarChart3,
  },
  {
    title: "Appointments",
    url: "/manager/appointments",
    icon: Calendar,
    badge: "5"
  },
  {
    title: "Users",
    url: "/manager/users",
    icon: Users,
  },
  {
    title: "Services",
    url: "/manager/services",
    icon: Building2,
  },
  {
    title: "Support Tickets",
    url: "/manager/tickets",
    icon: Ticket,
    badge: "2"
  },
  {
    title: "Reports",
    url: "/manager/reports",
    icon: FileText,
  },
  {
    title: "Web Pages",
    url: "/manager/pages",
    icon: Globe,
  },
  {
    title: "Profile",
    url: "/manager/profile",
    icon: User,
  },
]

export function ManagerSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const currentPath = location.pathname
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    setTimeout(() => {
      navigate("/")
    }, 1000)
  }

  const handleProfileClick = () => {
    navigate("/manager/profile")
  }
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `${isActive 
      ? "bg-primary/20 text-primary border-r-2 border-primary" 
      : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
    } transition-all duration-200`

  return (
    <Sidebar className="w-64 lg:w-72 bg-gradient-sidebar border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">AppointPro</h2>
            <Badge className="bg-success text-xs">Manager</Badge>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Manager Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managerMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="w-5 h-5" />
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 p-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Manager User</div>
                <div className="text-xs text-muted-foreground">Manager</div>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}