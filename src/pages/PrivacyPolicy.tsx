import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PrivacyPolicy = () => {
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [searchParams] = useSearchParams();
  const forWhom = searchParams.get('for') || 'myself';
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (!acceptedPolicy) {
      toast({
        title: "Agreement Required",
        description: "Please read and agree to the checkbox below to continue.",
        variant: "destructive"
      });
      return;
    }
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-warm-cream p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-light text-sage-dark">Meela</h1>
            <span className="text-sm font-medium text-muted-foreground bg-sage-light/30 px-2 py-1 rounded text-xs">Beta</span>
          </div>
          <h2 className="text-2xl font-light text-foreground mb-2">
            An AI companion for the golden years
          </h2>
        </div>

        <Card className="p-8 bg-card/60 backdrop-blur-sm border-sage-light/30 space-y-6">
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Please read and agree to the checkbox below.
            </p>
            <Button 
              disabled={!acceptedPolicy}
              onClick={handleContinue}
              className="w-full mb-6"
              size="lg"
            >
              Continue
            </Button>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="privacy-agreement" 
              checked={acceptedPolicy}
              onCheckedChange={(checked) => setAcceptedPolicy(checked as boolean)}
              className="mt-1"
            />
            <div className="space-y-4 text-sm text-muted-foreground">
              <Label htmlFor="privacy-agreement" className="text-sm font-normal cursor-pointer leading-relaxed">
                By checking this box you agree to be bound by this{" "}
                <button
                  type="button"
                  className="text-primary underline hover:no-underline"
                  onClick={() => window.open('/terms', '_blank')}
                >
                  Terms of Use
                </button>
                {" "}and you agree to our{" "}
                <button
                  type="button"
                  className="text-primary underline hover:no-underline"
                  onClick={() => window.open('/privacy', '_blank')}
                >
                  Privacy Policy
                </button>
                , and where your loved one is not legally able to agree to the{" "}
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
                {" "}on their behalf, you have the right, authority, and capacity to agree to the{" "}
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
                {" "}on their behalf. You represent that one or more of the following is true:
              </Label>

              <ul className="space-y-3 ml-4">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    You are the subscriber of the phone number where Meela will call your loved 
                    one, and consent to the number receiving recorded AI artificial voice calls.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    You are your loved one's legal guardian or agent with authority, or have power of 
                    attorney, to provide consent on behalf of your loved one to receive recorded AI 
                    artificial voice calls, and you provide such consent.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    Your loved one is competent to provide consent to receive recorded artificial 
                    voice AI calls and has provided such consent, which you are relaying to Meela 
                    Inc. with the approval of your loved one.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-lg font-medium text-sage-dark">
            <span className="text-2xl">🎉</span>
            <span>Launch Promo</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-light text-muted-foreground line-through">$29.95</span>
            <span className="text-3xl font-medium text-sage-dark ml-2">$19.95/month</span>
          </div>
        </div>

        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/personal-details?for=${forWhom}`)}
            className="text-muted-foreground"
          >
            ← Back to Personal Details
          </Button>
        </div>

        <div className="text-center mt-8">
          <button
            className="text-primary underline hover:no-underline text-sm"
            onClick={() => window.open('/faq', '_blank')}
          >
            Have questions? Visit our FAQs →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;