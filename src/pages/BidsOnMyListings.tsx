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
  Eye,
  ArrowUpDown,
  Check,
  X,
  User,
  Shield,
  MessageSquare
} from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Mock data - Bids received on user's listings
const bidsOnMyListings = [
  { 
    id: "BID-101", 
    listingId: "LST-001",
    listingName: "Round Brilliant 2.5ct", 
    specs: "D/VVS1/EX", 
    askingPrice: 24500,
    bidAmount: 23800, 
    status: "pending", 
    placedAt: "2024-01-20T14:30:00",
    bidder: { name: "John Smith", verified: true, rating: 4.8 },
    note: "Willing to complete immediately"
  },
  { 
    id: "BID-102", 
    listingId: "LST-001",
    listingName: "Round Brilliant 2.5ct", 
    specs: "D/VVS1/EX", 
    askingPrice: 24500,
    bidAmount: 23200, 
    status: "pending", 
    placedAt: "2024-01-19T16:45:00",
    bidder: { name: "Maria Garcia", verified: true, rating: 4.9 },
    note: ""
  },
  { 
    id: "BID-103", 
    listingId: "LST-001",
    listingName: "Round Brilliant 2.5ct", 
    specs: "D/VVS1/EX", 
    askingPrice: 24500,
    bidAmount: 22500, 
    status: "pending", 
    placedAt: "2024-01-18T11:20:00",
    bidder: { name: "David Chen", verified: true, rating: 4.7 },
    note: "First-time buyer, very interested"
  },
  { 
    id: "BID-104", 
    listingId: "LST-002",
    listingName: "Princess Cut 1.8ct", 
    specs: "E/VS1/VG", 
    askingPrice: 18200,
    bidAmount: 17500, 
    status: "pending", 
    placedAt: "2024-01-20T09:15:00",
    bidder: { name: "Sarah Johnson", verified: true, rating: 4.6 },
    note: ""
  },
  { 
    id: "BID-105", 
    listingId: "LST-003",
    listingName: "Emerald Cut 3.1ct", 
    specs: "F/VVS2/EX", 
    askingPrice: 42800,
    bidAmount: 41000, 
    status: "accepted", 
    placedAt: "2024-01-17T13:00:00",
    bidder: { name: "Robert Wilson", verified: true, rating: 5.0 },
    note: "Best offer"
  },
  { 
    id: "BID-106", 
    listingId: "LST-003",
    listingName: "Emerald Cut 3.1ct", 
    specs: "F/VVS2/EX", 
    askingPrice: 42800,
    bidAmount: 39500, 
    status: "rejected", 
    placedAt: "2024-01-16T10:30:00",
    bidder: { name: "Emma Brown", verified: true, rating: 4.4 },
    note: ""
  },
];

const stats = [
  { label: "Total Bids", value: "18", icon: Gavel, color: "bg-champagne/10 text-champagne" },
  { label: "Pending Review", value: "7", icon: Clock, color: "bg-amber-500/10 text-amber-600" },
  { label: "Accepted", value: "5", icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600" },
  { label: "Rejected", value: "6", icon: XCircle, color: "bg-rose-500/10 text-rose-500" },
];

const BidsOnMyListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBid, setSelectedBid] = useState<typeof bidsOnMyListings[0] | null>(null);
  const [actionDialog, setActionDialog] = useState<"accept" | "reject" | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500/10 text-amber-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "accepted":
        return <Badge className="bg-emerald-500/10 text-emerald-600"><CheckCircle2 className="h-3 w-3 mr-1" />Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-rose-500/10 text-rose-500"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredBids = bidsOnMyListings.filter(bid => 
    activeTab === "all" || bid.status === activeTab
  );

  // Group bids by listing
  const groupedByListing = filteredBids.reduce((acc, bid) => {
    if (!acc[bid.listingId]) {
      acc[bid.listingId] = {
        listingId: bid.listingId,
        listingName: bid.listingName,
        specs: bid.specs,
        askingPrice: bid.askingPrice,
        bids: []
      };
    }
    acc[bid.listingId].bids.push(bid);
    return acc;
  }, {} as Record<string, { listingId: string; listingName: string; specs: string; askingPrice: number; bids: typeof bidsOnMyListings }>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAccept = () => {
    // Mock accept logic
    console.log("Accepting bid:", selectedBid?.id);
    setActionDialog(null);
    setSelectedBid(null);
  };

  const handleReject = () => {
    // Mock reject logic
    console.log("Rejecting bid:", selectedBid?.id);
    setActionDialog(null);
    setSelectedBid(null);
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
            Bids on My Listings
          </h1>
          <p className="text-muted-foreground">
            Review and manage bids received on your diamond listings
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
                    <SelectItem value="highest">Highest Bid</SelectItem>
                    <SelectItem value="lowest">Lowest Bid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              {Object.keys(groupedByListing).length === 0 ? (
                <Card className="card-premium">
                  <CardContent className="p-12 text-center">
                    <Gavel className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold text-primary mb-2">
                      No bids found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {activeTab === "all" 
                        ? "You haven't received any bids on your listings yet." 
                        : `No ${activeTab} bids found.`}
                    </p>
                    <Link to="/listings">
                      <Button variant="outline">View My Listings</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {Object.values(groupedByListing).map((listing, listingIndex) => (
                    <motion.div
                      key={listing.listingId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: listingIndex * 0.1 }}
                    >
                      <Card className="card-premium overflow-hidden">
                        {/* Listing Header */}
                        <CardHeader className="bg-muted/30 border-b border-border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-diamond-shimmer to-pearl flex items-center justify-center">
                                <Diamond className="h-6 w-6 text-champagne/50" />
                              </div>
                              <div>
                                <CardTitle className="font-display text-lg">
                                  {listing.listingName}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">{listing.specs}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-display text-xl font-semibold text-primary">
                                ${listing.askingPrice.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {listing.bids.length} bid{listing.bids.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        {/* Bids List */}
                        <CardContent className="p-0 divide-y divide-border">
                          {listing.bids.map((bid) => (
                            <div 
                              key={bid.id} 
                              className="p-4 hover:bg-muted/20 transition-colors"
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                {/* Bidder Info */}
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne/20 to-pearl flex items-center justify-center">
                                    <User className="h-5 w-5 text-champagne/70" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-primary">
                                        {bid.bidder.name}
                                      </span>
                                      {bid.bidder.verified && (
                                        <Shield className="h-4 w-4 text-emerald-500" />
                                      )}
                                      <span className="text-sm text-muted-foreground">
                                        ⭐ {bid.bidder.rating}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {formatDate(bid.placedAt)}
                                    </p>
                                  </div>
                                </div>

                                {/* Bid Amount & Status */}
                                <div className="flex items-center gap-4">
                                  {bid.note && (
                                    <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                                      <MessageSquare className="h-4 w-4" />
                                      <span className="max-w-[200px] truncate">"{bid.note}"</span>
                                    </div>
                                  )}
                                  
                                  <div className="text-right min-w-[100px]">
                                    <p className="font-display text-xl font-semibold text-champagne">
                                      ${bid.bidAmount.toLocaleString()}
                                    </p>
                                  </div>

                                  <div className="min-w-[100px]">
                                    {getStatusBadge(bid.status)}
                                  </div>

                                  {/* Actions */}
                                  {bid.status === "pending" && (
                                    <div className="flex gap-2">
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                        onClick={() => {
                                          setSelectedBid(bid);
                                          setActionDialog("accept");
                                        }}
                                      >
                                        <Check className="h-4 w-4 mr-1" />
                                        Accept
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="text-rose-500 border-rose-200 hover:bg-rose-50"
                                        onClick={() => {
                                          setSelectedBid(bid);
                                          setActionDialog("reject");
                                        }}
                                      >
                                        <X className="h-4 w-4 mr-1" />
                                        Reject
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Accept Dialog */}
        <Dialog open={actionDialog === "accept"} onOpenChange={() => setActionDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Accept Bid</DialogTitle>
              <DialogDescription>
                Are you sure you want to accept this bid?
              </DialogDescription>
            </DialogHeader>
            
            {selectedBid && (
              <div className="py-4 space-y-4">
                <div className="p-4 bg-muted/50 rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Diamond</span>
                    <span className="font-medium">{selectedBid.listingName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bidder</span>
                    <span className="font-medium">{selectedBid.bidder.name}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bid Amount</span>
                    <span className="font-display text-xl font-bold text-emerald-600">
                      ${selectedBid.bidAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Accepting this bid will reject all other pending bids and create a deal with the buyer.
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setActionDialog(null)}>
                Cancel
              </Button>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleAccept}
              >
                <Check className="h-4 w-4 mr-2" />
                Accept Bid
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={actionDialog === "reject"} onOpenChange={() => setActionDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Reject Bid</DialogTitle>
              <DialogDescription>
                Are you sure you want to reject this bid?
              </DialogDescription>
            </DialogHeader>
            
            {selectedBid && (
              <div className="py-4">
                <div className="p-4 bg-muted/50 rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Diamond</span>
                    <span className="font-medium">{selectedBid.listingName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bidder</span>
                    <span className="font-medium">{selectedBid.bidder.name}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bid Amount</span>
                    <span className="font-display text-xl font-bold text-rose-500">
                      ${selectedBid.bidAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setActionDialog(null)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleReject}
              >
                <X className="h-4 w-4 mr-2" />
                Reject Bid
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
};

export default BidsOnMyListings;
