import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Diamond,
  QrCode,
  Upload,
  ArrowUpDown
} from "lucide-react";
import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
 import DashboardShell from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const inventoryItems = [
  { id: "INV-001", name: "Round Brilliant", carat: 2.5, color: "D", clarity: "VVS1", cut: "Excellent", price: 24500, status: "available", certNumber: "GIA-123456", addedDate: "2024-01-15" },
  { id: "INV-002", name: "Princess Cut", carat: 1.8, color: "E", clarity: "VS1", cut: "Very Good", price: 18200, status: "listed", certNumber: "GIA-234567", addedDate: "2024-01-14" },
  { id: "INV-003", name: "Emerald Cut", carat: 3.1, color: "F", clarity: "VVS2", cut: "Excellent", price: 42800, status: "in_deal", certNumber: "GIA-345678", addedDate: "2024-01-13" },
  { id: "INV-004", name: "Oval Brilliant", carat: 2.0, color: "D", clarity: "IF", cut: "Excellent", price: 32100, status: "available", certNumber: "GIA-456789", addedDate: "2024-01-12" },
  { id: "INV-005", name: "Cushion Cut", carat: 1.5, color: "E", clarity: "VS2", cut: "Very Good", price: 12800, status: "available", certNumber: "GIA-567890", addedDate: "2024-01-11" },
];

const stats = [
  { label: "Total Items", value: "24", icon: Package },
  { label: "Available", value: "18", icon: Diamond },
  { label: "Listed", value: "4", icon: Eye },
  { label: "In Deals", value: "2", icon: Filter },
];

const Inventory = () => {
   const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">Available</Badge>;
      case "listed":
        return <Badge className="bg-champagne/10 text-champagne hover:bg-champagne/20">Listed</Badge>;
      case "in_deal":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">In Deal</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

   const handleCreateListing = (inventoryId: string) => {
     navigate("/listings/create", { state: { inventoryId } });
   };
 
  return (
     <DashboardShell>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
              My Inventory
            </h1>
            <p className="text-muted-foreground">
              Manage your diamond collection and track your assets
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <QrCode className="h-5 w-5 mr-2" />
              Scan Barcode
            </Button>
            <Link to="/inventory/add">
              <Button className="btn-premium text-primary-foreground rounded-xl">
                <Plus className="h-5 w-5 mr-2" />
                Add Diamond
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="card-premium">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-champagne" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-display text-2xl font-semibold text-primary">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, certificate number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] h-12 rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="listed">Listed</SelectItem>
              <SelectItem value="in_deal">In Deal</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-12 rounded-xl">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="carat-high">Carat: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Inventory Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-premium overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Diamond</TableHead>
                  <TableHead>Specifications</TableHead>
                  <TableHead>Certificate</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-diamond-shimmer to-pearl flex items-center justify-center">
                          <Diamond className="h-6 w-6 text-champagne/50" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{item.carat}ct</Badge>
                        <Badge variant="secondary">{item.color}</Badge>
                        <Badge variant="secondary">{item.clarity}</Badge>
                        <Badge variant="secondary">{item.cut}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.certNumber}</TableCell>
                    <TableCell className="font-display font-semibold text-primary">
                      ${item.price.toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {item.status === "available" && (
                             <DropdownMenuItem onClick={() => handleCreateListing(item.id)}>
                              <Upload className="h-4 w-4 mr-2" />
                              Create Listing
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      </div>
     </DashboardShell>
  );
};

export default Inventory;
