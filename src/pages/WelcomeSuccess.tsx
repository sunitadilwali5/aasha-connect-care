import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const WelcomeSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-warm-cream flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-sage-dark mb-4">Aasha</h1>
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-light text-foreground mb-4">
            Welcome to Your AI Companion Journey!
          </h2>
        </div>

        <Card className="p-8 bg-card/60 backdrop-blur-sm border-sage-light/30 space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-medium text-sage-dark">What happens next?</h3>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-sage-light/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-medium">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">First Call Within 24 Hours</h4>
                  <p className="text-muted-foreground">Aasha will call you to introduce herself and learn about your preferences.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-sage-light/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-medium">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Personalized Experience</h4>
                  <p className="text-muted-foreground">Aasha will learn your interests, schedule, and communication style.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-sage-light/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-medium">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Regular Companionship</h4>
                  <p className="text-muted-foreground">Enjoy meaningful conversations and emotional support whenever you need it.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sage-light/20 p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Important Reminders:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Keep your phone nearby - Aasha may call at any time during your preferred hours</li>
              <li>• You can always ask Aasha to call more or less frequently</li>
              <li>• Your subscription can be cancelled anytime</li>
              <li>• Customer support is available 24/7 if you need assistance</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button 
              variant="hero" 
              size="lg"
              className="w-full"
              onClick={() => window.location.href = 'tel:+1-800-AASHA-1'}
            >
              Call Customer Support
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                onClick={() => window.open('/help', '_blank')}
              >
                Help Center
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('/faq', '_blank')}
              >
                FAQs
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Thank you for choosing Aasha. We're excited to be part of your daily life!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSuccess;