import { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
  Calendar,
  Users,
  Settings,
  BarChart3,
  FileText,
  Ticket,
  Shield,
  MapPin,
  Clock,
  CreditCard,
  UserCheck,
  Building2,
  MessageSquare,
  Globe,
  Database,
  Key,
  Crown,
  ChevronDown,
  LogOut,
  User
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
  SidebarTrigger,
  useSidebar,
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

// Mock user role - in real app this would come from context/auth
const currentUserRole = "super_admin" // super_admin, admin, manager, user

const menuItems = {
  super_admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "User Management",
      url: "/dashboard/users",
      icon: Users,
      badge: "12"
    },
    {
      title: "Role Management",
      url: "/dashboard/roles",
      icon: Shield,
    },
    {
      title: "Website Settings",
      url: "/dashboard/website-settings",
      icon: Settings,
    },
    {
      title: "API Credentials",
      url: "/dashboard/api-credentials",
      icon: Key,
    },
    {
      title: "Service Areas",
      url: "/dashboard/service-areas",
      icon: MapPin,
    },
    {
      title: "System Settings",
      url: "/dashboard/system",
      icon: Database,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Appointments",
      url: "/dashboard/appointments",
      icon: Calendar,
      badge: "8"
    },
    {
      title: "Managers",
      url: "/dashboard/managers",
      icon: UserCheck,
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: Building2,
    },
    {
      title: "Support Tickets",
      url: "/dashboard/tickets",
      icon: Ticket,
      badge: "3"
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: FileText,
    },
    {
      title: "Web Pages",
      url: "/dashboard/pages",
      icon: Globe,
    },
    {
      title: "Time Slots",
      url: "/dashboard/slots",
      icon: Clock,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
    },
  ],
  manager: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Appointments",
      url: "/dashboard/appointments",
      icon: Calendar,
      badge: "5"
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: Building2,
    },
    {
      title: "Support Tickets",
      url: "/dashboard/tickets",
      icon: Ticket,
      badge: "2"
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: FileText,
    },
    {
      title: "Web Pages",
      url: "/dashboard/pages",
      icon: Globe,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
    },
  ],
  user: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "My Appointments",
      url: "/dashboard/my-appointments",
      icon: Calendar,
      badge: "2"
    },
    {
      title: "My Addresses",
      url: "/dashboard/addresses",
      icon: MapPin,
    },
    {
      title: "Support",
      url: "/dashboard/support",
      icon: MessageSquare,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
    },
  ],
}

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"
  
  const userMenuItems = menuItems[currentUserRole as keyof typeof menuItems] || []

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    // In a real app, this would clear auth tokens and redirect
    setTimeout(() => {
      navigate("/")
    }, 1000)
  }

  const handleProfileClick = () => {
    navigate("/dashboard/profile")
  }
  
  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `${isActive 
      ? "bg-primary/20 text-primary border-r-2 border-primary" 
      : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
    } transition-all duration-200`

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-gradient-primary'
      case 'admin': return 'bg-warning'
      case 'manager': return 'bg-success'
      default: return 'bg-secondary'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin'
      case 'admin': return 'Admin'
      case 'manager': return 'Manager'
      default: return 'User'
    }
  }

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-gradient-sidebar border-r border-border/40 transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border/40 p-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">AppointPro</h2>
              <Badge className={`${getRoleColor(currentUserRole)} text-xs`}>
                {getRoleLabel(currentUserRole)}
              </Badge>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        {!collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 p-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">
                    {getRoleLabel(currentUserRole)}
                  </div>
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
        )}
        {collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <User className="w-5 h-5" />
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
        )}
      </SidebarFooter>
    </Sidebar>
  )
}