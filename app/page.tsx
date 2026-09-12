import Hero from "./components/Hero";
import HeroVisual from "./components/HeroVisual";
import Intro from "./components/intro";
import Works from "./components/Works";
import TechStack from "./components/TechStack";
import StarBackground from "./components/StarBackground";
import Preloader from "./components/Preloader";
import ScrollExit from "./components/ScrollExit";
import { LoadingProvider } from "./context/LoadingContext";

export default function Home() {
  return (
    <LoadingProvider>
      <main className="relative min-h-screen overflow-hidden bg-[#03040a] text-white">
        <Preloader />
        <StarBackground />

        <div className="relative">
          <HeroVisual />
          <Hero />
          <Intro />
        </div>

        <ScrollExit>
          <Works />
        </ScrollExit>

        <ScrollExit>
          <TechStack />
        </ScrollExit>
      </main>
    </LoadingProvider>
  );
} 