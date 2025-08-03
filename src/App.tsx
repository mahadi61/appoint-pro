import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import ApiCredentials from "./pages/ApiCredentials";
import AppointmentManagement from "./pages/AppointmentManagement";
import Dashboard from "./pages/Dashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import NotFound from "./pages/NotFound";
import ProfileSettings from "./pages/ProfileSettings";
import RoleManagement from "./pages/RoleManagement";
import ServiceAreas from "./pages/ServiceAreas";
import ServiceLayout from "./pages/ServiceLayout";
import SystemSettings from "./pages/SystemSettings";
import UserDashboard from "./pages/UserDashboard";
import UserManagement from "./pages/UserManagement";
import WebsiteSettings from "./pages/WebsiteSettings";
import BlogPage from "./pages/websitePages/BlogPage";
import FaqPage from "./pages/websitePages/FaqPage";
import Home from "./pages/websitePages/Home";
import MainLayout from "./pages/websitePages/MainLayout";
import PrivacyPolicy from "./pages/websitePages/PrivacyPolicy";
import SingleCategory from "./pages/websitePages/SingleCategory";
import Terms from "./pages/websitePages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* frontend Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route
              path="single-category/:category"
              element={<SingleCategory />}
            />
            <Route path="blog-page" element={<BlogPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="faq" element={<FaqPage />} />
          </Route>
          <Route path="/service" element={<ServiceLayout></ServiceLayout>} />

          {/* Role-based Dashboard Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/appointments"
            element={<AppointmentManagement />}
          />
          <Route path="/admin/managers" element={<UserManagement />} />
          <Route path="/admin/services" element={<ServiceAreas />} />
          <Route path="/admin/tickets" element={<AppointmentManagement />} />
          <Route path="/admin/reports" element={<Dashboard />} />
          <Route path="/admin/pages" element={<WebsiteSettings />} />
          <Route path="/admin/slots" element={<AppointmentManagement />} />
          <Route path="/admin/profile" element={<ProfileSettings />} />

          <Route path="/manager" element={<ManagerDashboard />} />
          <Route
            path="/manager/appointments"
            element={<AppointmentManagement />}
          />
          <Route path="/manager/users" element={<UserManagement />} />
          <Route path="/manager/services" element={<ServiceAreas />} />
          <Route path="/manager/tickets" element={<AppointmentManagement />} />
          <Route path="/manager/reports" element={<Dashboard />} />
          <Route path="/manager/pages" element={<WebsiteSettings />} />
          <Route path="/manager/profile" element={<ProfileSettings />} />

          <Route path="/user" element={<UserDashboard />} />
          <Route
            path="/user/appointments"
            element={<AppointmentManagement />}
          />
          <Route path="/user/addresses" element={<ProfileSettings />} />
          <Route path="/user/support" element={<AppointmentManagement />} />
          <Route path="/user/profile" element={<ProfileSettings />} />

          {/* Legacy Dashboard Routes - Redirect to role-based */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/appointments"
            element={<AppointmentManagement />}
          />
          <Route path="/dashboard/users" element={<UserManagement />} />
          <Route path="/dashboard/managers" element={<UserManagement />} />
          <Route
            path="/dashboard/my-appointments"
            element={<AppointmentManagement />}
          />
          <Route path="/dashboard/addresses" element={<ProfileSettings />} />
          <Route
            path="/dashboard/support"
            element={<AppointmentManagement />}
          />
          <Route path="/dashboard/profile" element={<ProfileSettings />} />
          <Route path="/dashboard/services" element={<ServiceAreas />} />
          <Route
            path="/dashboard/tickets"
            element={<AppointmentManagement />}
          />
          <Route path="/dashboard/reports" element={<Dashboard />} />
          <Route path="/dashboard/pages" element={<WebsiteSettings />} />
          <Route path="/dashboard/slots" element={<AppointmentManagement />} />

          {/* Super Admin Routes */}
          <Route path="/dashboard/roles" element={<RoleManagement />} />
          <Route
            path="/dashboard/website-settings"
            element={<WebsiteSettings />}
          />
          <Route
            path="/dashboard/api-credentials"
            element={<ApiCredentials />}
          />
          <Route path="/dashboard/service-areas" element={<ServiceAreas />} />
          <Route path="/dashboard/system" element={<SystemSettings />} />

          {/* Fallback Admin Route */}
          <Route path="/administrator" element={<AdminDashboard />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
