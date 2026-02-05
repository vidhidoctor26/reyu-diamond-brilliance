 import { AlertTriangle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
 } from "@/components/ui/alert-dialog";
 import { BidData } from "@/components/bids/BidCard";
 import BidAmount from "@/components/bids/BidAmount";
 
 interface AcceptBidModalProps {
   bid: BidData | null;
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onConfirm: () => void;
   isLoading?: boolean;
 }
 
 const AcceptBidModal = ({ 
   bid, 
   open, 
   onOpenChange, 
   onConfirm,
   isLoading = false 
 }: AcceptBidModalProps) => {
   if (!bid) return null;
 
   return (
     <AlertDialog open={open} onOpenChange={onOpenChange}>
       <AlertDialogContent className="max-w-md">
         <AlertDialogHeader>
           <AlertDialogTitle className="font-display text-xl flex items-center gap-2">
             <AlertTriangle className="h-5 w-5 text-amber-500" />
             Accept this bid?
           </AlertDialogTitle>
           <AlertDialogDescription className="text-base">
             This action is irreversible and will initiate a deal.
           </AlertDialogDescription>
         </AlertDialogHeader>
 
         <div className="py-4 space-y-4">
           {/* Bid Summary */}
           <div className="p-4 bg-muted/50 rounded-xl space-y-3">
             <div className="flex justify-between items-center">
               <span className="text-muted-foreground">Diamond</span>
               <span className="font-medium text-primary">{bid.listingName}</span>
             </div>
             {bid.bidder && (
               <div className="flex justify-between items-center">
                 <span className="text-muted-foreground">Buyer</span>
                 <span className="font-medium text-primary">{bid.bidder.name}</span>
               </div>
             )}
             <div className="flex justify-between items-center">
               <span className="text-muted-foreground">Bid Amount</span>
               <BidAmount amount={bid.bidAmount} size="md" showAskingPrice={false} />
             </div>
           </div>
 
           {/* Consequences */}
           <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
             <p className="text-sm font-medium text-amber-700 mb-2">
               Accepting this bid will:
             </p>
             <ul className="text-sm text-amber-600 space-y-1">
               <li>• Lock this listing immediately</li>
               <li>• Reject all other pending bids</li>
               <li>• Create a deal with the buyer</li>
               <li>• Notify the buyer to proceed with payment</li>
             </ul>
           </div>
         </div>
 
         <AlertDialogFooter>
           <Button 
             variant="outline" 
             onClick={() => onOpenChange(false)}
             disabled={isLoading}
           >
             Cancel
           </Button>
           <Button 
             className="bg-emerald-600 hover:bg-emerald-700 text-white"
             onClick={onConfirm}
             disabled={isLoading}
           >
             {isLoading ? "Processing..." : "Confirm Accept"}
           </Button>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
   );
 };
 
 export default AcceptBidModal;