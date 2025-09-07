import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const PersonalDetails = () => {
  const [searchParams] = useSearchParams();
  const forWhom = searchParams.get('for') || 'myself';
  const navigate = useNavigate();
  const { toast } = useToast();

  // User details
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    birthDate: null as Date | null,
    preferredLanguage: "",
    email: ""
  });

  // Loved one details (if applicable)
  const [lovedOneDetails, setLovedOneDetails] = useState({
    fullName: "",
    phoneNumber: "",
    birthDate: null as Date | null,
    relationship: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredUserFields = ['fullName', 'preferredLanguage', 'email'];
    const userValid = requiredUserFields.every(field => userDetails[field as keyof typeof userDetails]) && userDetails.birthDate;
    
    if (!userValid) {
      toast({
        title: "Required Information Missing",
        description: "Please fill in all your personal details.",
        variant: "destructive"
      });
      return;
    }

    if (forWhom === 'loved-one') {
      const requiredLovedOneFields = ['fullName', 'phoneNumber', 'relationship'];
      const lovedOneValid = requiredLovedOneFields.every(field => lovedOneDetails[field as keyof typeof lovedOneDetails]) && lovedOneDetails.birthDate;
      
      if (!lovedOneValid) {
        toast({
          title: "Required Information Missing",
          description: "Please fill in all details for your loved one.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate saving details
    setTimeout(() => {
      setIsLoading(false);
      
      if (forWhom === 'loved-one') {
        toast({
          title: "Verification Code Sent",
          description: `A verification code has been sent to ${lovedOneDetails.fullName} at ${lovedOneDetails.phoneNumber}.`,
        });
      }
      
      navigate('/privacy-policy');
    }, 2000);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-warm-cream p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-sage-dark mb-4">Aasha</h1>
          <h2 className="text-2xl font-light text-foreground mb-2">
            Personal Details
          </h2>
          <p className="text-muted-foreground">
            Help us personalize your Aasha experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* User Details Section */}
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-sage-light/30">
            <h3 className="text-xl font-medium text-foreground mb-6">Tell us about yourself</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="userFullName" className="text-base font-medium">Full Name</Label>
                <Input
                  id="userFullName"
                  value={userDetails.fullName}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  className="text-lg py-3"
                  required
                />
              </div>

              <div>
                <Label htmlFor="userBirthDate" className="text-base font-medium">Birth Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal text-lg py-3",
                        !userDetails.birthDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {lovedOneDetails.birthDate ? format(lovedOneDetails.birthDate, "MM/dd/yyyy") : <span>MM/DD/YYYY</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={userDetails.birthDate || undefined}
                      onSelect={(date) => setUserDetails(prev => ({ ...prev, birthDate: date || null }))}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="preferredLanguage" className="text-base font-medium">Preferred Language</Label>
                <Select 
                  value={userDetails.preferredLanguage} 
                  onValueChange={(value) => setUserDetails(prev => ({ ...prev, preferredLanguage: value }))}
                >
                  <SelectTrigger className="text-lg py-3">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border shadow-lg z-50">
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="userEmail" className="text-base font-medium">Email Address</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                  className="text-lg py-3"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Loved One Details Section (if applicable) */}
          {forWhom === 'loved-one' && (
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-terracotta/30">
              <h3 className="text-xl font-medium text-foreground mb-6">Tell us about your loved one</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="lovedOneFullName" className="text-base font-medium">Loved One's Full Name</Label>
                  <Input
                    id="lovedOneFullName"
                    value={lovedOneDetails.fullName}
                    onChange={(e) => setLovedOneDetails(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter their full name"
                    className="text-lg py-3"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lovedOnePhone" className="text-base font-medium">Loved One's Phone Number</Label>
                  <Input
                    id="lovedOnePhone"
                    type="tel"
                    value={lovedOneDetails.phoneNumber}
                    onChange={(e) => setLovedOneDetails(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    className="text-lg py-3"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lovedOneBirthDate" className="text-base font-medium">Birth Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal text-lg py-3",
                          !lovedOneDetails.birthDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {lovedOneDetails.birthDate ? format(lovedOneDetails.birthDate, "MM/dd/yyyy") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={lovedOneDetails.birthDate || undefined}
                        onSelect={(date) => setLovedOneDetails(prev => ({ ...prev, birthDate: date || null }))}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="relationship" className="text-base font-medium">Your Relationship</Label>
                  <Select 
                    value={lovedOneDetails.relationship} 
                    onValueChange={(value) => setLovedOneDetails(prev => ({ ...prev, relationship: value }))}
                  >
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="grandchild">Grandchild</SelectItem>
                      <SelectItem value="grandparent">Grandparent</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="caregiver">Caregiver</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {forWhom === 'loved-one' && (
                  <div className="bg-terracotta/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> A verification code will be sent to your loved one's phone number to confirm their consent for AI voice calls.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          <div className="flex gap-4">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => navigate('/verify-otp')}
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
              {isLoading ? "Saving..." : "Continue to Privacy Policy"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;