import { Link } from "react-router-dom";
import { Diamond, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Navbar = ({ sidebarOpen, onToggleSidebar }: NavbarProps) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Diamond className="h-6 w-6 text-champagne" />
          <span className="font-display text-lg font-semibold text-primary">Reyu Diamond</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-champagne rounded-full" />
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
  );
};

export default Navbar;
