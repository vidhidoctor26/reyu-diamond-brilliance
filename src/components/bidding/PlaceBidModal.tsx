import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, Diamond, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface Listing {
  id: string;
  name: string;
  carat: number;
  color: string;
  clarity: string;
  price: number;
  highestBid?: number;
}

interface PlaceBidModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: Listing;
}

const PlaceBidModal = ({ open, onOpenChange, listing }: PlaceBidModalProps) => {
  const [bidAmount, setBidAmount] = useState("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minimumBid = listing.highestBid 
    ? listing.highestBid + 100 
    : Math.floor(listing.price * 0.9);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirm");
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep("success");
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setStep("form");
      setBidAmount("");
      setNote("");
    }, 200);
  };

  const bidAmountNum = parseFloat(bidAmount) || 0;
  const isValidBid = bidAmountNum >= minimumBid;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Place a Bid</DialogTitle>
                <DialogDescription>
                  Submit your bid for this diamond listing
                </DialogDescription>
              </DialogHeader>

              {/* Listing Summary */}
              <div className="my-6 p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-diamond-shimmer to-pearl flex items-center justify-center">
                    <Diamond className="h-7 w-7 text-champagne/50" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-primary">
                      {listing.name} {listing.carat}ct
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {listing.color} / {listing.clarity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-semibold text-primary">
                      ${listing.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Asking Price</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bid Amount */}
                <div className="space-y-2">
                  <Label htmlFor="bidAmount">Bid Amount (USD) *</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      $
                    </span>
                    <Input
                      id="bidAmount"
                      type="number"
                      placeholder="Enter your bid"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="pl-8 h-12 text-lg"
                      min={minimumBid}
                      required
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Minimum bid: <span className="font-medium text-champagne">${minimumBid.toLocaleString()}</span>
                  </p>
                  {bidAmount && !isValidBid && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Bid must be at least ${minimumBid.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Optional Note */}
                <div className="space-y-2">
                  <Label htmlFor="note">Note to Seller (Optional)</Label>
                  <Textarea
                    id="note"
                    placeholder="Add any message or conditions for the seller..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="btn-premium text-primary-foreground flex-1"
                    disabled={!isValidBid}
                  >
                    <Gavel className="h-4 w-4 mr-2" />
                    Review Bid
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Confirm Your Bid</DialogTitle>
                <DialogDescription>
                  Please review your bid details before submitting
                </DialogDescription>
              </DialogHeader>

              <div className="my-6 space-y-4">
                <div className="p-4 bg-muted/50 rounded-xl space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Diamond</span>
                    <span className="font-medium">{listing.name} {listing.carat}ct</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listing Price</span>
                    <span className="font-medium">${listing.price.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your Bid</span>
                    <span className="font-display text-2xl font-bold text-champagne">
                      ${bidAmountNum.toLocaleString()}
                    </span>
                  </div>
                  {note && (
                    <>
                      <Separator />
                      <div>
                        <span className="text-muted-foreground text-sm">Note:</span>
                        <p className="text-sm mt-1">{note}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    By confirming, you agree to complete the purchase if your bid is accepted.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep("form")}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleConfirm}
                  className="btn-premium text-primary-foreground flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Gavel className="h-4 w-4 mr-2" />
                      Confirm Bid
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-2">
                Bid Submitted!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your bid of <span className="font-semibold text-champagne">${bidAmountNum.toLocaleString()}</span> has been placed successfully.
                You'll be notified when the seller responds.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button 
                  className="btn-premium text-primary-foreground"
                  onClick={() => {
                    handleClose();
                    // Navigate to My Bids - would use router in real app
                  }}
                >
                  View My Bids
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceBidModal;
