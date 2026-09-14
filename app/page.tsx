import Hero from "./components/Hero";
import HeroVisual from "./components/HeroVisual";
import Intro from "./components/intro";
import Works from "./components/Works";
import TechStack from "./components/TechStack";
import Journey from "./components/Journey";
import NameStars from "./components/NameStars";
import About from "./components/About";
import Contact from "./components/Contact";
import StarBackground from "./components/StarBackground";
import ShootingStars from "./components/ShootingStars";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import ScrollExit from "./components/ScrollExit";
import { LoadingProvider } from "./context/LoadingContext";

export default function Home() {
  return (
    <LoadingProvider>
      <main className="relative isolate min-h-screen overflow-hidden bg-[#03040a] text-white">
        <Preloader />
        <ScrollProgress />
        <StarBackground />
        <ShootingStars />

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

        <ScrollExit>
          <NameStars />
        </ScrollExit>

        <ScrollExit>
          <Journey />
        </ScrollExit>

        <ScrollExit>
          <About />
        </ScrollExit>

        <Contact/>
      </main>
    </LoadingProvider>
  );
}