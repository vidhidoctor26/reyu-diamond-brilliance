import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Diamond, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const OTPSent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email";

  const handleContinue = () => {
    navigate("/verify-otp", { state: { email } });
  };

  const handleResend = () => {
    // Simulate resend
    console.log("Resending OTP to:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-12 justify-center">
          <Diamond className="h-8 w-8 text-champagne" />
          <span className="font-display text-2xl font-semibold text-primary">Reyu Diamond</span>
        </Link>

        <div className="card-premium p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-champagne/10 flex items-center justify-center"
            >
              <Mail className="h-10 w-10 text-champagne" />
            </motion.div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-3">
              Check Your Email
            </h1>
            <p className="text-muted-foreground">
              We've sent a 6-digit verification code to
            </p>
            <p className="font-medium text-primary mt-1">{email}</p>
          </div>

          {/* Info Card */}
          <div className="p-4 rounded-xl bg-muted/50 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-champagne text-sm font-semibold">i</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  Please check your inbox and enter the verification code on the next screen.
                </p>
                <p>
                  The code will expire in <span className="font-medium text-primary">10 minutes</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="btn-premium text-primary-foreground w-full h-12 text-base mb-4"
          >
            <span className="flex items-center gap-2">
              Enter Verification Code
              <ArrowRight className="h-5 w-5" />
            </span>
          </Button>

          {/* Resend Link */}
          <p className="text-center text-sm text-muted-foreground">
            Didn't receive the email?{" "}
            <button
              onClick={handleResend}
              className="text-champagne hover:underline font-medium"
            >
              Resend Code
            </button>
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Back to Login */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPSent;
