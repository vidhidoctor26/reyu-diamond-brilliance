import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Diamond, Handshake, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type DealStatus = "CREATED" | "PAYMENT_PENDING" | "IN_ESCROW" | "SHIPPED" | "DELIVERED" | "COMPLETED" | "DISPUTED" | "CANCELLED";

export interface Deal {
  id: string;
  diamond: { shape: string; carat: string; color: string; clarity: string; cut: string };
  buyer: string;
  seller: string;
  amount: number;
  status: DealStatus;
  createdAt: string;
}

const mockDeals: Deal[] = [
  { id: "DEAL-001", diamond: { shape: "Round", carat: "2.50", color: "D", clarity: "VVS1", cut: "Excellent" }, buyer: "John Smith", seller: "You", amount: 23800, status: "IN_ESCROW", createdAt: "2024-01-20T14:30:00" },
  { id: "DEAL-002", diamond: { shape: "Princess", carat: "1.80", color: "E", clarity: "VS1", cut: "Very Good" }, buyer: "You", seller: "Maria Garcia", amount: 12400, status: "SHIPPED", createdAt: "2024-01-18T10:00:00" },
  { id: "DEAL-003", diamond: { shape: "Oval", carat: "3.10", color: "F", clarity: "VVS2", cut: "Excellent" }, buyer: "David Chen", seller: "You", amount: 31200, status: "COMPLETED", createdAt: "2024-01-10T09:15:00" },
  { id: "DEAL-004", diamond: { shape: "Emerald", carat: "2.00", color: "G", clarity: "VS2", cut: "Good" }, buyer: "You", seller: "Alex Kim", amount: 15800, status: "DISPUTED", createdAt: "2024-01-05T16:00:00" },
  { id: "DEAL-005", diamond: { shape: "Cushion", carat: "1.50", color: "D", clarity: "IF", cut: "Excellent" }, buyer: "Sarah Lee", seller: "You", amount: 19500, status: "PAYMENT_PENDING", createdAt: "2024-01-22T08:00:00" },
  { id: "DEAL-006", diamond: { shape: "Marquise", carat: "1.20", color: "H", clarity: "SI1", cut: "Very Good" }, buyer: "You", seller: "Tom Brown", amount: 6200, status: "CANCELLED", createdAt: "2023-12-28T12:00:00" },
];

export const dealStatusConfig: Record<DealStatus, { label: string; className: string }> = {
  CREATED: { label: "Created", className: "bg-muted text-muted-foreground border-border" },
  PAYMENT_PENDING: { label: "Payment Pending", className: "bg-amber-500/10 text-amber-600 border-amber-200" },
  IN_ESCROW: { label: "In Escrow", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  SHIPPED: { label: "Shipped", className: "bg-purple-500/10 text-purple-600 border-purple-200" },
  DELIVERED: { label: "Delivered", className: "bg-teal-500/10 text-teal-600 border-teal-200" },
  COMPLETED: { label: "Completed", className: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  DISPUTED: { label: "Disputed", className: "bg-rose-500/10 text-rose-500 border-rose-200" },
  CANCELLED: { label: "Cancelled", className: "bg-muted text-muted-foreground border-border" },
};

const DealsList = () => {
  const [deals] = useState<Deal[]>(mockDeals);

  const total = deals.length;
  const active = deals.filter((d) => !["COMPLETED", "CANCELLED", "DISPUTED"].includes(d.status)).length;
  const completed = deals.filter((d) => d.status === "COMPLETED").length;
  const disputed = deals.filter((d) => d.status === "DISPUTED").length;

  const stats = [
    { label: "Total Deals", value: total, icon: Handshake, color: "text-primary" },
    { label: "Active", value: active, icon: Clock, color: "text-blue-600" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Disputed", value: disputed, icon: AlertTriangle, color: "text-rose-500" },
  ];

  const sorted = [...deals].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-2xl font-semibold text-primary">Deals</h1>
          <p className="text-sm text-muted-foreground">Track all your diamond transactions</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <Card key={s.label} className="card-premium">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-display font-semibold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Deal Cards */}
        <div className="space-y-3">
          {sorted.map((deal, i) => {
            const sc = dealStatusConfig[deal.status];
            return (
              <motion.div key={deal.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
                <Card className="card-premium">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-secondary flex items-center justify-center shrink-0">
                          <Diamond className="h-6 w-6 text-champagne" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{deal.diamond.shape} {deal.diamond.carat}ct</p>
                          <p className="text-xs text-muted-foreground">
                            {deal.diamond.color}/{deal.diamond.clarity}/{deal.diamond.cut}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>Buyer: <span className="text-foreground">{deal.buyer}</span></span>
                            <span>•</span>
                            <span>Seller: <span className="text-foreground">{deal.seller}</span></span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-display text-xl font-semibold text-primary">${deal.amount.toLocaleString()}</p>
                        <Badge variant="outline" className={sc.className}>{sc.label}</Badge>
                        <Link to={`/user/deals/${deal.id}`}>
                          <Button variant="outline" size="sm">View Deal</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
};

export default DealsList;
