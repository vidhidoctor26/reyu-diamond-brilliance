 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Link } from "react-router-dom";
 import { 
   Gavel, 
   Search, 
   Clock, 
   CheckCircle2, 
   XCircle,
   ArrowUpDown
 } from "lucide-react";
 import DashboardShell from "@/components/layout/DashboardShell";
 import { Input } from "@/components/ui/input";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { ListingBidGroup, ListingWithBidsData } from "@/components/bids-received";
 
 // Mock data - Listings with bid aggregates
 const listingsWithBids: ListingWithBidsData[] = [
   {
     listingId: "LST-001",
     listingName: "Round Brilliant 2.5ct",
     specs: "D/VVS1/EX",
     askingPrice: 24500,
     auctionStatus: "active",
     timeRemaining: "2d 14h",
     totalBids: 3,
     highestBid: 23800,
     pendingBids: 3
   },
   {
     listingId: "LST-002",
     listingName: "Princess Cut 1.8ct",
     specs: "E/VS1/VG",
     askingPrice: 18200,
     auctionStatus: "ending-soon",
     timeRemaining: "4h 30m",
     totalBids: 1,
     highestBid: 17500,
     pendingBids: 1
   },
   {
     listingId: "LST-003",
     listingName: "Emerald Cut 3.1ct",
     specs: "F/VVS2/EX",
     askingPrice: 42800,
     auctionStatus: "locked",
     totalBids: 2,
     highestBid: 41000,
     pendingBids: 0
   }
 ];
 
 const stats = [
   { label: "Active Listings", value: "5", icon: Gavel, color: "bg-champagne/10 text-champagne" },
   { label: "Pending Bids", value: "7", icon: Clock, color: "bg-amber-500/10 text-amber-600" },
   { label: "Accepted", value: "3", icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600" },
   { label: "Rejected", value: "4", icon: XCircle, color: "bg-rose-500/10 text-rose-500" },
 ];
 
 const BidsOnMyListings = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const [activeTab, setActiveTab] = useState("all");
 
   const filteredListings = listingsWithBids.filter(listing => {
     if (activeTab === "all") return true;
     if (activeTab === "active") return listing.auctionStatus === "active" || listing.auctionStatus === "ending-soon";
     if (activeTab === "locked") return listing.auctionStatus === "locked";
     if (activeTab === "closed") return listing.auctionStatus === "closed";
     return true;
   }).filter(listing => 
     listing.listingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     listing.specs.toLowerCase().includes(searchQuery.toLowerCase())
   );
 
   return (
     <DashboardShell>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
         >
           <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
             Bids Received
           </h1>
           <p className="text-muted-foreground">
             Bids placed on your active listings
           </p>
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
                 <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                   <stat.icon className="h-6 w-6" />
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground">{stat.label}</p>
                   <p className="font-display text-2xl font-semibold text-primary">{stat.value}</p>
                 </div>
               </CardContent>
             </Card>
           ))}
         </motion.div>
 
         {/* Tabs & Filters */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
         >
           <Tabs value={activeTab} onValueChange={setActiveTab}>
             <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
               <TabsList className="bg-muted/50 p-1 rounded-xl">
                 <TabsTrigger value="all" className="rounded-lg">All Listings</TabsTrigger>
                 <TabsTrigger value="active" className="rounded-lg">Active</TabsTrigger>
                 <TabsTrigger value="locked" className="rounded-lg">Locked</TabsTrigger>
                 <TabsTrigger value="closed" className="rounded-lg">Closed</TabsTrigger>
               </TabsList>
 
               <div className="flex gap-3">
                 <div className="relative flex-1 md:w-64">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                   <Input
                     placeholder="Search listings..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="pl-12 h-11 rounded-xl"
                   />
                 </div>
                 <Select defaultValue="most-bids">
                   <SelectTrigger className="w-[150px] h-11 rounded-xl">
                     <ArrowUpDown className="h-4 w-4 mr-2" />
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="most-bids">Most Bids</SelectItem>
                     <SelectItem value="highest-bid">Highest Bid</SelectItem>
                     <SelectItem value="ending-soon">Ending Soon</SelectItem>
                     <SelectItem value="newest">Newest</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>
 
             <TabsContent value={activeTab} className="mt-0">
               {filteredListings.length === 0 ? (
                 <Card className="card-premium">
                   <CardContent className="p-12 text-center">
                     <Gavel className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                     <h3 className="font-display text-xl font-semibold text-primary mb-2">
                       No listings with bids
                     </h3>
                     <p className="text-muted-foreground mb-4">
                       {activeTab === "all" 
                         ? "You haven't received any bids on your listings yet." 
                         : `No ${activeTab} listings found.`}
                     </p>
                     <Link to="/listings">
                       <Button variant="outline">View My Listings</Button>
                     </Link>
                   </CardContent>
                 </Card>
               ) : (
                 <div className="space-y-4">
                   {filteredListings.map((listing, index) => (
                     <motion.div
                       key={listing.listingId}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: index * 0.05 }}
                     >
                       <ListingBidGroup listing={listing} />
                     </motion.div>
                   ))}
                 </div>
               )}
             </TabsContent>
           </Tabs>
         </motion.div>
       </div>
     </DashboardShell>
   );
 };
 
 export default BidsOnMyListings;