import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Diamond, 
  Upload, 
  Camera, 
  X,
  CheckCircle,
  Info
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const shapes = ["Round", "Princess", "Emerald", "Oval", "Cushion", "Pear", "Marquise", "Heart", "Radiant", "Asscher"];
const colors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const clarities = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"];
const cuts = ["Excellent", "Very Good", "Good", "Fair", "Poor"];
const labs = ["GIA", "AGS", "IGI", "HRD", "EGL"];

const AddInventory = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    shape: "",
    carat: "",
    color: "",
    clarity: "",
    cut: "",
    polish: "",
    symmetry: "",
    fluorescence: "None",
    lab: "",
    certNumber: "",
    price: "",
    description: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate("/inventory");
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/inventory" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">
            Add Diamond to Inventory
          </h1>
          <p className="text-muted-foreground">
            Enter the diamond details to add it to your inventory
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-xl">Diamond Images</CardTitle>
                <CardDescription>
                  Upload high-quality images of your diamond (max 5 images)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Diamond ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <Label htmlFor="images" className="cursor-pointer">
                      <div className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-champagne transition-colors flex flex-col items-center justify-center gap-2">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Add Photo</span>
                      </div>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-xl">Diamond Specifications</CardTitle>
                <CardDescription>
                  Enter the 4Cs and other technical specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="shape">Shape</Label>
                  <Select value={formData.shape} onValueChange={(v) => setFormData({ ...formData, shape: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent>
                      {shapes.map((shape) => (
                        <SelectItem key={shape} value={shape.toLowerCase()}>{shape}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carat">Carat Weight</Label>
                  <Input
                    id="carat"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 2.50"
                    value={formData.carat}
                    onChange={(e) => setFormData({ ...formData, carat: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select value={formData.color} onValueChange={(v) => setFormData({ ...formData, color: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clarity">Clarity</Label>
                  <Select value={formData.clarity} onValueChange={(v) => setFormData({ ...formData, clarity: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select clarity" />
                    </SelectTrigger>
                    <SelectContent>
                      {clarities.map((clarity) => (
                        <SelectItem key={clarity} value={clarity}>{clarity}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cut">Cut</Label>
                  <Select value={formData.cut} onValueChange={(v) => setFormData({ ...formData, cut: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select cut" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuts.map((cut) => (
                        <SelectItem key={cut} value={cut.toLowerCase()}>{cut}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="polish">Polish</Label>
                  <Select value={formData.polish} onValueChange={(v) => setFormData({ ...formData, polish: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select polish" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuts.map((polish) => (
                        <SelectItem key={polish} value={polish.toLowerCase()}>{polish}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symmetry">Symmetry</Label>
                  <Select value={formData.symmetry} onValueChange={(v) => setFormData({ ...formData, symmetry: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select symmetry" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuts.map((symmetry) => (
                        <SelectItem key={symmetry} value={symmetry.toLowerCase()}>{symmetry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fluorescence">Fluorescence</Label>
                  <Select value={formData.fluorescence} onValueChange={(v) => setFormData({ ...formData, fluorescence: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select fluorescence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Faint">Faint</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Strong">Strong</SelectItem>
                      <SelectItem value="Very Strong">Very Strong</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-xl">Certification</CardTitle>
                <CardDescription>
                  Enter the lab certificate details
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lab">Certification Lab</Label>
                  <Select value={formData.lab} onValueChange={(v) => setFormData({ ...formData, lab: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select lab" />
                    </SelectTrigger>
                    <SelectContent>
                      {labs.map((lab) => (
                        <SelectItem key={lab} value={lab}>{lab}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certNumber">Certificate Number</Label>
                  <Input
                    id="certNumber"
                    placeholder="e.g., GIA-123456789"
                    value={formData.certNumber}
                    onChange={(e) => setFormData({ ...formData, certNumber: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="certUpload" className="cursor-pointer">
                    <div className="p-6 rounded-xl border-2 border-dashed border-border hover:border-champagne transition-colors flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Upload Certificate PDF</p>
                        <p className="text-sm text-muted-foreground">PDF format, max 10MB</p>
                      </div>
                    </div>
                    <Input
                      id="certUpload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                    />
                  </Label>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-xl">Pricing & Details</CardTitle>
                <CardDescription>
                  Set your asking price and add any additional notes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Asking Price (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="pl-8 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Notes (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional details about the diamond..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[120px] rounded-xl resize-none"
                  />
                </div>

                <div className="p-4 rounded-xl bg-blue-500/10 flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Your diamond will be added to your private inventory. You can create a listing later to make it visible on the marketplace.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            <Button type="button" variant="outline" onClick={() => navigate("/inventory")} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="btn-premium text-primary-foreground flex-1">
              <CheckCircle className="h-5 w-5 mr-2" />
              Add to Inventory
            </Button>
          </motion.div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddInventory;
