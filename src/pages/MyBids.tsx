import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Gavel, 
  Search, 
  Diamond, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Eye,
  ArrowUpDown,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const myBids = [
  { 
    id: "BID-001", 
    listingId: "LST-001",
    listingName: "Round Brilliant 2.5ct", 
    specs: "D/VVS1/EX", 
    askingPrice: 24500,
    myBid: 23500, 
    status: "pending", 
    placedAt: "2024-01-20T14:30:00",
    seller: "Diamond Elite Co.",
    note: "Interested in quick closing"
  },
  { 
    id: "BID-002", 
    listingId: "LST-002",
    listingName: "Princess Cut 1.8ct", 
    specs: "E/VS1/VG", 
    askingPrice: 18200,
    myBid: 17800, 
    status: "pending", 
    placedAt: "2024-01-19T10:15:00",
    seller: "Gem Masters",
    note: ""
  },
  { 
    id: "BID-003", 
    listingId: "LST-003",
    listingName: "Emerald Cut 3.1ct", 
    specs: "F/VVS2/EX", 
    askingPrice: 42800,
    myBid: 41000, 
    status: "accepted", 
    placedAt: "2024-01-18T16:45:00",
    seller: "Crown Diamonds",
    note: "Best price offer"
  },
  { 
    id: "BID-004", 
    listingId: "LST-004",
    listingName: "Oval Brilliant 2.0ct", 
    specs: "D/IF/EX", 
    askingPrice: 32100,
    myBid: 29500, 
    status: "rejected", 
    placedAt: "2024-01-17T09:00:00",
    seller: "Pure Radiance",
    note: ""
  },
  { 
    id: "BID-005", 
    listingId: "LST-005",
    listingName: "Cushion Cut 1.5ct", 
    specs: "E/VS2/VG", 
    askingPrice: 12800,
    myBid: 12000, 
    status: "cancelled", 
    placedAt: "2024-01-16T11:30:00",
    seller: "Stellar Gems",
    note: "Changed my mind"
  },
];

const stats = [
  { label: "Total Bids", value: "12", icon: Gavel, color: "bg-champagne/10 text-champagne" },
  { label: "Pending", value: "5", icon: Clock, color: "bg-amber-500/10 text-amber-600" },
  { label: "Accepted", value: "3", icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600" },
  { label: "Rejected", value: "4", icon: XCircle, color: "bg-rose-500/10 text-rose-500" },
];

const MyBids = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500/10 text-amber-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "accepted":
        return <Badge className="bg-emerald-500/10 text-emerald-600"><CheckCircle2 className="h-3 w-3 mr-1" />Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-rose-500/10 text-rose-500"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case "cancelled":
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredBids = myBids.filter(bid => 
    activeTab === "all" || bid.status === activeTab
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
            My Bids
          </h1>
          <p className="text-muted-foreground">
            Track all your bids and their status
          </p>
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
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <TabsList className="bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg">All</TabsTrigger>
                <TabsTrigger value="pending" className="rounded-lg">Pending</TabsTrigger>
                <TabsTrigger value="accepted" className="rounded-lg">Accepted</TabsTrigger>
                <TabsTrigger value="rejected" className="rounded-lg">Rejected</TabsTrigger>
                <TabsTrigger value="cancelled" className="rounded-lg">Cancelled</TabsTrigger>
              </TabsList>

              <div className="flex gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search bids..."
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
                    <SelectItem value="amount-high">Amount ↓</SelectItem>
                    <SelectItem value="amount-low">Amount ↑</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              {filteredBids.length === 0 ? (
                <Card className="card-premium">
                  <CardContent className="p-12 text-center">
                    <Gavel className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold text-primary mb-2">
                      No bids found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {activeTab === "all" 
                        ? "You haven't placed any bids yet." 
                        : `No ${activeTab} bids found.`}
                    </p>
                    <Link to="/marketplace">
                      <Button className="btn-premium text-primary-foreground">
                        Browse Marketplace
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredBids.map((bid, index) => (
                    <motion.div
                      key={bid.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="card-premium">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-diamond-shimmer to-pearl flex items-center justify-center flex-shrink-0">
                                <Diamond className="h-8 w-8 text-champagne/50" />
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <Link 
                                    to={`/marketplace/${bid.listingId}`}
                                    className="font-display text-lg font-semibold text-primary hover:text-champagne transition-colors"
                                  >
                                    {bid.listingName}
                                  </Link>
                                  {getStatusBadge(bid.status)}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{bid.specs}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                  <span>Seller: {bid.seller}</span>
                                  <span>•</span>
                                  <span>{formatDate(bid.placedAt)}</span>
                                </div>
                                {bid.note && (
                                  <p className="text-sm text-muted-foreground mt-2 italic">
                                    Note: "{bid.note}"
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground mb-1">Your Bid</p>
                                <p className="font-display text-2xl font-semibold text-champagne">
                                  ${bid.myBid.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Ask: ${bid.askingPrice.toLocaleString()}
                                </p>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-5 w-5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link to={`/marketplace/${bid.listingId}`}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Listing
                                    </Link>
                                  </DropdownMenuItem>
                                  {bid.status === "pending" && (
                                    <>
                                      <DropdownMenuItem>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Bid
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Cancel Bid
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {bid.status === "accepted" && (
                                    <DropdownMenuItem>
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      View Deal
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardShell>
  );
};

export default MyBids;
