import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Megaphone,
  Image as ImageIcon,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AdStatus = "pending" | "approved" | "rejected" | "active" | "expired";

interface Advertisement {
  id: string;
  title: string;
  mediaUrl: string;
  status: AdStatus;
  placement: string;
  startDate: string;
  endDate: string;
  rejectionReason?: string;
}

const mockAds: Advertisement[] = [
  { id: "AD-001", title: "Premium Round Brilliants Collection", mediaUrl: "/placeholder.svg", status: "active", placement: "Home", startDate: "2024-03-01", endDate: "2024-04-01" },
  { id: "AD-002", title: "Exclusive Emerald Cuts - 20% Off", mediaUrl: "/placeholder.svg", status: "pending", placement: "Marketplace", startDate: "2024-03-15", endDate: "2024-04-15" },
  { id: "AD-003", title: "New Arrivals: Fancy Color Diamonds", mediaUrl: "/placeholder.svg", status: "approved", placement: "Banner", startDate: "2024-03-20", endDate: "2024-04-20" },
  { id: "AD-004", title: "GIA Certified Diamonds Sale", mediaUrl: "/placeholder.svg", status: "rejected", placement: "Home", startDate: "2024-02-01", endDate: "2024-03-01", rejectionReason: "Image quality too low" },
  { id: "AD-005", title: "Valentine's Special Solitaires", mediaUrl: "/placeholder.svg", status: "expired", placement: "Marketplace", startDate: "2024-01-10", endDate: "2024-02-14" },
];

const statusConfig: Record<AdStatus, { label: string; className: string; icon: typeof Clock }> = {
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
  approved: { label: "Approved", className: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: CheckCircle },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
  active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle },
  expired: { label: "Expired", className: "bg-muted text-muted-foreground border-border", icon: AlertCircle },
};

const stats = [
  { label: "Total Ads", value: "5", color: "bg-primary/10 text-primary" },
  { label: "Active", value: "1", color: "bg-emerald-500/10 text-emerald-600" },
  { label: "Pending", value: "1", color: "bg-amber-500/10 text-amber-600" },
  { label: "Expired", value: "1", color: "bg-muted text-muted-foreground" },
];

const AdvertisementsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAds = mockAds.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
              Advertisements
            </h1>
            <p className="text-muted-foreground mt-1">
              Promote your listings or business to reach more buyers
            </p>
          </div>
          <Button
            onClick={() => navigate("/advertisements/create")}
            className="gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Create Advertisement
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold mt-1 ${stat.color.split(" ")[1]}`}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search advertisements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ads List */}
        {filteredAds.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Megaphone className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No advertisements yet</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">
              Start promoting your diamonds now!
            </p>
            <Button
              onClick={() => navigate("/advertisements/create")}
              className="mt-6 gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Your First Ad
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {filteredAds.map((ad, index) => {
              const config = statusConfig[ad.status];
              const StatusIcon = config.icon;
              return (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`border-border/50 transition-all hover:shadow-md ${ad.status === "expired" ? "opacity-60" : ""}`}>
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-center gap-4">
                        {/* Media Preview */}
                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-foreground truncate">
                              {ad.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`text-[10px] font-medium ${config.className}`}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {config.label}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                              <Megaphone className="h-3 w-3" />
                              {ad.placement}
                            </span>
                            <span>
                              {new Date(ad.startDate).toLocaleDateString()} — {new Date(ad.endDate).toLocaleDateString()}
                            </span>
                          </div>

                          {ad.status === "rejected" && ad.rejectionReason && (
                            <p className="text-xs text-destructive mt-1.5">
                              Reason: {ad.rejectionReason}
                            </p>
                          )}

                          {ad.status === "pending" && (
                            <p className="text-xs text-amber-600 mt-1.5">
                              Waiting for admin approval
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            {(ad.status === "pending" || ad.status === "rejected") && (
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default AdvertisementsList;
