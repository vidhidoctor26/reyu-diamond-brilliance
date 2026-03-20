import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Diamond, Download, Truck, CheckCircle2, AlertTriangle,
  CreditCard, Package, Clock, Ban, Loader2
} from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { type DealStatus, dealStatusConfig } from "./DealsList";

interface TimelineStep {
  status: string;
  label: string;
  timestamp?: string;
  note?: string;
  completed: boolean;
  current: boolean;
}

// Mock deal
const mockDeal = {
  id: "DEAL-001",
  diamond: { shape: "Round", carat: "2.50", color: "D", clarity: "VVS1", cut: "Excellent" },
  buyer: "John Smith",
  seller: "You",
  amount: 23800,
  status: "IN_ESCROW" as DealStatus,
  createdAt: "2024-01-20T14:30:00",
  userRole: "seller" as "buyer" | "seller",
};

const statusOrder: DealStatus[] = ["CREATED", "PAYMENT_PENDING", "IN_ESCROW", "SHIPPED", "DELIVERED", "COMPLETED"];

const statusIcons: Record<string, typeof Clock> = {
  CREATED: Clock,
  PAYMENT_PENDING: CreditCard,
  IN_ESCROW: Package,
  SHIPPED: Truck,
  DELIVERED: CheckCircle2,
  COMPLETED: CheckCircle2,
  DISPUTED: AlertTriangle,
  CANCELLED: Ban,
};

const getTimeline = (currentStatus: DealStatus): TimelineStep[] => {
  const currentIdx = statusOrder.indexOf(currentStatus);
  return statusOrder.map((s, i) => ({
    status: s,
    label: dealStatusConfig[s].label,
    timestamp: i <= currentIdx ? "Jan 20, 2024 2:30 PM" : undefined,
    completed: i < currentIdx,
    current: i === currentIdx,
  }));
};

const DealDetail = () => {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(mockDeal);
  const [isLoading, setIsLoading] = useState(false);
  const [shipModal, setShipModal] = useState(false);
  const [confirmDelivery, setConfirmDelivery] = useState(false);
  const [disputeModal, setDisputeModal] = useState(false);
  const [courierName, setCourierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [disputeReason, setDisputeReason] = useState("");

  const sc = dealStatusConfig[deal.status];
  const timeline = getTimeline(deal.status);
  const isDisputed = deal.status === "DISPUTED";
  const isCancelled = deal.status === "CANCELLED";

  const simulateAction = (newStatus: DealStatus, msg: string, delay = 800) => {
    setIsLoading(true);
    setTimeout(() => {
      setDeal((prev) => ({ ...prev, status: newStatus }));
      toast.success(msg);
      setIsLoading(false);
      setShipModal(false);
      setConfirmDelivery(false);
      setDisputeModal(false);
    }, delay);
  };

  const handleDownloadPDF = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success("PDF downloaded successfully");
      setIsLoading(false);
    }, 1000);
  };

  // Action panel content based on role + status
  const renderActions = () => {
    const { userRole, status } = deal;

    if (isCancelled) return <p className="text-sm text-muted-foreground">This deal has been cancelled.</p>;
    if (isDisputed) return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-rose-500">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium text-sm">Dispute Under Review</span>
        </div>
        <p className="text-sm text-muted-foreground">Our team is reviewing this dispute. You'll be notified once a resolution is reached.</p>
      </div>
    );
    if (status === "COMPLETED") return (
      <Button onClick={handleDownloadPDF} disabled={isLoading} className="w-full gap-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Download PDF
      </Button>
    );

    if (userRole === "buyer") {
      if (status === "CREATED") return <Button onClick={() => simulateAction("PAYMENT_PENDING", "Proceeding to payment")} disabled={isLoading} className="w-full gap-2">{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}Proceed to Payment</Button>;
      if (status === "SHIPPED") return <Button onClick={() => setConfirmDelivery(true)} disabled={isLoading} className="w-full gap-2"><CheckCircle2 className="h-4 w-4" />Confirm Delivery</Button>;
      if (status === "DELIVERED") return <Button variant="destructive" onClick={() => setDisputeModal(true)} disabled={isLoading} className="w-full gap-2"><AlertTriangle className="h-4 w-4" />Raise Dispute</Button>;
      return <p className="text-sm text-muted-foreground">Waiting for seller action.</p>;
    }

    // Seller
    if (status === "CREATED" || status === "PAYMENT_PENDING") return <p className="text-sm text-muted-foreground">Waiting for buyer payment.</p>;
    if (status === "IN_ESCROW") return <Button onClick={() => setShipModal(true)} disabled={isLoading} className="w-full gap-2"><Truck className="h-4 w-4" />Mark as Shipped</Button>;
    if (status === "DELIVERED") return <p className="text-sm text-muted-foreground">Awaiting buyer confirmation.</p>;
    return <p className="text-sm text-muted-foreground">No actions available.</p>;
  };

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/user/deals")} className="gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Deals
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — Deal Summary */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4">
            <Card className="card-premium">
              <CardHeader className="pb-3">
                <div className="w-full h-32 rounded-xl bg-gradient-to-br from-muted to-secondary flex items-center justify-center mb-3">
                  <Diamond className="h-12 w-12 text-champagne" />
                </div>
                <CardTitle className="font-display text-lg">{deal.diamond.shape} {deal.diamond.carat}ct</CardTitle>
                <Badge variant="outline" className={sc.className}>{sc.label}</Badge>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 space-y-3 text-sm">
                {[
                  ["Specs", `${deal.diamond.color} / ${deal.diamond.clarity} / ${deal.diamond.cut}`],
                  ["Deal Amount", `$${deal.amount.toLocaleString()}`],
                  ["Buyer", deal.buyer],
                  ["Seller", deal.seller],
                  ["Deal ID", deal.id],
                  ["Created", new Date(deal.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
                <Separator />
                <Button variant="outline" onClick={handleDownloadPDF} disabled={isLoading} className="w-full gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Center — Timeline */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-5">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-lg">Status Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {timeline.map((step, i) => {
                    const Icon = statusIcons[step.status] ?? Clock;
                    return (
                      <div key={step.status} className="flex gap-4 pb-6 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                            step.completed ? "bg-emerald-500/10 text-emerald-600" :
                            step.current ? "bg-primary text-primary-foreground ring-2 ring-primary/20" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          {i < timeline.length - 1 && (
                            <div className={`w-px flex-1 mt-1 ${step.completed || step.current ? "bg-emerald-300" : "bg-border"}`} />
                          )}
                        </div>
                        <div className="pt-1.5">
                          <p className={`text-sm font-medium ${step.current ? "text-primary" : step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                          {step.timestamp && <p className="text-xs text-muted-foreground mt-0.5">{step.timestamp}</p>}
                          {step.note && <p className="text-xs text-muted-foreground mt-0.5 italic">{step.note}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right — Actions */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent>{renderActions()}</CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Ship Modal */}
        <Dialog open={shipModal} onOpenChange={setShipModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mark as Shipped</DialogTitle>
              <DialogDescription>Enter shipping details for this diamond.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Courier Name</Label>
                <Input placeholder="e.g. FedEx, DHL" value={courierName} onChange={(e) => setCourierName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tracking Number</Label>
                <Input placeholder="Enter tracking number" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShipModal(false)}>Cancel</Button>
              <Button onClick={() => simulateAction("SHIPPED", "Marked as shipped")} disabled={isLoading || !courierName || !trackingNumber}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null} Confirm Shipment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirm Delivery Dialog */}
        <AlertDialog open={confirmDelivery} onOpenChange={setConfirmDelivery}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delivery</AlertDialogTitle>
              <AlertDialogDescription>Please confirm you have received the diamond. This action will release payment to the seller.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => simulateAction("DELIVERED", "Delivery confirmed")}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null} Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Dispute Modal */}
        <Dialog open={disputeModal} onOpenChange={setDisputeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Raise a Dispute</DialogTitle>
              <DialogDescription>Describe the issue with this transaction.</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-2">
              <Label>Reason</Label>
              <Textarea placeholder="Describe the issue..." value={disputeReason} onChange={(e) => setDisputeReason(e.target.value)} rows={4} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDisputeModal(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => simulateAction("DISPUTED", "Dispute submitted")} disabled={isLoading || !disputeReason}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null} Submit Dispute
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
};

export default DealDetail;
