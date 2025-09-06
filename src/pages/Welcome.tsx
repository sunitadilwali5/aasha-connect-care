import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-warm-cream flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h1 className="text-6xl font-light text-sage-dark tracking-wide">Aasha</h1>
            <span className="text-sm font-medium text-muted-foreground bg-sage-light/30 px-3 py-1 rounded-full">Beta</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
            An AI companion for the
            <br />
            <span className="text-sage-dark font-normal">golden years</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with a caring AI companion who understands your needs, 
            provides gentle conversation, and brings comfort to your daily life.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-gentle">
            <div className="w-12 h-12 bg-sage-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Gentle Conversation</h3>
            <p className="text-muted-foreground">Enjoy warm, understanding conversations whenever you need them</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-gentle">
            <div className="w-12 h-12 bg-sage-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Voice Calls</h3>
            <p className="text-muted-foreground">Talk naturally with your AI companion through phone calls</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-gentle">
            <div className="w-12 h-12 bg-sage-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Always Available</h3>
            <p className="text-muted-foreground">Your companion is here 24/7, ready to listen and chat</p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-6">
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => navigate("/setup-for")}
            className="text-xl px-12 py-6 font-medium"
          >
            Get Started with Aasha
          </Button>
          <p className="text-sm text-muted-foreground">
            Start your journey to meaningful companionship today
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;