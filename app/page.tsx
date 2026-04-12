"use client";

import { useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import DressColor from "@/components/DressColors";
import Countdown from "@/components/Countdown";
import RSVPSection from "@/components/RSVPSection";
import SmoothProvider from "@/components/SmoothProvider";
import Rules from "@/components/Rules";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="gradient-bg text-primary">
      {showIntro && (
        <EnvelopeIntro
          onComplete={() => {
            setShowIntro(false);

            setTimeout(() => {
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 50);
          }}
        />
      )}

      <SmoothProvider>
        <div id="content" className="gradient-bg">
          <div className="snap-y snap-mandatory">
            <section id="hero" className="h-screen snap-start">
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