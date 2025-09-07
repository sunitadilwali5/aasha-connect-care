import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Welcome from "./pages/Welcome";
import SetupFor from "./pages/SetupFor";
import PhoneVerification from "./pages/PhoneVerification";
import VerifyOTP from "./pages/VerifyOTP";
import PersonalDetails from "./pages/PersonalDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Payment from "./pages/Payment";
import WelcomeSuccess from "./pages/WelcomeSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/setup-for" element={<SetupFor />} />
            <Route path="/phone-verification" element={<PhoneVerification />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/personal-details" element={<PersonalDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/welcome-success" element={<WelcomeSuccess />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
