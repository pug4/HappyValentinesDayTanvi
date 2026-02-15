import PetalAnimation from "./components/PetalAnimation";
import Hero from "./components/Hero";
import LoveLetter from "./components/LoveLetter";
import StreamingLove from "./components/StreamingLove";
import ClosingSection from "./components/ClosingSection";

export default function Home() {
  return (
    <main className="relative">
      {/* Global floating petals */}
      <PetalAnimation />
      
      {/* Section 1: Hero with clickable flowers */}
      <Hero />
      
      {/* Section 2: Valentine's Love Letter */}
      <LoveLetter />
      
      {/* Section 3: AI Streaming Love */}
      <StreamingLove />
      
      {/* Section 4: Closing Statement */}
      <ClosingSection />
    </main>
  );
}
