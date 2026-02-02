import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Diamond, ShieldCheck, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email";
  
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
      // For demo, accept "123456" as valid OTP
      if (otp === "123456") {
        setIsVerified(true);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    }, 1500);
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setError("");
    setOtp("");
    console.log("Resending OTP to:", email);
  };

  const handleContinue = () => {
    navigate("/reset-password");
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
          {!isVerified ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-champagne/10 flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8 text-champagne" />
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-3">
                  Verify Your Email
                </h1>
                <p className="text-muted-foreground">
                  Enter the 6-digit code sent to
                </p>
                <p className="font-medium text-primary mt-1">{email}</p>
              </div>

              {/* OTP Input */}
              <div className="flex justify-center mb-6">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setError("");
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                    <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                    <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                    <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                    <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm text-center mb-4"
                >
                  {error}
                </motion.p>
              )}

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                disabled={isLoading || otp.length !== 6}
                className="btn-premium text-primary-foreground w-full h-12 text-base mb-4"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ◇
                    </motion.span>
                    Verifying...
                  </span>
                ) : (
                  "Verify Code"
                )}
              </Button>

              {/* Resend Timer */}
              <div className="text-center">
                {canResend ? (
                  <button
                    onClick={handleResend}
                    className="text-champagne hover:underline font-medium text-sm"
                  >
                    Resend verification code
                  </button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Resend code in{" "}
                    <span className="font-medium text-primary">{countdown}s</span>
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              {/* Back Link */}
              <Link
                to="/resend-otp"
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Resend using another email
              </Link>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center"
                >
                  <CheckCircle className="h-10 w-10 text-emerald-500" />
                </motion.div>
                <h2 className="font-display text-2xl font-semibold text-primary mb-3">
                  Email Verified!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Your email has been successfully verified. You can now reset your password.
                </p>
                <Button
                  onClick={handleContinue}
                  className="btn-premium text-primary-foreground w-full h-12 text-base"
                >
                  Continue to Reset Password
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
