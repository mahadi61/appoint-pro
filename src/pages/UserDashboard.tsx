import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserSidebar } from "@/components/dashboard/UserSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  MapPin, 
  Clock,
  Plus,
  Bell,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function UserDashboard() {
  const isMobile = useIsMobile()
  
  const upcomingAppointments = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:00 AM",
      service: "Health Consultation",
      provider: "Dr. Smith",
      status: "confirmed",
      location: "Main Office"
    },
    {
      id: 2,
      date: "2024-01-20",
      time: "02:30 PM",
      service: "Follow-up",
      provider: "Dr. Johnson",
      status: "pending",
      location: "Downtown Branch"
    }
  ]

  const recentAppointments = [
    {
      id: 3,
      date: "2024-01-10",
      service: "Consultation",
      provider: "Dr. Wilson",
      status: "completed",
      rating: 5
    },
    {
      id: 4,
      date: "2024-01-05",
      service: "Check-up",
      provider: "Dr. Brown",
      status: "completed",
      rating: 4
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'completed': return 'bg-blue-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <UserSidebar />
        
        <main className="flex-1">
          {/* Header */}
          <header className="h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 lg:px-6 h-full">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">My Dashboard</h1>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Welcome back, John!
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button size="sm" className="hidden sm:flex">
                  <Plus className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
                <Button size="icon" variant="outline" className="relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-4 lg:p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Upcoming</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Addresses</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <MapPin className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Appointments
                  </CardTitle>
                  <CardDescription>
                    Your scheduled appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 rounded-lg border bg-muted/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{appointment.service}</div>
                          <Badge className={`${getStatusColor(appointment.status)} text-white text-xs`}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.date} at {appointment.time}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {appointment.location}
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm font-medium">{appointment.provider}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="destructive">Cancel</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button className="w-full" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Book New Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                  <CardDescription>
                    Your appointment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 rounded-lg border bg-muted/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{appointment.service}</div>
                          <Badge className={`${getStatusColor(appointment.status)} text-white text-xs`}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.date} - {appointment.provider}
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(appointment.rating)}
                          <span className="text-xs text-muted-foreground ml-2">
                            ({appointment.rating}/5)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions - Mobile Friendly */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button className="justify-start" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Manage Addresses
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}