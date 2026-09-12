import Hero from "./components/Hero";
import Intro from "./components/intro";
import StarBackground from "./components/StarBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03040a] text-white">
      <StarBackground />
      <Hero />
      <Intro />
    </main>
  );
}