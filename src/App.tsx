import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OTPSent from "./pages/auth/OTPSent";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";
import ResendOTP from "./pages/auth/ResendOTP";

// Dashboard & User Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import KYC from "./pages/KYC";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";

// Marketplace & Trading Pages
import Marketplace from "./pages/Marketplace";
import Inventory from "./pages/Inventory";
import AddInventory from "./pages/AddInventory";
import MyListings from "./pages/MyListings";
import CreateListing from "./pages/CreateListing";
import Preferences from "./pages/Preferences";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Index />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-sent" element={<OTPSent />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/resend-otp" element={<ResendOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Dashboard & User */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/kyc" element={<KYC />} />
          
          {/* Marketplace & Trading */}
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/add" element={<AddInventory />} />
          <Route path="/listings" element={<MyListings />} />
          <Route path="/listings/create" element={<CreateListing />} />
          <Route path="/preferences" element={<Preferences />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
