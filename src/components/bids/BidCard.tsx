 import { Link } from "react-router-dom";
 import { Diamond, User, Shield, MessageSquare } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import BidStatusBadge, { BidStatus } from "./BidStatusBadge";
 import BidAmount from "./BidAmount";
 
 export interface Bidder {
   name: string;
   verified: boolean;
   rating: number;
 }
 
 export interface BidData {
   id: string;
   listingId: string;
   listingName: string;
   specs: string;
   askingPrice: number;
   bidAmount: number;
   status: BidStatus;
   placedAt: string;
   note?: string;
   // Seller-side: bidder info
   bidder?: Bidder;
   // Buyer-side: seller info
   seller?: string;
 }
 
 interface BidCardProps {
   bid: BidData;
   context: "buyer" | "seller";
   actions?: React.ReactNode;
   showDiamond?: boolean;
 }
 
 const formatDate = (dateStr: string) => {
   const date = new Date(dateStr);
   return date.toLocaleDateString('en-US', { 
     month: 'short', 
     day: 'numeric',
     hour: '2-digit',
     minute: '2-digit'
   });
 };
 
 const BidCard = ({ bid, context, actions, showDiamond = true }: BidCardProps) => {
   return (
     <Card className="card-premium">
       <CardContent className="p-6">
         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
           <div className="flex items-start gap-4">
             {showDiamond && (
               <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-diamond-shimmer to-pearl flex items-center justify-center flex-shrink-0">
                 <Diamond className="h-8 w-8 text-champagne/50" />
               </div>
             )}
             <div>
               <div className="flex items-center gap-3 mb-1">
                 <Link 
                   to={`/marketplace/${bid.listingId}`}
                   className="font-display text-lg font-semibold text-primary hover:text-champagne transition-colors"
                 >
                   {bid.listingName}
                 </Link>
                 <BidStatusBadge status={bid.status} />
               </div>
               <p className="text-sm text-muted-foreground mb-2">{bid.specs}</p>
               
               {context === "buyer" && bid.seller && (
                 <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                   <span>Seller: {bid.seller}</span>
                   <span>•</span>
                   <span>{formatDate(bid.placedAt)}</span>
                 </div>
               )}
 
               {context === "seller" && bid.bidder && (
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <div className="flex items-center gap-2">
                     <User className="h-4 w-4" />
                     <span>{bid.bidder.name}</span>
                     {bid.bidder.verified && (
                       <Shield className="h-4 w-4 text-emerald-500" />
                     )}
                     <span>⭐ {bid.bidder.rating}</span>
                   </div>
                   <span>•</span>
                   <span>{formatDate(bid.placedAt)}</span>
                 </div>
               )}
 
               {bid.note && (
                 <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2 italic">
                   <MessageSquare className="h-4 w-4" />
                   <span>"{bid.note}"</span>
                 </div>
               )}
             </div>
           </div>
 
           <div className="flex items-center gap-6">
             <BidAmount 
               amount={bid.bidAmount} 
               askingPrice={bid.askingPrice} 
               size="lg" 
             />
             {actions}
           </div>
         </div>
       </CardContent>
     </Card>
   );
 };
 
 export default BidCard;