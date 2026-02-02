import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Diamond, 
  LayoutDashboard, 
  Package, 
  ListPlus, 
  Gavel, 
  Handshake, 
  Wallet, 
  MessageCircle, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  ChevronDown,
  TrendingUp,
  Heart,
  Shield
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: TrendingUp, label: "Marketplace", href: "/marketplace" },
  { icon: Heart, label: "Preferences", href: "/preferences" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: ListPlus, label: "My Listings", href: "/listings" },
  { icon: Gavel, label: "Bids", href: "/bids" },
  { icon: Handshake, label: "Deals", href: "/deals" },
  { icon: Wallet, label: "Payments", href: "/payments" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
];

export const bottomNavItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const Sidebar = ({ isOpen = true, onClose, isMobile = false }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => location.pathname === href;

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <Diamond className="h-8 w-8 text-champagne" />
          <span className="font-display text-xl font-semibold text-primary">Reyu Diamond</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-premium">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border">
        <ul className="space-y-1 mb-4">
          {bottomNavItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* User Menu */}
        {!isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-champagne/20 text-champagne font-semibold">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="font-medium text-primary text-sm">John Doe</div>
                  <div className="text-xs text-muted-foreground">Verified Trader</div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/kyc")}>
                <Shield className="h-4 w-4 mr-2" />
                KYC Verification
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/login")} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-champagne/20 text-champagne font-semibold">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-primary text-sm">John Doe</div>
              <div className="text-xs text-muted-foreground">Verified Trader</div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 flex-col bg-card border-r border-border z-40">
        <SidebarContent />
      </aside>
    );
  }

  // Mobile Sidebar with overlay
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border z-50 flex flex-col"
          >
            <SidebarContent />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
