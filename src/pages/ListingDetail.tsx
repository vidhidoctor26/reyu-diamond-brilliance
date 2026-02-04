import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Diamond, 
  ArrowLeft, 
  Heart, 
  Share2, 
  Shield, 
  Eye, 
  Gavel,
  TrendingUp,
  Calendar,
  MapPin,
  Award,
  FileText,
  ChevronRight
} from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaceBidModal from "@/components/bidding/PlaceBidModal";

// Mock listing data - in real app would fetch by ID
const listingData = {
  id: "LST-001",
  name: "Round Brilliant",
  carat: 2.5,
  color: "D",
  clarity: "VVS1",
  cut: "Excellent",
  polish: "Excellent",
  symmetry: "Excellent",
  fluorescence: "None",
  price: 24500,
  pricePerCarat: 9800,
  dimensions: "8.45 x 8.48 x 5.21 mm",
  depthPercent: 61.5,
  tablePercent: 57,
  certification: "GIA",
  certNumber: "2215789456",
  origin: "Botswana",
  seller: {
    name: "Diamond Elite Co.",
    verified: true,
    rating: 4.9,
    totalSales: 234,
    memberSince: "2021"
  },
  views: 156,
  bids: 4,
  highestBid: 23800,
  listingDate: "2024-01-15",
  expiresAt: "2024-02-15",
  description: "Exceptional D color, VVS1 clarity round brilliant diamond with triple excellent cut grades. This stunning stone exhibits outstanding fire and brilliance, making it an ideal choice for a luxury engagement ring or investment piece.",
  status: "active"
};

const ListingDetail = () => {
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);

  // Mock: Check if current user is the listing owner
  const isOwner = false;
  // Mock: Check if user is KYC verified
  const isVerified = true;

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/marketplace">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <Card className="card-premium overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-diamond-shimmer to-pearl relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Diamond className="h-32 w-32 text-champagne/30" />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`} />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-500/90 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" /> Hot
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Thumbnail Strip */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-1 aspect-square rounded-xl bg-gradient-to-br from-diamond-shimmer/50 to-pearl/50 border-2 border-transparent hover:border-champagne cursor-pointer transition-colors flex items-center justify-center"
                >
                  <Diamond className="h-8 w-8 text-champagne/20" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title & Price */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="font-display text-3xl font-semibold text-primary mb-1">
                    {listingData.name} {listingData.carat}ct
                  </h1>
                  <p className="text-muted-foreground">
                    {listingData.color} / {listingData.clarity} / {listingData.cut}
                  </p>
                </div>
                <Badge variant="outline" className="text-base px-3 py-1">
                  ID: {listingData.id}
                </Badge>
              </div>

              <div className="flex items-baseline gap-2 mt-4">
                <span className="font-display text-4xl font-bold text-primary">
                  ${listingData.price.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  (${listingData.pricePerCarat.toLocaleString()}/ct)
                </span>
              </div>

              {listingData.bids > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Highest Bid: <span className="font-semibold text-champagne">${listingData.highestBid.toLocaleString()}</span>
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 py-4 border-y border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-5 w-5" />
                <span>{listingData.views} views</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gavel className="h-5 w-5" />
                <span>{listingData.bids} bids</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>Expires {new Date(listingData.expiresAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Seller Info */}
            <Card className="card-premium">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-champagne/20 to-pearl flex items-center justify-center">
                      <span className="font-display text-lg font-semibold text-champagne">
                        {listingData.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-primary">{listingData.seller.name}</h4>
                        {listingData.seller.verified && (
                          <Shield className="h-4 w-4 text-emerald-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ⭐ {listingData.seller.rating} • {listingData.seller.totalSales} sales
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {isOwner ? (
                <div className="p-4 bg-muted/50 rounded-xl text-center">
                  <p className="text-muted-foreground">This is your listing</p>
                  <Link to={`/listings/${id}/bids`}>
                    <Button variant="outline" className="mt-2">
                      View Bids ({listingData.bids})
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Button 
                    className="btn-premium text-primary-foreground w-full h-14 text-lg rounded-xl"
                    onClick={() => setShowBidModal(true)}
                    disabled={!isVerified}
                  >
                    <Gavel className="h-5 w-5 mr-2" />
                    Place Bid
                  </Button>
                  {!isVerified && (
                    <p className="text-sm text-center text-muted-foreground">
                      Complete <Link to="/kyc" className="text-champagne underline">KYC verification</Link> to place bids
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="bg-muted/50 p-1 rounded-xl mb-6">
              <TabsTrigger value="specifications" className="rounded-lg">Specifications</TabsTrigger>
              <TabsTrigger value="certification" className="rounded-lg">Certification</TabsTrigger>
              <TabsTrigger value="description" className="rounded-lg">Description</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications">
              <Card className="card-premium">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-display font-semibold text-primary">4C's</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Carat</span>
                          <span className="font-medium">{listingData.carat}ct</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Color</span>
                          <span className="font-medium">{listingData.color}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Clarity</span>
                          <span className="font-medium">{listingData.clarity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cut</span>
                          <span className="font-medium">{listingData.cut}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-display font-semibold text-primary">Finish</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Polish</span>
                          <span className="font-medium">{listingData.polish}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Symmetry</span>
                          <span className="font-medium">{listingData.symmetry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fluorescence</span>
                          <span className="font-medium">{listingData.fluorescence}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-display font-semibold text-primary">Measurements</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dimensions</span>
                          <span className="font-medium text-sm">{listingData.dimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Depth %</span>
                          <span className="font-medium">{listingData.depthPercent}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Table %</span>
                          <span className="font-medium">{listingData.tablePercent}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certification">
              <Card className="card-premium">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-champagne/20 to-pearl flex items-center justify-center">
                      <Award className="h-10 w-10 text-champagne" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-xl font-semibold text-primary mb-1">
                        {listingData.certification} Certified
                      </h4>
                      <p className="text-muted-foreground mb-2">
                        Certificate #{listingData.certNumber}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Origin: {listingData.origin}
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      View Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="description">
              <Card className="card-premium">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {listingData.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Place Bid Modal */}
        <PlaceBidModal 
          open={showBidModal} 
          onOpenChange={setShowBidModal}
          listing={listingData}
        />
      </div>
    </DashboardShell>
  );
};

export default ListingDetail;
