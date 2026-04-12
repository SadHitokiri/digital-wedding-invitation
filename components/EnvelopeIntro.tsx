"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function EnvelopeIntro() {
  const [stage, setStage] = useState<"idle" | "shake" | "explode" | "done">(
    "idle",
  );

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const handleClick = async () => {
    if (stage !== "idle") return;

    // 1. лёгкий haptic (первичный отклик)
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }

    setStage("shake");
    await sleep(700);

    // микро-пауза перед взрывом (делает эффект дороже)
    await sleep(80);

    setStage("explode");

    // основной "взрыв"
    triggerExplosion();

    // скролл чуть позже, чтобы не перебивал эффект
    setTimeout(() => {
      document.getElementById("content")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 400);

    await sleep(500);
    setStage("done");
  };

  const triggerExplosion = () => {
    // мощный haptic в момент взрыва
    if (navigator.vibrate) {
      navigator.vibrate([60, 30, 120]);
    }

    // основной конфетти (вперёд)
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 },
    });

    // боковые "выстрелы" — ощущение, что рвётся из конверта
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
    });

    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
    });
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <motion.div
        onClick={handleClick}
        className="cursor-pointer select-none"
        animate={
          stage === "shake"
            ? {
                x: [0, -8, 8, -7, 7, -5, 5, -3, 3, -1, 1, 0],
                rotate: [0, -4, 4, -3, 3, -2, 2, -1, 1, 0],
              }
            : stage === "explode"
              ? {
                  scale: [1, 1.15, 1.8],
                  opacity: [1, 1, 0],
                }
              : {}
        }
        transition={
          stage === "shake"
            ? { duration: 0.7, ease: "easeInOut" }
            : stage === "explode"
              ? { duration: 0.4, ease: "easeOut" }
              : {}
        }
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative w-64 h-40">
          <Image
            src="/envelope.svg"
            alt="envelope"
            fill
            className="object-cover pointer-events-none"
            priority
          />
        </div>

        <p className="text-center mt-4 text-lg font-semibold pointer-events-none">
          Нажми на меня
        </p>
      </motion.div>
    </section>
  );
}
