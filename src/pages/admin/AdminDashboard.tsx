import DashboardShell from "@/components/layout/DashboardShell";
import { motion } from "framer-motion";
import { 
  Users, 
  Diamond, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Total Users", value: "12,847", icon: Users, trend: "+12.5%" },
  { label: "Active Listings", value: "3,291", icon: Diamond, trend: "+8.2%" },
  { label: "Pending KYC", value: "156", icon: Clock, trend: "-3.1%" },
  { label: "Total Revenue", value: "$2.4M", icon: TrendingUp, trend: "+18.7%" },
];

const recentActivity = [
  { type: "kyc", user: "Alice Johnson", action: "KYC approved", time: "2 mins ago", status: "success" },
  { type: "listing", user: "Bob Smith", action: "New listing flagged", time: "15 mins ago", status: "warning" },
  { type: "user", user: "Carol White", action: "Account verified", time: "1 hour ago", status: "success" },
  { type: "security", user: "System", action: "Suspicious activity detected", time: "2 hours ago", status: "alert" },
];

const AdminDashboard = () => {
  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="glass border-border hover:shadow-premium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.trend} from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-champagne/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-champagne" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-champagne" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.status === 'success' ? 'bg-green-500/10' :
                        activity.status === 'warning' ? 'bg-yellow-500/10' :
                        'bg-red-500/10'
                      }`}>
                        {activity.status === 'success' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : activity.status === 'warning' ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <Shield className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-primary">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardShell>
  );
};

export default AdminDashboard;
