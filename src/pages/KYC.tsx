import { useState } from "react";
import { motion } from "framer-motion";
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Info,
  Camera,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";

const KYC = () => {
  const navigate = useNavigate();

  const [uploads, setUploads] = useState({
    aadhaar: false,
    pan: false,
    selfie: false,
  });

  const toggleUpload = (key: "aadhaar" | "pan" | "selfie") => {
    setUploads((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const canContinue = uploads.aadhaar && uploads.pan;

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8">
        {/* SINGLE FADE-IN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <Card className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/80 backdrop-blur-md shadow-xl">
            {/* Header */}
            <div className="px-6 pt-8 pb-6 md:px-10">
              <span className="inline-block rounded-full bg-champagne/10 px-3 py-1 text-xs font-medium text-champagne mb-4">
                Step 2 of 3 · Identity
              </span>

              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-champagne/10">
                  <ShieldCheck className="h-5 w-5 text-champagne" />
                </div>
                <h1 className="font-display text-2xl font-semibold text-primary">
                  Verification Documents
                </h1>
              </div>

              <p className="text-muted-foreground text-sm">
                Please upload clear, readable copies of the required documents.
              </p>
            </div>

            {/* Upload Grid – Required Documents */}
            <div className="px-6 md:px-10 grid gap-4 sm:grid-cols-2">
              <UploadBox
                title="Aadhaar Card"
                desc="Front side of your Aadhaar"
                icon={<FileText className="h-6 w-6" />}
                isActive={uploads.aadhaar}
                onClick={() => toggleUpload("aadhaar")}
                required
              />

              <UploadBox
                title="PAN Card"
                desc="Clear copy of your PAN"
                icon={<FileText className="h-6 w-6" />}
                isActive={uploads.pan}
                onClick={() => toggleUpload("pan")}
                required
              />
            </div>

            {/* Optional Selfie Upload - Full Width */}
            <div className="px-6 md:px-10 mt-4">
              <UploadBox
                title="Selfie Verification"
                desc="Take a selfie using your device's camera"
                icon={<Camera className="h-6 w-6" />}
                isActive={uploads.selfie}
                onClick={() => toggleUpload("selfie")}
                optional
              />
              <p className="text-xs text-muted-foreground mt-2 ml-1">
                Optional: Used for faster manual verification
              </p>
            </div>

            {/* Guidelines */}
            <div className="px-6 md:px-10 mt-6">
              <div className="flex gap-3 rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
                <Info className="h-5 w-5 shrink-0 text-champagne" />
                <div>
                  <span className="font-medium text-primary block mb-1">
                    Upload Guidelines
                  </span>
                  • Max size 5MB per file
                  <br />
                  • Documents must be valid and unexpired
                  <br />
                  • All corners must be clearly visible
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-10 py-8">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                className="btn-premium text-primary-foreground w-full sm:w-auto"
                disabled={!canContinue}
                onClick={() => navigate("/kyc/review-submit")}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="link"
                className="text-xs text-muted-foreground underline hover:text-primary"
                onClick={() => navigate("/dashboard")}
              >
                Skip for now
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

/* Upload Tile */
const UploadBox = ({ 
  title, 
  desc, 
  icon, 
  isActive, 
  onClick,
  required,
  optional
}: { 
  title: string;
  desc: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  required?: boolean;
  optional?: boolean;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200",
      isActive
        ? "border-emerald-500 bg-emerald-500/5"
        : "border-border hover:border-champagne hover:bg-champagne/5"
    )}
  >
    <div
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
        isActive
          ? "bg-emerald-500/10 text-emerald-500"
          : "bg-muted text-muted-foreground"
      )}
    >
      {isActive ? <CheckCircle2 className="h-6 w-6" /> : icon}
    </div>

    <div className="flex items-center gap-2">
      <p className="font-medium text-primary">{title}</p>
      {optional && (
        <span className="text-xs text-muted-foreground">(Optional)</span>
      )}
    </div>

    <p className="text-xs text-muted-foreground leading-relaxed">
      {desc}
    </p>

    {isActive && (
      <span className="absolute top-3 right-3 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
        FILE ATTACHED
      </span>
    )}

    {!isActive && (
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
        <UploadCloud className="h-4 w-4" />
        <span>Click to upload</span>
      </div>
    )}
  </div>
);

export default KYC;
