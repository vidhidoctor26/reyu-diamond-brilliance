import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  User, 
  Building,
  CreditCard,
  Camera,
  ArrowRight,
  X
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type KYCStatus = "pending" | "approved" | "rejected" | "not_started";

const KYC = () => {
  const [status] = useState<KYCStatus>("pending");
  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState({
    idFront: null as File | null,
    idBack: null as File | null,
    selfie: null as File | null,
    businessLicense: null as File | null,
    addressProof: null as File | null,
  });

  const steps = [
    { number: 1, title: "Personal ID", icon: User },
    { number: 2, title: "Business Docs", icon: Building },
    { number: 3, title: "Verification", icon: Camera },
  ];

  const progress = status === "approved" ? 100 : status === "pending" ? 75 : status === "rejected" ? 0 : 25;

  const handleFileChange = (key: keyof typeof documents, file: File | null) => {
    setDocuments({ ...documents, [key]: file });
  };

  const renderStatusBanner = () => {
    switch (status) {
      case "approved":
        return (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-emerald-600">Verification Approved</h3>
                <p className="text-emerald-600/70">Your identity has been verified. You have full access to all trading features.</p>
              </div>
            </div>
          </motion.div>
        );
      case "pending":
        return (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-champagne/10 border border-champagne/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-champagne/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-champagne" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-primary">Verification In Progress</h3>
                <p className="text-muted-foreground">Your documents are being reviewed. This usually takes 24-48 hours.</p>
              </div>
            </div>
          </motion.div>
        );
      case "rejected":
        return (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-destructive/10 border border-destructive/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-destructive">Verification Rejected</h3>
                <p className="text-destructive/70">Your documents could not be verified. Please review the reason below and resubmit.</p>
                <p className="text-sm mt-2 p-3 rounded-lg bg-destructive/5 text-destructive">
                  <strong>Reason:</strong> The uploaded ID document is blurry. Please upload a clear, high-resolution image.
                </p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const FileUploadCard = ({ 
    title, 
    description, 
    fileKey, 
    icon: Icon 
  }: { 
    title: string; 
    description: string; 
    fileKey: keyof typeof documents;
    icon: React.ElementType;
  }) => {
    const file = documents[fileKey];
    
    return (
      <div className={`p-6 rounded-2xl border-2 border-dashed transition-colors ${
        file ? "border-emerald-500 bg-emerald-500/5" : "border-border hover:border-champagne"
      }`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            file ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
          }`}>
            {file ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-primary mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            
            {file ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <span className="text-sm text-primary truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFileChange(fileKey, null)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Label htmlFor={fileKey} className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-champagne transition-colors w-fit">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm font-medium">Choose File</span>
                </div>
                <Input
                  id={fileKey}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(fileKey, e.target.files?.[0] || null)}
                />
              </Label>
            )}
          </div>
        </div>
      </div>
    );
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
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-champagne" />
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary">
              KYC Verification
            </h1>
          </div>
          <p className="text-muted-foreground">
            Complete your identity verification to unlock all trading features
          </p>
        </motion.div>

        {/* Status Banner */}
        {renderStatusBanner()}

        {/* Progress */}
        <Card className="card-premium mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-primary">Verification Progress</span>
              <Badge variant={status === "approved" ? "default" : "secondary"}>
                {progress}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
            
            {/* Steps */}
            <div className="flex items-center justify-between mt-8">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center">
                  <div className={`flex flex-col items-center ${
                    step >= s.number ? "text-primary" : "text-muted-foreground"
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step > s.number 
                        ? "bg-emerald-500 text-white"
                        : step === s.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}>
                      {step > s.number ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <s.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-xs font-medium">{s.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-0.5 mx-4 ${
                      step > s.number ? "bg-emerald-500" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {status !== "approved" && status !== "pending" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {step === 1 && (
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Personal Identification</CardTitle>
                  <CardDescription>
                    Upload a valid government-issued ID (Passport, Driver's License, or National ID)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FileUploadCard
                    title="ID Front"
                    description="Upload the front side of your ID document"
                    fileKey="idFront"
                    icon={CreditCard}
                  />
                  <FileUploadCard
                    title="ID Back"
                    description="Upload the back side of your ID document"
                    fileKey="idBack"
                    icon={CreditCard}
                  />
                  
                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!documents.idFront || !documents.idBack}
                      className="btn-premium text-primary-foreground"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Business Documentation</CardTitle>
                  <CardDescription>
                    Upload documents to verify your business identity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FileUploadCard
                    title="Business License"
                    description="Upload your business registration or license"
                    fileKey="businessLicense"
                    icon={FileText}
                  />
                  <FileUploadCard
                    title="Proof of Address"
                    description="Utility bill or bank statement (not older than 3 months)"
                    fileKey="addressProof"
                    icon={Building}
                  />
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!documents.businessLicense || !documents.addressProof}
                      className="btn-premium text-primary-foreground"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Selfie Verification</CardTitle>
                  <CardDescription>
                    Take a selfie holding your ID document for identity verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FileUploadCard
                    title="Selfie with ID"
                    description="Take a clear photo of yourself holding your ID next to your face"
                    fileKey="selfie"
                    icon={Camera}
                  />

                  <div className="p-4 rounded-xl bg-muted/50">
                    <h4 className="font-medium text-primary mb-2">Photo Requirements:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Your face should be clearly visible
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Hold your ID next to your face
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ID details should be readable
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Good lighting, no shadows
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      disabled={!documents.selfie}
                      className="btn-premium text-primary-foreground"
                    >
                      Submit for Review
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="card-premium">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-1">Your Data is Secure</h4>
                  <p className="text-sm text-muted-foreground">
                    All documents are encrypted and stored securely. We comply with international data protection regulations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-premium">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-champagne/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-champagne" />
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-1">Quick Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    Most verifications are completed within 24-48 hours. You'll receive an email once your status is updated.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KYC;
