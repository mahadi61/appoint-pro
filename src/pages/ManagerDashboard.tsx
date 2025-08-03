import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ManagerSidebar } from "@/components/dashboard/ManagerSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Users, 
  Building2, 
  TrendingUp,
  Clock,
  Ticket,
  BarChart3,
  CheckCircle
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ManagerDashboard() {
  const isMobile = useIsMobile()
  
  const stats = [
    {
      title: "My Appointments",
      value: "42",
      change: "+5",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Users Managed",
      value: "28",
      change: "+3",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Services",
      value: "12",
      change: "+2",
      icon: Building2,
      color: "text-purple-600"
    },
    {
      title: "Completed Today",
      value: "8",
      change: "+100%",
      icon: CheckCircle,
      color: "text-orange-600"
    }
  ]

  const todayAppointments = [
    { time: "09:00 AM", client: "John Smith", service: "Consultation", status: "confirmed" },
    { time: "10:30 AM", client: "Sarah Wilson", service: "Follow-up", status: "in-progress" },
    { time: "02:00 PM", client: "Mike Johnson", service: "Assessment", status: "pending" },
    { time: "04:00 PM", client: "Emma Davis", service: "Review", status: "confirmed" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500'
      case 'in-progress': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ManagerSidebar />
        
        <main className="flex-1">
          {/* Header */}
          <header className="h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 lg:px-6 h-full">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">Manager Dashboard</h1>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Manage appointments and users
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
                      <span className="text-green-600">{stat.change}</span> from last week
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Today's Appointments
                  </CardTitle>
                  <CardDescription>
                    Your scheduled appointments for today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayAppointments.map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{appointment.time}</span>
                            <Badge className={`${getStatusColor(appointment.status)} text-white text-xs`}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{appointment.client}</p>
                          <p className="text-xs text-muted-foreground">{appointment.service}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common management tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Building2 className="w-4 h-4 mr-2" />
                    Update Services
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Ticket className="w-4 h-4 mr-2" />
                    Support Tickets
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>
                  Your management statistics this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-foreground">95%</div>
                    <p className="text-sm text-muted-foreground">Appointment Success Rate</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-foreground">4.8</div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-foreground">42</div>
                    <p className="text-sm text-muted-foreground">Appointments This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}