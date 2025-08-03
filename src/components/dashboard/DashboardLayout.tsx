import { ReactNode, useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Button } from "@/components/ui/button"
import { Bell, Search, Settings, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isMobile = useIsMobile()
  const { toast } = useToast()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "Search Initiated",
        description: `Searching for: "${searchQuery}"`,
      })
      // In a real app, this would trigger search functionality
      console.log("Searching for:", searchQuery)
    }
  }

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications",
    })
    // In a real app, this would open a notifications panel
  }

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Opening settings panel",
    })
    // In a real app, this would open settings
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-14 sm:h-16 border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
              <div className="flex items-center justify-between h-full px-4 sm:px-6">
                <div className="flex items-center gap-2 sm:gap-4 flex-1">
                  <SidebarTrigger />
                  
                  {/* Desktop Search */}
                  <div className="hidden lg:block flex-1 max-w-md">
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search appointments, users, services..."
                          className="pl-10 bg-background/50"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>

                  {/* Mobile Search Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative"
                    onClick={handleNotificationClick}
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 text-xs flex items-center justify-center bg-destructive p-0">
                      3
                    </Badge>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleSettingsClick}
                  >
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Mobile Search Sheet */}
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetContent side="top" className="h-auto">
                <div className="flex items-center gap-3 pt-6">
                  <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search appointments, users, services..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </form>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 overflow-auto">
              {(title || subtitle) && (
                <div className="mb-6 sm:mb-8">
                  {title && (
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-muted-foreground text-base sm:text-lg">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
              
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}