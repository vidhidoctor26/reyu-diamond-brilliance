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
 
 interface RejectBidModalProps {
   bid: BidData | null;
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onConfirm: () => void;
   isLoading?: boolean;
 }
 
 const RejectBidModal = ({ 
   bid, 
   open, 
   onOpenChange, 
   onConfirm,
   isLoading = false 
 }: RejectBidModalProps) => {
   if (!bid) return null;
 
   return (
     <AlertDialog open={open} onOpenChange={onOpenChange}>
       <AlertDialogContent className="max-w-md">
         <AlertDialogHeader>
           <AlertDialogTitle className="font-display text-xl">
             Reject this bid?
           </AlertDialogTitle>
           <AlertDialogDescription className="text-base">
             The bidder will be notified that their offer was declined.
           </AlertDialogDescription>
         </AlertDialogHeader>
 
         <div className="py-4">
           <div className="p-4 bg-muted/50 rounded-xl space-y-3">
             <div className="flex justify-between items-center">
               <span className="text-muted-foreground">Diamond</span>
               <span className="font-medium text-primary">{bid.listingName}</span>
             </div>
             {bid.bidder && (
               <div className="flex justify-between items-center">
                 <span className="text-muted-foreground">Bidder</span>
                 <span className="font-medium text-primary">{bid.bidder.name}</span>
               </div>
             )}
             <div className="flex justify-between items-center">
               <span className="text-muted-foreground">Bid Amount</span>
               <BidAmount amount={bid.bidAmount} size="md" showAskingPrice={false} />
             </div>
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
             variant="destructive"
             onClick={onConfirm}
             disabled={isLoading}
           >
             {isLoading ? "Processing..." : "Reject Bid"}
           </Button>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
   );
 };
 
 export default RejectBidModal;