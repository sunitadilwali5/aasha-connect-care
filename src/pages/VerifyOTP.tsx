import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get('phone') || '';
  const forWhom = searchParams.get('for') || 'myself';
  const { toast } = useToast();
  const { phoneNumber: contextPhoneNumber } = useAppContext();
  
  // Use phone number from context if available, otherwise from URL params
  const actualPhoneNumber = contextPhoneNumber || phoneNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    // For testing purposes, accept any 6-digit code
    // In production, you would validate against the actual sent code
    const validTestCodes = ['123123', '000000', '111111', '123456'];
    const isValidCode = validTestCodes.includes(otp) || otp === '123123';
    
    if (!isValidCode) {
      toast({
        title: "Invalid Verification Code",
        description: "Please enter a valid 6-digit code. For testing, use: 123123",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // For testing, we'll skip the database verification record
      // In production, you would create the verification record here
      console.log('Phone verification simulated for:', actualPhoneNumber);

      setIsLoading(false);
      toast({
        title: "Phone Verified Successfully",
        description: "Your phone number has been confirmed.",
      });
      navigate(`/personal-details?for=${forWhom}`);
    } catch (error) {
      setIsLoading(false);
      console.error('Error verifying phone:', error);
      toast({
        title: "Verification Failed",
        description: "There was an error verifying your phone number. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resendCode = () => {
    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your phone.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-warm-cream flex items-center justify-center p-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-sage-dark mb-4">Aasha</h1>
          <h2 className="text-2xl font-light text-foreground mb-2">
            Enter Verification Code
          </h2>
          <p className="text-muted-foreground">
            We sent a 6-digit code to {actualPhoneNumber}
          </p>
        </div>

        <Card className="p-8 bg-card/60 backdrop-blur-sm border-sage-light/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-base font-medium">
                Verification Code
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-2xl py-4 tracking-wider font-mono"
                maxLength={6}
                required
              />
              <p className="text-sm text-muted-foreground text-center">
                Enter the 6-digit code sent to your phone
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={otp.length !== 6 || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Phone Number"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={resendCode}
                className="text-primary hover:underline text-sm"
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </form>
        </Card>

        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/phone-verification?for=${forWhom}`)}
            className="text-muted-foreground"
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;