 import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
 import { Badge } from "@/components/ui/badge";
 
 export type BidStatus = "pending" | "accepted" | "rejected" | "cancelled" | "auto-rejected";
 
 interface BidStatusBadgeProps {
   status: BidStatus;
   className?: string;
 }
 
 const statusConfig: Record<BidStatus, { icon: typeof Clock; label: string; className: string }> = {
   pending: {
     icon: Clock,
     label: "Pending",
     className: "bg-amber-500/10 text-amber-600"
   },
   accepted: {
     icon: CheckCircle2,
     label: "Accepted",
     className: "bg-emerald-500/10 text-emerald-600"
   },
   rejected: {
     icon: XCircle,
     label: "Rejected",
     className: "bg-rose-500/10 text-rose-500"
   },
   cancelled: {
     icon: AlertCircle,
     label: "Cancelled",
     className: "bg-muted text-muted-foreground"
   },
   "auto-rejected": {
     icon: XCircle,
     label: "Auto-Rejected",
     className: "bg-rose-500/10 text-rose-400"
   }
 };
 
 const BidStatusBadge = ({ status, className = "" }: BidStatusBadgeProps) => {
   const config = statusConfig[status] || statusConfig.pending;
   const Icon = config.icon;
 
   return (
     <Badge className={`${config.className} ${className}`}>
       <Icon className="h-3 w-3 mr-1" />
       {config.label}
     </Badge>
   );
 };
 
 export default BidStatusBadge;