"use client";

import { useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import Timing from "@/components/Timing";
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="text-green-950/40 text-xs tracking-[0.3em] mb-3">
                  ЛИСТАЙ ВНИЗ
                </span>

                <div className="animate-bounce">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#032e15"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </section>
            <section className="h-screen snap-start">
              <Location />
            </section>
          </div>
          <Timing />

          <DressColor />
          <Rules />
          <Countdown />
        </div>

        <RSVPSection />
      </SmoothProvider>
    </main>
  );
}
