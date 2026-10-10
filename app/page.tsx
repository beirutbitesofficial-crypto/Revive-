import Court from "@/components/Court";
import Footer from "@/components/Footer";
import Gym from "@/components/Gym";
import Hero from "@/components/Hero";
import Inside from "@/components/Inside";
import Marquee from "@/components/Marquee";
import Movement from "@/components/Movement";
import Nav from "@/components/Nav";
import Place from "@/components/Place";
import Pulse from "@/components/Pulse";
import Register from "@/components/Register";
import Studio from "@/components/Studio";
import Visit from "@/components/Visit";
import Wellness from "@/components/Wellness";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee
          className="bg-ink"
          rows={[
            { items: ["The Revive Club", "Beirut", "2026", "You'll feel different here"], tone: "cream", dur: 34 },
            { items: ["Gym", "Court", "Movement", "Recovery", "Classes", "Community"], tone: "volt", reverse: true, dur: 26 },
          ]}
        />
        <Place />
        <Pulse />
        <Inside />
        <Gym />
        <Court />
        <Wellness />
        <Studio />
        <Movement />
        <Marquee
          className="bg-cream"
          rows={[{ items: ["Train", "Play", "Burn", "Recover", "Repeat"], tone: "maroon", dur: 24 }]}
        />
        <Register />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
