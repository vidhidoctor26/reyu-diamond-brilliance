 import { useState } from "react";
 import { useParams, Link, useNavigate } from "react-router-dom";
 import { motion } from "framer-motion";
 import { 
   ArrowLeft, 
   Diamond, 
   Clock, 
   User, 
   Shield, 
   MessageSquare,
   Check,
   X,
   ExternalLink
 } from "lucide-react";
 import DashboardShell from "@/components/layout/DashboardShell";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Separator } from "@/components/ui/separator";
 import { BidStatusBadge, BidAmount, BidData } from "@/components/bids";
 import { AcceptBidModal, RejectBidModal } from "@/components/bids-received";
 
 // Mock listing data
 const listingData = {
   listingId: "LST-001",
   listingName: "Round Brilliant 2.5ct",
   specs: "D/VVS1/EX",
   askingPrice: 24500,
   auctionStatus: "active" as const,
   timeRemaining: "2d 14h",
   shape: "Round",
   carat: "2.50",
   color: "D",
   clarity: "VVS1",
   cut: "Excellent",
   certification: "GIA-2234567890"
 };
 
 // Mock bids for this listing
 const listingBids: BidData[] = [
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
 ];
 
 const auctionStatusConfig: Record<string, { label: string; className: string }> = {
   active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600" },
   "ending-soon": { label: "Ending Soon", className: "bg-amber-500/10 text-amber-600" },
   closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
   locked: { label: "Locked", className: "bg-primary/10 text-primary" }
 };
 
 const formatDate = (dateStr: string) => {
   const date = new Date(dateStr);
   return date.toLocaleDateString('en-US', { 
     month: 'short', 
     day: 'numeric',
     hour: '2-digit',
     minute: '2-digit'
   });
 };
 
 const ListingBids = () => {
   const { listingId } = useParams();
   const navigate = useNavigate();
   const [bids, setBids] = useState(listingBids);
   const [selectedBid, setSelectedBid] = useState<BidData | null>(null);
   const [acceptModalOpen, setAcceptModalOpen] = useState(false);
   const [rejectModalOpen, setRejectModalOpen] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);
 
   const statusConfig = auctionStatusConfig[listingData.auctionStatus];
   const hasAcceptedBid = bids.some(b => b.status === "accepted");
   const pendingBids = bids.filter(b => b.status === "pending");
   const highestBid = Math.max(...bids.map(b => b.bidAmount));
 
   const handleAccept = () => {
     if (!selectedBid) return;
     setIsProcessing(true);
     
     // Simulate API call
     setTimeout(() => {
       setBids(prev => prev.map(bid => ({
         ...bid,
         status: bid.id === selectedBid.id ? "accepted" : 
                 bid.status === "pending" ? "auto-rejected" : bid.status
       })));
       setIsProcessing(false);
       setAcceptModalOpen(false);
       setSelectedBid(null);
     }, 1000);
   };
 
   const handleReject = () => {
     if (!selectedBid) return;
     setIsProcessing(true);
     
     // Simulate API call
     setTimeout(() => {
       setBids(prev => prev.map(bid => 
         bid.id === selectedBid.id ? { ...bid, status: "rejected" } : bid
       ));
       setIsProcessing(false);
       setRejectModalOpen(false);
       setSelectedBid(null);
     }, 500);
   };
 
   return (
     <DashboardShell>
       <div className="p-6 lg:p-8">
         {/* Back Navigation */}
         <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="mb-6"
         >
           <Button 
             variant="ghost" 
             onClick={() => navigate("/bids/received")}
             className="gap-2"
           >
             <ArrowLeft className="h-4 w-4" />
             Back to Bids Received
           </Button>
         </motion.div>
 
         {/* Listing Header */}
         <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
         >
           <Card className="card-premium">
             <CardHeader>
               <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                 <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-diamond-shimmer to-pearl flex items-center justify-center">
                     <Diamond className="h-8 w-8 text-champagne/50" />
                   </div>
                   <div>
                     <div className="flex items-center gap-3 mb-1">
                       <CardTitle className="font-display text-2xl">
                         {listingData.listingName}
                       </CardTitle>
                       <Badge className={statusConfig.className}>
                         {statusConfig.label}
                       </Badge>
                     </div>
                     <p className="text-muted-foreground">{listingData.specs}</p>
                   </div>
                 </div>
 
                 <div className="flex items-center gap-6">
                   {listingData.timeRemaining && listingData.auctionStatus === "active" && (
                     <div className="flex items-center gap-2 text-muted-foreground">
                       <Clock className="h-4 w-4" />
                       <span>{listingData.timeRemaining} remaining</span>
                     </div>
                   )}
                   <div className="text-right">
                     <p className="text-sm text-muted-foreground">Asking Price</p>
                     <p className="font-display text-2xl font-semibold text-primary">
                       ${listingData.askingPrice.toLocaleString()}
                     </p>
                   </div>
                 </div>
               </div>
             </CardHeader>
 
             <Separator />
 
             <CardContent className="pt-4">
               <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                 <div>
                   <p className="text-muted-foreground">Shape</p>
                   <p className="font-medium">{listingData.shape}</p>
                 </div>
                 <div>
                   <p className="text-muted-foreground">Carat</p>
                   <p className="font-medium">{listingData.carat}</p>
                 </div>
                 <div>
                   <p className="text-muted-foreground">Color</p>
                   <p className="font-medium">{listingData.color}</p>
                 </div>
                 <div>
                   <p className="text-muted-foreground">Clarity</p>
                   <p className="font-medium">{listingData.clarity}</p>
                 </div>
                 <div>
                   <p className="text-muted-foreground">Cut</p>
                   <p className="font-medium">{listingData.cut}</p>
                 </div>
                 <div>
                   <p className="text-muted-foreground">Certification</p>
                   <p className="font-medium">{listingData.certification}</p>
                 </div>
               </div>
             </CardContent>
           </Card>
         </motion.div>
 
         {/* Bids Summary */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="mb-6"
         >
           <div className="flex items-center justify-between">
             <div>
               <h2 className="font-display text-xl font-semibold text-primary">
                 Bids ({bids.length})
               </h2>
               <p className="text-sm text-muted-foreground">
                 {pendingBids.length} pending • Highest: ${highestBid.toLocaleString()}
               </p>
             </div>
             {hasAcceptedBid && (
               <Link to={`/deals/${bids.find(b => b.status === "accepted")?.id}`}>
                 <Button className="btn-premium text-primary-foreground gap-2">
                   <ExternalLink className="h-4 w-4" />
                   View Deal
                 </Button>
               </Link>
             )}
           </div>
         </motion.div>
 
         {/* Bids List */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="space-y-3"
         >
           {bids.map((bid, index) => (
             <motion.div
               key={bid.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 + index * 0.05 }}
             >
               <Card className={`card-premium ${bid.status === "accepted" ? "ring-2 ring-emerald-500" : ""}`}>
                 <CardContent className="p-4">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     {/* Bidder Info */}
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-champagne/20 to-pearl flex items-center justify-center">
                         <User className="h-6 w-6 text-champagne/70" />
                       </div>
                       <div>
                         <div className="flex items-center gap-2 mb-1">
                           <span className="font-medium text-primary">
                             {bid.bidder?.name}
                           </span>
                           {bid.bidder?.verified && (
                             <Shield className="h-4 w-4 text-emerald-500" />
                           )}
                           <span className="text-sm text-muted-foreground">
                             ⭐ {bid.bidder?.rating}
                           </span>
                         </div>
                         <p className="text-sm text-muted-foreground">
                           {formatDate(bid.placedAt)}
                         </p>
                         {bid.note && (
                           <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                             <MessageSquare className="h-3 w-3" />
                             <span className="italic">"{bid.note}"</span>
                           </div>
                         )}
                       </div>
                     </div>
 
                     {/* Bid Amount & Actions */}
                     <div className="flex items-center gap-4">
                       <BidAmount 
                         amount={bid.bidAmount} 
                         size="lg" 
                         showAskingPrice={false} 
                       />
 
                       <div className="min-w-[120px]">
                         <BidStatusBadge status={bid.status} />
                       </div>
 
                       {/* Actions - only for pending bids when no bid accepted */}
                       {bid.status === "pending" && !hasAcceptedBid && (
                         <div className="flex gap-2">
                           <Button 
                             size="sm" 
                             variant="outline"
                             className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                             onClick={() => {
                               setSelectedBid(bid);
                               setAcceptModalOpen(true);
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
                               setRejectModalOpen(true);
                             }}
                           >
                             <X className="h-4 w-4 mr-1" />
                             Reject
                           </Button>
                         </div>
                       )}
                     </div>
                   </div>
                 </CardContent>
               </Card>
             </motion.div>
           ))}
         </motion.div>
 
         {/* Modals */}
         <AcceptBidModal 
           bid={selectedBid}
           open={acceptModalOpen}
           onOpenChange={setAcceptModalOpen}
           onConfirm={handleAccept}
           isLoading={isProcessing}
         />
 
         <RejectBidModal 
           bid={selectedBid}
           open={rejectModalOpen}
           onOpenChange={setRejectModalOpen}
           onConfirm={handleReject}
           isLoading={isProcessing}
         />
       </div>
     </DashboardShell>
   );
 };
 
 export default ListingBids;