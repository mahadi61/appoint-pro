import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  MoreHorizontal,
  MapPin,
  Phone
} from "lucide-react"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Appointments",
      value: "2,847",
      change: "+12.5%",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.2%",
      icon: Users,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Total Revenue",
      value: "$45,678",
      change: "+15.3%",
      icon: DollarSign,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Growth Rate",
      value: "23.5%",
      change: "+5.1%",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ]

  const recentAppointments = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      service: "Home Cleaning",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed",
      location: "Downtown Area",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      customerName: "Mike Chen",
      service: "AC Maintenance",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "pending",
      location: "Business District",
      phone: "+1 (555) 987-6543"
    },
    {
      id: 3,
      customerName: "Emily Davis",
      service: "Plumbing Repair",
      date: "2024-01-16",
      time: "9:00 AM",
      status: "in-progress",
      location: "Residential Area",
      phone: "+1 (555) 456-7890"
    },
    {
      id: 4,
      customerName: "James Wilson",
      service: "Electrical Work",
      date: "2024-01-16",
      time: "11:30 AM",
      status: "completed",
      location: "Industrial Zone",
      phone: "+1 (555) 321-0987"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success/20 text-success border-success/30">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Pending</Badge>
      case "in-progress":
        return <Badge className="bg-primary/20 text-primary border-primary/30">In Progress</Badge>
      case "completed":
        return <Badge className="bg-muted text-muted-foreground">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />
      case "in-progress":
        return <AlertCircle className="w-4 h-4 text-primary" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-muted-foreground" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <DashboardLayout 
      title="Dashboard Overview" 
      subtitle="Welcome back! Here's what's happening with your appointment system today."
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-gradient-card border-border/40 hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-success font-medium">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card className="p-6 bg-gradient-card border-border/40">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Appointments</h3>
            <p className="text-sm text-muted-foreground">Latest appointments and their current status</p>
          </div>
          <Button variant="default" className="gap-2">
            <Plus className="w-4 h-4" />
            New Appointment
          </Button>
        </div>

        <div className="space-y-4">
          {recentAppointments.map((appointment) => (
            <div 
              key={appointment.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-card/30 hover:bg-card/50 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  {getStatusIcon(appointment.status)}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{appointment.customerName}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.service}</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">{appointment.date}</p>
                  <p className="text-xs text-muted-foreground">{appointment.time}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {appointment.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {appointment.phone}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(appointment.status)}
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline">
            View All Appointments
          </Button>
        </div>
      </Card>
    </DashboardLayout>
  )
}

export default Dashboard