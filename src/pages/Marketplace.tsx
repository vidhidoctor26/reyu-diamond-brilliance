import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Diamond, 
  TrendingUp, 
  TrendingDown,
  SlidersHorizontal,
  Heart,
  Eye,
  ArrowUpDown
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const listings = [
  { id: 1, name: "Round Brilliant", carat: 2.5, color: "D", clarity: "VVS1", cut: "Excellent", price: 24500, change: "+2.4%", trending: true, views: 156, bids: 4, seller: "Diamond Elite Co.", image: null },
  { id: 2, name: "Princess Cut", carat: 1.8, color: "E", clarity: "VS1", cut: "Very Good", price: 18200, change: "+1.8%", trending: true, views: 89, bids: 2, seller: "Gem Masters", image: null },
  { id: 3, name: "Emerald Cut", carat: 3.1, color: "F", clarity: "VVS2", cut: "Excellent", price: 42800, change: "-0.5%", trending: false, views: 234, bids: 7, seller: "Crown Diamonds", image: null },
  { id: 4, name: "Oval Brilliant", carat: 2.0, color: "D", clarity: "IF", cut: "Excellent", price: 32100, change: "+3.2%", trending: true, views: 178, bids: 5, seller: "Pure Radiance", image: null },
  { id: 5, name: "Cushion Cut", carat: 1.5, color: "E", clarity: "VS2", cut: "Very Good", price: 12800, change: "+0.8%", trending: true, views: 67, bids: 1, seller: "Stellar Gems", image: null },
  { id: 6, name: "Pear Shape", carat: 2.2, color: "F", clarity: "VVS1", cut: "Excellent", price: 28900, change: "-1.2%", trending: false, views: 145, bids: 3, seller: "Diamond Elite Co.", image: null },
  { id: 7, name: "Marquise", carat: 1.9, color: "D", clarity: "VS1", cut: "Excellent", price: 21500, change: "+1.5%", trending: true, views: 98, bids: 2, seller: "Gem Masters", image: null },
  { id: 8, name: "Heart Shape", carat: 2.8, color: "E", clarity: "VVS2", cut: "Very Good", price: 38400, change: "+2.1%", trending: true, views: 210, bids: 6, seller: "Crown Diamonds", image: null },
];

const shapes = ["Round", "Princess", "Emerald", "Oval", "Cushion", "Pear", "Marquise", "Heart", "Radiant", "Asscher"];
const colors = ["D", "E", "F", "G", "H", "I", "J", "K"];
const clarities = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];
const cuts = ["Excellent", "Very Good", "Good", "Fair"];

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [caratRange, setCaratRange] = useState([0, 10]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedClarities, setSelectedClarities] = useState<string[]>([]);

  const toggleShape = (shape: string) => {
    setSelectedShapes(prev => 
      prev.includes(shape) ? prev.filter(s => s !== shape) : [...prev, shape]
    );
  };

  const clearFilters = () => {
    setSelectedShapes([]);
    setSelectedColors([]);
    setSelectedClarities([]);
    setPriceRange([0, 100000]);
    setCaratRange([0, 10]);
  };

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
            Marketplace
          </h1>
          <p className="text-muted-foreground">
            Browse certified diamonds from verified traders worldwide
          </p>
        </motion.div>

        {/* Search & Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search diamonds by shape, carat, color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-12 rounded-xl">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="carat-high">Carat: High to Low</SelectItem>
                <SelectItem value="most-bids">Most Bids</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 rounded-xl">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-display">Filter Diamonds</SheetTitle>
                  <SheetDescription>
                    Refine your search with advanced filters
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-8">
                  {/* Price Range */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Price Range</Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={100000}
                      step={1000}
                      className="mt-2"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Carat Range */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Carat Weight</Label>
                    <Slider
                      value={caratRange}
                      onValueChange={setCaratRange}
                      min={0}
                      max={10}
                      step={0.1}
                      className="mt-2"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{caratRange[0]} ct</span>
                      <span>{caratRange[1]} ct</span>
                    </div>
                  </div>

                  {/* Shape */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Shape</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {shapes.map((shape) => (
                        <div key={shape} className="flex items-center gap-2">
                          <Checkbox
                            id={shape}
                            checked={selectedShapes.includes(shape)}
                            onCheckedChange={() => toggleShape(shape)}
                          />
                          <Label htmlFor={shape} className="text-sm cursor-pointer">
                            {shape}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Color</Label>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <Badge
                          key={color}
                          variant={selectedColors.includes(color) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setSelectedColors(prev =>
                            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
                          )}
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Clarity */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Clarity</Label>
                    <div className="flex flex-wrap gap-2">
                      {clarities.map((clarity) => (
                        <Badge
                          key={clarity}
                          variant={selectedClarities.includes(clarity) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setSelectedClarities(prev =>
                            prev.includes(clarity) ? prev.filter(c => c !== clarity) : [...prev, clarity]
                          )}
                        >
                          {clarity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={clearFilters} className="flex-1">
                      Clear All
                    </Button>
                    <Button className="btn-premium text-primary-foreground flex-1">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* View Toggle */}
            <div className="flex rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-medium text-primary">{listings.length}</span> diamonds
          </p>
          {(selectedShapes.length > 0 || selectedColors.length > 0 || selectedClarities.length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-champagne">
              Clear all filters
            </Button>
          )}
        </div>

        {/* Listings Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }
        >
          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {viewMode === "grid" ? (
                <Card className="card-premium overflow-hidden group cursor-pointer">
                  {/* Image */}
                  <div className="aspect-square bg-gradient-to-br from-diamond-shimmer to-pearl relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Diamond className="h-20 w-20 text-champagne/30" />
                    </div>
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Button size="icon" variant="secondary" className="rounded-full">
                        <Eye className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={listing.trending 
                        ? "bg-emerald-500/90 text-white" 
                        : "bg-muted/90"
                      }>
                        {listing.trending ? (
                          <><TrendingUp className="h-3 w-3 mr-1" /> Hot</>
                        ) : "New"}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display text-lg font-semibold text-primary">
                        {listing.name}
                      </h3>
                      <div className={`flex items-center gap-1 text-sm ${
                        listing.trending ? "text-emerald-600" : "text-rose-500"
                      }`}>
                        {listing.trending ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {listing.change}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <Badge variant="secondary">{listing.carat}ct</Badge>
                      <Badge variant="secondary">{listing.color}</Badge>
                      <Badge variant="secondary">{listing.clarity}</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{listing.seller}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="font-display text-xl font-semibold text-primary">
                        ${listing.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {listing.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Filter className="h-3 w-3" />
                          {listing.bids}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="card-premium p-4">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-diamond-shimmer to-pearl flex items-center justify-center flex-shrink-0">
                      <Diamond className="h-10 w-10 text-champagne/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-primary">
                            {listing.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{listing.seller}</p>
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${
                          listing.trending ? "text-emerald-600" : "text-rose-500"
                        }`}>
                          {listing.trending ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {listing.change}
                        </div>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <Badge variant="secondary">{listing.carat}ct</Badge>
                        <Badge variant="secondary">{listing.color}</Badge>
                        <Badge variant="secondary">{listing.clarity}</Badge>
                        <Badge variant="secondary">{listing.cut}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-2xl font-semibold text-primary">
                        ${listing.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {listing.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Filter className="h-4 w-4" />
                          {listing.bids} bids
                        </span>
                      </div>
                    </div>
                    <Button className="btn-champagne text-primary">
                      Place Bid
                    </Button>
                  </div>
                </Card>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
