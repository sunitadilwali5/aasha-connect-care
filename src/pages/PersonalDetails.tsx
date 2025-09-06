import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PersonalDetails = () => {
  const [searchParams] = useSearchParams();
  const forWhom = searchParams.get('for') || 'myself';
  const navigate = useNavigate();
  const { toast } = useToast();

  // User details
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    birthMonth: "",
    birthDay: "",
    preferredLanguage: "",
    email: ""
  });

  // Loved one details (if applicable)
  const [lovedOneDetails, setLovedOneDetails] = useState({
    fullName: "",
    phoneNumber: "",
    birthMonth: "",
    birthDay: "",
    relationship: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredUserFields = ['fullName', 'birthMonth', 'birthDay', 'preferredLanguage', 'email'];
    const userValid = requiredUserFields.every(field => userDetails[field as keyof typeof userDetails]);
    
    if (!userValid) {
      toast({
        title: "Required Information Missing",
        description: "Please fill in all your personal details.",
        variant: "destructive"
      });
      return;
    }

    if (forWhom === 'loved-one') {
      const requiredLovedOneFields = ['fullName', 'phoneNumber', 'birthMonth', 'birthDay', 'relationship'];
      const lovedOneValid = requiredLovedOneFields.every(field => lovedOneDetails[field as keyof typeof lovedOneDetails]);
      
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

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userBirthMonth" className="text-base font-medium">Birth Month</Label>
                  <Select 
                    value={userDetails.birthMonth} 
                    onValueChange={(value) => setUserDetails(prev => ({ ...prev, birthMonth: value }))}
                  >
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="userBirthDay" className="text-base font-medium">Birth Day</Label>
                  <Select 
                    value={userDetails.birthDay} 
                    onValueChange={(value) => setUserDetails(prev => ({ ...prev, birthDay: value }))}
                  >
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="portuguese">Portuguese</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lovedOneBirthMonth" className="text-base font-medium">Birth Month</Label>
                    <Select 
                      value={lovedOneDetails.birthMonth} 
                      onValueChange={(value) => setLovedOneDetails(prev => ({ ...prev, birthMonth: value }))}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lovedOneBirthDay" className="text-base font-medium">Birth Day</Label>
                    <Select 
                      value={lovedOneDetails.birthDay} 
                      onValueChange={(value) => setLovedOneDetails(prev => ({ ...prev, birthDay: value }))}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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