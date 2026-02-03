import { Link, useNavigate } from "react-router-dom";
import { Diamond, Bell, Menu, X, Search, User, Settings, LogOut, Shield, PanelLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Navbar = ({ sidebarOpen, onToggleSidebar }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Diamond className="h-6 w-6 text-champagne" />
            <span className="font-display text-lg font-semibold text-primary">Reyu Diamond</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-medium">3</span>
            </Button>
            <button
              onClick={onToggleSidebar}
              className="p-2 text-primary hover:text-champagne transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:flex fixed top-0 left-64 right-0 z-30 h-16 items-center justify-between px-6 bg-card border-b border-border">
        {/* Left: Sidebar Toggle + Search */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search diamonds, listings, deals..." 
              className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Right: User Dropdown + Verified Badge + Notifications */}
        <div className="flex items-center gap-3">
          {/* Mock User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors border border-border">
                <Diamond className="h-4 w-4 text-champagne" />
                <span className="text-sm text-muted-foreground">Mock:</span>
                <span className="text-sm font-medium text-primary">Verified User</span>
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

          {/* Verified Badge */}
          <Badge className="bg-accent text-accent-foreground px-3 py-1 font-medium">
            Verified
          </Badge>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive rounded-full text-[11px] text-destructive-foreground flex items-center justify-center font-semibold">3</span>
          </Button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
