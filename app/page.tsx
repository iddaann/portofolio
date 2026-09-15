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
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import ScrollExit from "./components/ScrollExit";
import { LoadingProvider } from "./context/LoadingContext";

export default function Home() {
  return (
    <LoadingProvider>
      <a
        href="#content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-full border border-white/20 bg-black/80 px-4 py-2 text-sm text-white focus:not-sr-only focus:outline-none"
      >
        Skip to content
      </a>

      <main id="content" className="relative isolate min-h-screen overflow-hidden bg-[#03040a] text-white">
        <Preloader />
        <ScrollProgress />
        <StarBackground />

        <div className="relative">
          <HeroVisual />
          <Hero />
          <Intro />
        </div>

        <ScrollExit style="soft">
          <Works />
        </ScrollExit>

        <ScrollExit style="zoom">
          <TechStack />
        </ScrollExit>

        <ScrollExit style="fade">
          <NameStars />
        </ScrollExit>

        <ScrollExit style="drift">
          <Journey />
        </ScrollExit>

        <ScrollExit style="soft">
          <About />
        </ScrollExit>

        <Contact />
      </main>
    </LoadingProvider>
  );
}
