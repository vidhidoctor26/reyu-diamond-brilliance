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
  Diamond,
  Pause,
  Play,
  TrendingUp,
  ArrowUpDown,
  Gavel
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const myListings = [
  { id: "LST-001", name: "Round Brilliant 2.5ct", specs: "D/VVS1/EX", price: 24500, bids: 4, views: 156, status: "active", createdAt: "2024-01-15", expiresAt: "2024-02-15" },
  { id: "LST-002", name: "Princess Cut 1.8ct", specs: "E/VS1/VG", price: 18200, bids: 2, views: 89, status: "active", createdAt: "2024-01-14", expiresAt: "2024-02-14" },
  { id: "LST-003", name: "Emerald Cut 3.1ct", specs: "F/VVS2/EX", price: 42800, bids: 7, views: 234, status: "paused", createdAt: "2024-01-13", expiresAt: "2024-02-13" },
  { id: "LST-004", name: "Oval Brilliant 2.0ct", specs: "D/IF/EX", price: 32100, bids: 5, views: 178, status: "sold", createdAt: "2024-01-12", expiresAt: "2024-02-12" },
  { id: "LST-005", name: "Cushion Cut 1.5ct", specs: "E/VS2/VG", price: 12800, bids: 1, views: 67, status: "expired", createdAt: "2024-01-01", expiresAt: "2024-01-31" },
];

const stats = [
  { label: "Active Listings", value: "12", icon: Play, color: "bg-emerald-500/10 text-emerald-600" },
  { label: "Total Bids", value: "34", icon: Gavel, color: "bg-champagne/10 text-champagne" },
  { label: "Total Views", value: "1.2K", icon: Eye, color: "bg-blue-500/10 text-blue-600" },
  { label: "Sold Items", value: "8", icon: TrendingUp, color: "bg-violet-500/10 text-violet-600" },
];

const MyListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/10 text-emerald-600">Active</Badge>;
      case "paused":
        return <Badge className="bg-champagne/10 text-champagne">Paused</Badge>;
      case "sold":
        return <Badge className="bg-blue-500/10 text-blue-600">Sold</Badge>;
      case "expired":
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredListings = myListings.filter(listing => 
    activeTab === "all" || listing.status === activeTab
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
              My Listings
            </h1>
            <p className="text-muted-foreground">
              Manage and track your diamond listings
            </p>
          </div>
          <Link to="/listings/create">
            <Button className="btn-premium text-primary-foreground rounded-xl">
              <Plus className="h-5 w-5 mr-2" />
              Create Listing
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="card-premium">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-display text-2xl font-semibold text-primary">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Tabs & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <TabsList className="bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg">All</TabsTrigger>
                <TabsTrigger value="active" className="rounded-lg">Active</TabsTrigger>
                <TabsTrigger value="paused" className="rounded-lg">Paused</TabsTrigger>
                <TabsTrigger value="sold" className="rounded-lg">Sold</TabsTrigger>
                <TabsTrigger value="expired" className="rounded-lg">Expired</TabsTrigger>
              </TabsList>

              <div className="flex gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search listings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-11 rounded-xl"
                  />
                </div>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[150px] h-11 rounded-xl">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="price-high">Price ↓</SelectItem>
                    <SelectItem value="price-low">Price ↑</SelectItem>
                    <SelectItem value="most-bids">Most Bids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-4">
                {filteredListings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="card-premium">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-diamond-shimmer to-pearl flex items-center justify-center">
                              <Diamond className="h-8 w-8 text-champagne/50" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-display text-lg font-semibold text-primary">
                                  {listing.name}
                                </h3>
                                {getStatusBadge(listing.status)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{listing.specs}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {listing.views} views
                                </span>
                                <span className="flex items-center gap-1">
                                  <Gavel className="h-4 w-4" />
                                  {listing.bids} bids
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="font-display text-2xl font-semibold text-primary">
                                ${listing.price.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires: {new Date(listing.expiresAt).toLocaleDateString()}
                              </p>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Gavel className="h-4 w-4 mr-2" />
                                  View Bids
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Listing
                                </DropdownMenuItem>
                                {listing.status === "active" && (
                                  <DropdownMenuItem>
                                    <Pause className="h-4 w-4 mr-2" />
                                    Pause Listing
                                  </DropdownMenuItem>
                                )}
                                {listing.status === "paused" && (
                                  <DropdownMenuItem>
                                    <Play className="h-4 w-4 mr-2" />
                                    Activate Listing
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Listing
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MyListings;
