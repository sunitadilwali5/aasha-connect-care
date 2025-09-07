import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const forWhom = searchParams.get('for') || 'myself';
  const { toast } = useToast();
  const { setPhoneNumber: setContextPhoneNumber } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !acceptedTerms) {
      toast({
        title: "Required Information Missing",
        description: "Please enter your phone number and accept the terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Store phone number in context
    setContextPhoneNumber(phoneNumber);
    
    // Simulate sending verification code
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Verification Code Sent",
        description: "Please check your phone for the verification code.",
      });
      navigate(`/verify-otp?phone=${encodeURIComponent(phoneNumber)}&for=${forWhom}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-warm-cream flex items-center justify-center p-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-sage-dark mb-4">Aasha</h1>
          <h2 className="text-2xl font-light text-foreground mb-2">
            Phone Verification
          </h2>
          <p className="text-muted-foreground">
            We'll send a verification code to confirm your number
          </p>
        </div>

        <Card className="p-8 bg-card/60 backdrop-blur-sm border-sage-light/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-lg py-3"
                required
              />
              <p className="text-sm text-muted-foreground">
                We'll use this number to send you verification codes and for Aasha to call you
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-primary underline hover:no-underline"
                    onClick={() => window.open('/terms', '_blank')}
                  >
                    Terms of Use
                  </button>
                  {" "}and{" "}
                  <button
                    type="button"
                    className="text-primary underline hover:no-underline"
                    onClick={() => window.open('/privacy', '_blank')}
                  >
                    Privacy Policy
                  </button>
                </Label>
                <p className="text-xs text-muted-foreground">
                  By checking this box, you consent to receive AI voice calls from Aasha
                </p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={!phoneNumber || !acceptedTerms || isLoading}
            >
              {isLoading ? "Sending Code..." : "Send Verification Code"}
            </Button>
          </form>
        </Card>

        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/setup-for')}
            className="text-muted-foreground"
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;