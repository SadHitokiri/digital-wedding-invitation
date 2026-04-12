import EnvelopeIntro from "@/components/EnvelopeIntro";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import DressColor from "@/components/DressColors";
import Countdown from "@/components/Countdown";
import RSVPSection from "@/components/RSVPSection";
import SmoothProvider from "@/components/SmoothProvider";
import Rules from "@/components/Rules";

export default function Home() {
  return (
    <main className="gradient-bg text-primary">
      <EnvelopeIntro />
      <SmoothProvider>
        <div id="content" className="gradient-bg">
          <div className="snap-y snap-mandatory">
            <section className="h-screen snap-start">
              <Hero />
            </section>

            <section className="h-screen snap-start">
              <Location />
            </section>
          </div>
          <DressColor />
          <Rules />
          <Countdown />
        </div>
        <RSVPSection />
      </SmoothProvider>
    </main>
  );
}
