 import { Link } from "react-router-dom";
 import { Eye, Edit, Trash2, ExternalLink, Check, X, MoreVertical } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";
 import { BidStatus } from "./BidStatusBadge";
 
 interface BidActionsProps {
   context: "buyer" | "seller";
   bidId: string;
   listingId: string;
   status: BidStatus;
   onAccept?: () => void;
   onReject?: () => void;
   onEdit?: () => void;
   onCancel?: () => void;
   variant?: "inline" | "dropdown";
 }
 
 const BidActions = ({ 
   context, 
   bidId, 
   listingId, 
   status, 
   onAccept, 
   onReject,
   onEdit,
   onCancel,
   variant = "dropdown" 
 }: BidActionsProps) => {
   // Seller inline actions for pending bids
   if (context === "seller" && variant === "inline" && status === "pending") {
     return (
       <div className="flex gap-2">
         <Button 
           size="sm" 
           variant="outline"
           className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
           onClick={onAccept}
         >
           <Check className="h-4 w-4 mr-1" />
           Accept
         </Button>
         <Button 
           size="sm" 
           variant="outline"
           className="text-rose-500 border-rose-200 hover:bg-rose-50"
           onClick={onReject}
         >
           <X className="h-4 w-4 mr-1" />
           Reject
         </Button>
       </div>
     );
   }
 
   // Dropdown for both contexts
   return (
     <DropdownMenu>
       <DropdownMenuTrigger asChild>
         <Button variant="ghost" size="icon">
           <MoreVertical className="h-5 w-5" />
         </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end">
         <DropdownMenuItem asChild>
           <Link to={`/marketplace/${listingId}`}>
             <Eye className="h-4 w-4 mr-2" />
             View Listing
           </Link>
         </DropdownMenuItem>
 
         {context === "buyer" && (
           <>
             {status === "pending" && (
               <>
                 <DropdownMenuItem onClick={onEdit}>
                   <Edit className="h-4 w-4 mr-2" />
                   Edit Bid
                 </DropdownMenuItem>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem className="text-destructive" onClick={onCancel}>
                   <Trash2 className="h-4 w-4 mr-2" />
                   Cancel Bid
                 </DropdownMenuItem>
               </>
             )}
             {status === "accepted" && (
               <DropdownMenuItem asChild>
                 <Link to={`/deals/${bidId}`}>
                   <ExternalLink className="h-4 w-4 mr-2" />
                   View Deal
                 </Link>
               </DropdownMenuItem>
             )}
           </>
         )}
 
         {context === "seller" && (
           <>
             {status === "pending" && (
               <>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem 
                   className="text-emerald-600" 
                   onClick={onAccept}
                 >
                   <Check className="h-4 w-4 mr-2" />
                   Accept Bid
                 </DropdownMenuItem>
                 <DropdownMenuItem 
                   className="text-destructive" 
                   onClick={onReject}
                 >
                   <X className="h-4 w-4 mr-2" />
                   Reject Bid
                 </DropdownMenuItem>
               </>
             )}
             {status === "accepted" && (
               <DropdownMenuItem asChild>
                 <Link to={`/deals/${bidId}`}>
                   <ExternalLink className="h-4 w-4 mr-2" />
                   View Deal
                 </Link>
               </DropdownMenuItem>
             )}
           </>
         )}
       </DropdownMenuContent>
     </DropdownMenu>
   );
 };
 
 export default BidActions;