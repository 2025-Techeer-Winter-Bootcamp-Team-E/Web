import { CTASection } from "@/components/llmSearchResult";
import AISearchSection from "@/components/mainPage/AISearchSection";
import FeatureGrid from "@/components/mainPage/FeatureGrid";
import HeroSection from "@/components/mainPage/HeroSection";
import TimerSection from "@/components/mainPage/TimerSection";

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <AISearchSection />
      <TimerSection />
      <FeatureGrid />
      <CTASection />
    </>
  );
};

export default MainPage;
