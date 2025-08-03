import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/dashboard/AdminSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Users, 
  Building2, 
  TrendingUp,
  DollarSign,
  Clock,
  Ticket,
  BarChart3
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function AdminDashboard() {
  const isMobile = useIsMobile()
  
  const stats = [
    {
      title: "Total Appointments",
      value: "245",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Active Managers",
      value: "8",
      change: "+2",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Services",
      value: "32",
      change: "+5",
      icon: Building2,
      color: "text-purple-600"
    },
    {
      title: "Revenue",
      value: "$12,450",
      change: "+8.2%",
      icon: DollarSign,
      color: "text-orange-600"
    }
  ]

  const recentActivities = [
    { type: "appointment", message: "New appointment scheduled", time: "2 mins ago" },
    { type: "manager", message: "Manager role assigned to John", time: "15 mins ago" },
    { type: "service", message: "New service category added", time: "1 hour ago" },
    { type: "ticket", message: "Support ticket resolved", time: "2 hours ago" }
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <main className="flex-1">
          {/* Header */}
          <header className="h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 lg:px-6 h-full">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">Admin Dashboard</h1>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Manage your appointment system
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="hidden sm:flex">
                  <Clock className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-4 lg:p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create New Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Add Manager
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Building2 className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Ticket className="w-4 h-4 mr-2" />
                    View Support Tickets
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Latest system activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {activity.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile-optimized bottom section */}
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>
                    Current status of your appointment system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">System Status</span>
                      <Badge className="bg-green-500">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Database</span>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">API Status</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}