 import { Link } from "react-router-dom";
 import { Diamond, Clock, Eye, ChevronRight } from "lucide-react";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import { BidStatus } from "@/components/bids/BidStatusBadge";
 
 export interface ListingWithBidsData {
   listingId: string;
   listingName: string;
   specs: string;
   askingPrice: number;
   auctionStatus: "active" | "ending-soon" | "closed" | "locked";
   timeRemaining?: string;
   totalBids: number;
   highestBid: number;
   pendingBids: number;
 }
 
 interface ListingBidGroupProps {
   listing: ListingWithBidsData;
 }
 
 const auctionStatusConfig: Record<string, { label: string; className: string }> = {
   active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600" },
   "ending-soon": { label: "Ending Soon", className: "bg-amber-500/10 text-amber-600" },
   closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
   locked: { label: "Locked", className: "bg-primary/10 text-primary" }
 };
 
 const ListingBidGroup = ({ listing }: ListingBidGroupProps) => {
   const statusConfig = auctionStatusConfig[listing.auctionStatus] || auctionStatusConfig.active;
 
   return (
     <Card className="card-premium hover:shadow-lg transition-shadow">
       <CardHeader className="pb-4">
         <div className="flex items-start justify-between gap-4">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-diamond-shimmer to-pearl flex items-center justify-center">
               <Diamond className="h-7 w-7 text-champagne/50" />
             </div>
             <div>
               <CardTitle className="font-display text-lg mb-1">
                 {listing.listingName}
               </CardTitle>
               <p className="text-sm text-muted-foreground">{listing.specs}</p>
             </div>
           </div>
           <Badge className={statusConfig.className}>
             {statusConfig.label}
           </Badge>
         </div>
       </CardHeader>
 
       <CardContent className="pt-0">
         {/* Stats Row */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-border">
           <div>
             <p className="text-sm text-muted-foreground">Asking Price</p>
             <p className="font-display text-lg font-semibold text-primary">
               ${listing.askingPrice.toLocaleString()}
             </p>
           </div>
           <div>
             <p className="text-sm text-muted-foreground">Highest Bid</p>
             <p className="font-display text-lg font-semibold text-champagne">
               ${listing.highestBid.toLocaleString()}
             </p>
           </div>
           <div>
             <p className="text-sm text-muted-foreground">Total Bids</p>
             <p className="font-display text-lg font-semibold text-primary">
               {listing.totalBids}
             </p>
           </div>
           <div>
             <p className="text-sm text-muted-foreground">Pending</p>
             <p className="font-display text-lg font-semibold text-amber-600">
               {listing.pendingBids}
             </p>
           </div>
         </div>
 
         {/* Time & Actions */}
         <div className="flex items-center justify-between pt-4">
           {listing.timeRemaining && listing.auctionStatus !== "closed" && listing.auctionStatus !== "locked" ? (
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Clock className="h-4 w-4" />
               <span>{listing.timeRemaining} remaining</span>
             </div>
           ) : (
             <div />
           )}
           
           <Link to={`/bids/received/${listing.listingId}`}>
             <Button variant="outline" className="gap-2">
               <Eye className="h-4 w-4" />
               View Bids
               <ChevronRight className="h-4 w-4" />
             </Button>
           </Link>
         </div>
       </CardContent>
     </Card>
   );
 };
 
 export default ListingBidGroup;