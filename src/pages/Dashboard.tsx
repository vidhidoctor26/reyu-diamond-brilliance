import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Gavel, 
  Handshake, 
  ArrowRight, 
  Bell, 
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Diamond
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { 
    label: "Active Listings", 
    value: "12", 
    change: "+2", 
    trending: true, 
    icon: Package,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  { 
    label: "Open Bids", 
    value: "8", 
    change: "+3", 
    trending: true, 
    icon: Gavel,
    color: "from-champagne/20 to-amber-500/20"
  },
  { 
    label: "Ongoing Deals", 
    value: "5", 
    change: "-1", 
    trending: false, 
    icon: Handshake,
    color: "from-emerald-500/20 to-teal-500/20"
  },
  { 
    label: "Portfolio Value", 
    value: "$2.4M", 
    change: "+5.2%", 
    trending: true, 
    icon: TrendingUp,
    color: "from-violet-500/20 to-purple-500/20"
  },
];

const recentListings = [
  { id: 1, name: "Round Brilliant 2.5ct", price: "$24,500", status: "active", views: 156, bids: 4 },
  { id: 2, name: "Princess Cut 1.8ct", price: "$18,200", status: "active", views: 89, bids: 2 },
  { id: 3, name: "Emerald Cut 3.1ct", price: "$42,800", status: "pending", views: 234, bids: 7 },
];

const recentBids = [
  { id: 1, listing: "Oval Brilliant 2.0ct", amount: "$19,500", status: "pending", time: "2 hours ago" },
  { id: 2, listing: "Cushion Cut 1.5ct", amount: "$12,800", status: "accepted", time: "5 hours ago" },
  { id: 3, listing: "Pear Shape 2.2ct", amount: "$22,100", status: "outbid", time: "1 day ago" },
];

const notifications = [
  { id: 1, message: "New bid received on Round Brilliant 2.5ct", time: "10 min ago", type: "bid" },
  { id: 2, message: "Deal #1234 moved to escrow", time: "1 hour ago", type: "deal" },
  { id: 3, message: "KYC verification approved", time: "2 hours ago", type: "system" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
            Welcome back, John
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your diamond trading portfolio today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="card-premium p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="font-display text-3xl font-semibold text-primary">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${stat.trending ? "text-emerald-600" : "text-rose-500"}`}>
                      {stat.trending ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Listings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">My Listings</CardTitle>
                <Link to="/listings">
                  <Button variant="ghost" size="sm" className="text-champagne hover:text-champagne/80">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center">
                          <Diamond className="h-6 w-6 text-champagne" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{listing.name}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {listing.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Gavel className="h-3 w-3" />
                              {listing.bids} bids
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-semibold text-primary">{listing.price}</p>
                        <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Notifications</CardTitle>
                <Link to="/notifications">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === "bid" 
                          ? "bg-champagne/10 text-champagne"
                          : notification.type === "deal"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-blue-500/10 text-blue-500"
                      }`}>
                        {notification.type === "bid" && <Gavel className="h-4 w-4" />}
                        {notification.type === "deal" && <Handshake className="h-4 w-4" />}
                        {notification.type === "system" && <CheckCircle className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-primary truncate">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Bids */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">My Bids</CardTitle>
                <Link to="/bids">
                  <Button variant="ghost" size="sm" className="text-champagne hover:text-champagne/80">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBids.map((bid) => (
                    <div
                      key={bid.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          bid.status === "accepted"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : bid.status === "pending"
                            ? "bg-champagne/10 text-champagne"
                            : "bg-rose-500/10 text-rose-500"
                        }`}>
                          {bid.status === "accepted" && <CheckCircle className="h-5 w-5" />}
                          {bid.status === "pending" && <Clock className="h-5 w-5" />}
                          {bid.status === "outbid" && <AlertCircle className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-primary">{bid.listing}</p>
                          <p className="text-sm text-muted-foreground">{bid.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-semibold text-primary">{bid.amount}</p>
                        <Badge variant={
                          bid.status === "accepted" ? "default" : 
                          bid.status === "pending" ? "secondary" : "destructive"
                        }>
                          {bid.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/inventory/add">
                  <Button className="w-full justify-start" variant="outline">
                    <Package className="h-5 w-5 mr-3" />
                    Add to Inventory
                  </Button>
                </Link>
                <Link to="/listings/create">
                  <Button className="w-full justify-start btn-premium text-primary-foreground">
                    <Diamond className="h-5 w-5 mr-3" />
                    Create Listing
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-5 w-5 mr-3" />
                    Browse Marketplace
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
