import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const SetupFor = () => {
  const navigate = useNavigate();

  const handleChoice = (choice: 'myself' | 'loved-one') => {
    navigate(`/phone-verification?for=${choice}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-warm-cream flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-sage-dark mb-4">Aasha</h1>
          <h2 className="text-3xl font-light text-foreground mb-2">
            Who are you setting this up for?
          </h2>
          <p className="text-lg text-muted-foreground">
            This helps us personalize the experience
          </p>
        </div>

        <div className="grid gap-6">
          <Card 
            className="p-8 hover:shadow-card transition-all duration-300 cursor-pointer bg-card/60 backdrop-blur-sm border-sage-light/30"
            onClick={() => handleChoice('myself')}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-sage-light/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-2xl font-medium text-foreground">For Myself</h3>
              <p className="text-muted-foreground text-lg">
                I want to connect with an AI companion for my own companionship and conversations
              </p>
              <Button variant="outline" size="lg" className="w-full">
                Choose This Option
              </Button>
            </div>
          </Card>

          <Card 
            className="p-8 hover:shadow-card transition-all duration-300 cursor-pointer bg-card/60 backdrop-blur-sm border-sage-light/30"
            onClick={() => handleChoice('loved-one')}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-terracotta/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-2xl font-medium text-foreground">For My Loved One</h3>
              <p className="text-muted-foreground text-lg">
                I want to set this up for a family member or friend who could benefit from companionship
              </p>
              <Button variant="outline" size="lg" className="w-full">
                Choose This Option
              </Button>
            </div>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-muted-foreground"
          >
            ← Back to Welcome
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupFor;