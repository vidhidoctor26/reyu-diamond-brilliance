import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Diamond, 
  Clock, 
  User,
  Gavel,
  Crown
} from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Types
interface BidData {
  id: string;
  bidAmount: number;
  status: "active" | "accepted" | "rejected" | "expired";
  placedAt: string;
  bidder: { name: string; initials: string };
}

// Mock data
const listingData = {
  listingId: "LST-001",
  shape: "Round",
  carat: "2.50",
  color: "D",
  clarity: "VVS1",
  cut: "Excellent",
  lab: "GIA",
  askingPrice: 24500,
  auctionStatus: "active" as const,
  timeRemaining: "2d 14h",
};

const mockBids: BidData[] = [
  { id: "BID-101", bidAmount: 23800, status: "active", placedAt: "2024-01-20T14:30:00", bidder: { name: "John Smith", initials: "JS" } },
  { id: "BID-102", bidAmount: 23200, status: "active", placedAt: "2024-01-19T16:45:00", bidder: { name: "Maria Garcia", initials: "MG" } },
  { id: "BID-103", bidAmount: 22500, status: "active", placedAt: "2024-01-18T11:20:00", bidder: { name: "David Chen", initials: "DC" } },
];

const auctionStatusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  upcoming: { label: "Upcoming", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  ended: { label: "Ended", className: "bg-muted text-muted-foreground border-border" },
};

const bidStatusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-amber-500/10 text-amber-600 border-amber-200" },
  accepted: { label: "Accepted", className: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  rejected: { label: "Rejected", className: "bg-rose-500/10 text-rose-500 border-rose-200" },
  expired: { label: "Expired", className: "bg-muted text-muted-foreground border-border" },
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

const ListingBids = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const bids = [...mockBids].sort((a, b) => b.bidAmount - a.bidAmount);
  const highestBid = bids[0]?.bidAmount ?? 0;
  const activeBids = bids.filter((b) => b.status === "active");
  const statusConfig = auctionStatusConfig[listingData.auctionStatus];
  const title = `${listingData.shape} ${listingData.carat}ct`;

  const specs = [
    { label: "Shape", value: listingData.shape },
    { label: "Carat", value: listingData.carat },
    { label: "Color", value: listingData.color },
    { label: "Clarity", value: listingData.clarity },
    { label: "Cut", value: listingData.cut },
    { label: "Lab", value: listingData.lab },
  ];

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/bids/received")} className="gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Bids Received
          </Button>
        </motion.div>

        {/* Listing Summary */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-muted to-secondary flex items-center justify-center shrink-0">
                    <Diamond className="h-7 w-7 text-champagne" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <CardTitle className="font-display text-xl">{title}</CardTitle>
                      <Badge variant="outline" className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">ID: {listingData.listingId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  {listingData.auctionStatus === "active" && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{listingData.timeRemaining}</span>
                    </div>
                  )}
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Asking Price</p>
                    <p className="font-display text-xl font-semibold text-primary">${listingData.askingPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-center gap-0">
                {specs.map((s, i) => (
                  <div key={s.label} className="flex items-center">
                    <div className="px-4 py-1">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-sm font-medium">{s.value}</p>
                    </div>
                    {i < specs.length - 1 && <Separator orientation="vertical" className="h-8" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bids Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
          <h2 className="font-display text-lg font-semibold text-primary">Bids ({bids.length})</h2>
          <p className="text-sm text-muted-foreground">
            {activeBids.length} active • Highest: ${highestBid.toLocaleString()}
          </p>
        </motion.div>

        {/* Bid Cards */}
        {bids.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card className="card-premium">
              <CardContent className="py-16 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Gavel className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">No bids yet</h3>
                <p className="text-sm text-muted-foreground max-w-xs">Share your listing to attract buyers.</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {bids.map((bid, index) => {
              const isHighest = bid.bidAmount === highestBid;
              const sc = bidStatusConfig[bid.status] ?? bidStatusConfig.active;

              return (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <Card className={`card-premium transition-colors ${isHighest ? "ring-1 ring-emerald-400/50" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Bidder */}
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-champagne/15 text-champagne text-sm font-semibold">
                              {bid.bidder.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{bid.bidder.name}</span>
                              {isHighest && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                  <Crown className="h-3 w-3" />
                                  Highest
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{formatDate(bid.placedAt)}</p>
                          </div>
                        </div>

                        {/* Amount & Status */}
                        <div className="flex items-center gap-4">
                          <p className="font-display text-xl font-semibold text-champagne">
                            ${bid.bidAmount.toLocaleString()}
                          </p>
                          <Badge variant="outline" className={sc.className}>
                            {sc.label}
                          </Badge>
                        </div>
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

export default ListingBids;
