import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { createProfile, createLovedOne, createCaregiver, testConnection, createPhoneVerification } from "@/lib/supabase";

const PersonalDetails = () => {
  const [searchParams] = useSearchParams();
  const forWhom = searchParams.get('for') || 'myself';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    setUserData, 
    setLovedOneData, 
    phoneNumber: contextPhoneNumber,
    setProfileId 
  } = useAppContext();

  // User details
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    preferredLanguage: "",
    relationship: ""
  });

  // Loved one details (if applicable)
  const [lovedOneDetails, setLovedOneDetails] = useState({
    fullName: "",
    phoneNumber: "",
    birthDate: "",
    relationship: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const formatDateInput = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/DD/YYYY
    if (digits.length >= 8) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    } else if (digits.length >= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const isValidDate = (dateString: string) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!regex.test(dateString)) return false;
    
    const [month, day, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    return date.getFullYear() === year &&
           date.getMonth() === month - 1 &&
           date.getDate() === day &&
           year >= 1900 &&
           year <= new Date().getFullYear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started');
    
    let requiredUserFields: string[];
    let userValid: boolean;
    
    if (forWhom === 'myself') {
      requiredUserFields = ['fullName', 'email', 'birthDate', 'preferredLanguage'];
      userValid = requiredUserFields.every(field => userDetails[field as keyof typeof userDetails]) && isValidDate(userDetails.birthDate);
    } else {
      requiredUserFields = ['fullName', 'email', 'relationship'];
      userValid = requiredUserFields.every(field => userDetails[field as keyof typeof userDetails]);
    }
    
    if (!userValid) {
      toast({
        title: "Required Information Missing",
        description: forWhom === 'myself' 
          ? "Please fill in all your personal details with a valid birth date (MM/DD/YYYY)."
          : "Please fill in all required fields including your relationship to your loved one.",
        variant: "destructive"
      });
      return;
    }

    if (forWhom === 'loved-one') {
      const requiredLovedOneFields = ['fullName', 'phoneNumber', 'relationship'];
      const lovedOneValid = requiredLovedOneFields.every(field => lovedOneDetails[field as keyof typeof lovedOneDetails]) && lovedOneDetails.birthDate && isValidDate(lovedOneDetails.birthDate);
      
      const caregiverValid = userDetails.relationship;
      
      if (!lovedOneValid || !caregiverValid) {
        toast({
          title: "Required Information Missing",
          description: "Please fill in all details including your relationship to your loved one.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      // Test database connection first
      const connectionTest = await testConnection();
      console.log('Database connection test result:', connectionTest);

      // Create profile
      const profileData = {
        user_id: null, // Allow null for testing
        full_name: userDetails.fullName,
        birth_date: forWhom === 'myself' ? formatDateForDB(userDetails.birthDate) : null,
        email: userDetails.email,
        preferred_language: forWhom === 'myself' ? userDetails.preferredLanguage : null,
        phone: contextPhoneNumber || null,
        setup_for: forWhom as 'myself' | 'loved-one',
      };

      console.log('Creating profile with data:', profileData);
      const profile = await createProfile(profileData);
      setProfileId(profile.id);

      // Store user data in context
      setUserData({
        ...userDetails,
        phone: contextPhoneNumber || undefined,
        setupFor: forWhom as 'myself' | 'loved-one',
      });

      // Create loved one record if applicable
      if (forWhom === 'loved-one') {
        const lovedOneRecord = {
          profile_id: profile.id,
          full_name: lovedOneDetails.fullName,
          phone: lovedOneDetails.phoneNumber,
          birth_date: formatDateForDB(lovedOneDetails.birthDate),
          relationship: lovedOneDetails.relationship,
        };

        await createLovedOne(lovedOneRecord);
        setLovedOneData(lovedOneDetails);

        // Create caregiver record
        const caregiverRecord = {
          full_name: userDetails.fullName,
          phone: contextPhoneNumber || '',
          email: userDetails.email,
          relationship: userDetails.relationship,
          loved_one_profile_id: profile.id,
        };

        await createCaregiver(caregiverRecord);

        toast({
          title: "Profile Created Successfully",
          description: `Profile created for ${lovedOneDetails.fullName}.`,
        });
      } else {
        toast({
          title: "Profile Created Successfully",
          description: "Your profile has been created successfully.",
        });
      }

      setIsLoading(false);
      navigate('/privacy-policy');
    } catch (error) {
      setIsLoading(false);
      console.error('Error creating profile:', error);
      
      toast({
        title: "Error Creating Profile",
        description: `Database error: ${error.message || 'Unknown error'}. Please check the console for details.`,
        variant: "destructive"
      });
    }
  };

  const formatDateForDB = (dateString: string) => {
    const [month, day, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
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
            <h3 className="text-xl font-medium text-foreground mb-6">
              {forWhom === 'loved-one' ? 'Please share your information' : 'Please fill your information here'}
            </h3>
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

              {forWhom === 'myself' && (
                <>
                  <div>
                    <Label htmlFor="userBirthDate" className="text-base font-medium">Date of Birth</Label>
                    <Input
                      id="userBirthDate"
                      value={userDetails.birthDate}
                      onChange={(e) => {
                        const formatted = formatDateInput(e.target.value);
                        setUserDetails(prev => ({ ...prev, birthDate: formatted }));
                      }}
                      placeholder="MM/DD/YYYY"
                      className="text-lg py-3"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="userLanguage" className="text-base font-medium">Language Preference</Label>
                    <Select 
                      value={userDetails.preferredLanguage} 
                      onValueChange={(value) => setUserDetails(prev => ({ ...prev, preferredLanguage: value }))}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select your preferred language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="userPhone" className="text-base font-medium">Phone Number</Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      id="userPhone"
                      type="tel"
                      value={contextPhoneNumber || ''}
                      placeholder="+1 (555) 123-4567"
                      className="text-lg py-3 flex-1"
                      disabled={true}
                      required
                    />
                  </div>
                </div>
              </div>

              {forWhom === 'loved-one' && (
                <div>
                  <Label htmlFor="caregiverRelationship" className="text-base font-medium">Your Relationship to Loved One</Label>
                  <Select 
                    value={userDetails.relationship || ''} 
                    onValueChange={(value) => setUserDetails(prev => ({ ...prev, relationship: value }))}
                  >
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="Select your relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="grandchild">Grandchild</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="caregiver">Caregiver</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

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
                  <Input
                    id="lovedOneBirthDate"
                    value={lovedOneDetails.birthDate}
                    onChange={(e) => {
                      const formatted = formatDateInput(e.target.value);
                      setLovedOneDetails(prev => ({ ...prev, birthDate: formatted }));
                    }}
                    placeholder="MM/DD/YYYY"
                    className="text-lg py-3"
                    maxLength={10}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="relationship" className="text-base font-medium">Relationship</Label>
                  <Select 
                    value={lovedOneDetails.relationship} 
                    onValueChange={(value) => setLovedOneDetails(prev => ({ ...prev, relationship: value }))}
                  >
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="Select your relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="grandparent">Grandparent</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
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