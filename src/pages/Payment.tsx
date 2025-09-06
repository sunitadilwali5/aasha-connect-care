import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['cardNumber', 'expiryMonth', 'expiryYear', 'cvv', 'nameOnCard', 'billingAddress', 'city', 'state', 'zipCode'];
    const isValid = requiredFields.every(field => paymentDetails[field as keyof typeof paymentDetails]);
    
    if (!isValid) {
      toast({
        title: "Required Information Missing",
        description: "Please fill in all payment details.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to Aasha! 🎉",
        description: "Your payment was successful. You'll receive a call from Aasha within 24 hours.",
      });
      navigate('/welcome-success');
    }, 3000);
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString().padStart(2, '0'),
    label: (i + 1).toString().padStart(2, '0')
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => ({
    value: (currentYear + i).toString(),
    label: (currentYear + i).toString()
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-warm-cream p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-sage-dark mb-4">Aasha</h1>
          <h2 className="text-2xl font-light text-foreground mb-2">
            Complete Your Subscription
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg font-medium text-sage-dark mb-4">
            <span className="text-2xl">🎉</span>
            <span>Launch Promo - $9.99/month</span>
          </div>
        </div>

        <Card className="p-8 bg-card/60 backdrop-blur-sm border-sage-light/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-foreground">Payment Information</h3>
              
              <div>
                <Label htmlFor="cardNumber" className="text-base font-medium">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                    setPaymentDetails(prev => ({ ...prev, cardNumber: value }));
                  }}
                  placeholder="1234 5678 9012 3456"
                  className="text-lg py-3"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth" className="text-base font-medium">Month</Label>
                  <Select 
                    value={paymentDetails.expiryMonth} 
                    onValueChange={(value) => setPaymentDetails(prev => ({ ...prev, expiryMonth: value }))}
                  >
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expiryYear" className="text-base font-medium">Year</Label>
                  <Select 
                    value={paymentDetails.expiryYear} 
                    onValueChange={(value) => setPaymentDetails(prev => ({ ...prev, expiryYear: value }))}
                  >
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-base font-medium">CVV</Label>
                  <Input
                    id="cvv"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    placeholder="123"
                    className="text-lg py-3"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="nameOnCard" className="text-base font-medium">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  value={paymentDetails.nameOnCard}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, nameOnCard: e.target.value }))}
                  placeholder="Enter name as it appears on card"
                  className="text-lg py-3"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-foreground">Billing Address</h3>
              
              <div>
                <Label htmlFor="billingAddress" className="text-base font-medium">Address</Label>
                <Input
                  id="billingAddress"
                  value={paymentDetails.billingAddress}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, billingAddress: e.target.value }))}
                  placeholder="123 Main Street"
                  className="text-lg py-3"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-base font-medium">City</Label>
                  <Input
                    id="city"
                    value={paymentDetails.city}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                    className="text-lg py-3"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-base font-medium">State</Label>
                  <Input
                    id="state"
                    value={paymentDetails.state}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="State"
                    className="text-lg py-3"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-base font-medium">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={paymentDetails.zipCode}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, zipCode: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
                  placeholder="12345"
                  className="text-lg py-3"
                  maxLength={5}
                  required
                />
              </div>
            </div>

            <div className="bg-sage-light/20 p-4 rounded-lg">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Monthly Subscription:</span>
                <span className="font-bold text-sage-dark">$9.99/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                You can cancel anytime. Your first call will arrive within 24 hours of payment.
              </p>
            </div>

            <div className="flex gap-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => navigate('/privacy-policy')}
                className="flex-1"
              >
                ← Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Processing Payment..." : "Complete Subscription - $9.99"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Payment;