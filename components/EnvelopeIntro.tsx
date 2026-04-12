"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function EnvelopeIntro() {
  const [stage, setStage] = useState<"idle" | "shake" | "explode" | "done">(
    "idle",
  );

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // 🔥 лёгкая вибрация во время тряски (создаёт напряжение)
  const shakeVibration = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([20, 30, 20, 30, 30]);
    }
  };

  // 💥 мощный взрыв + продолжение
  const explosionVibration = () => {
    if ("vibrate" in navigator) {
      // сначала удар
      navigator.vibrate([90, 40, 140, 40, 220]);

      // потом "дождь конфетти"
      setTimeout(() => {
        navigator.vibrate([
          40, 30, 60, 30, 80, 30,
          100, 40, 120, 40, 150,
        ]);
      }, 250);
    }
  };

  const handleClick = async () => {
    if (stage !== "idle") return;

    // первичный отклик
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }

    setStage("shake");

    // 🔥 добавляем вибрацию на shake
    shakeVibration();

    await sleep(700);

    await sleep(80);

    setStage("explode");

    triggerExplosion();

    setTimeout(() => {
      document.getElementById("content")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 400);

    await sleep(500);
    setStage("done");
  };

  const triggerExplosion = () => {
    // 💥 новая усиленная вибрация
    explosionVibration();

    // основной конфетти
    confetti({
      particleCount: 200,
      spread: 110,
      startVelocity: 45,
      origin: { y: 0.6 },
    });

    // боковые выстрелы
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 75,
      startVelocity: 50,
      origin: { x: 0 },
    });

    confetti({
      particleCount: 100,
      angle: 120,
      spread: 75,
      startVelocity: 50,
      origin: { x: 1 },
    });

    // 🎉 дополнительная "волна" через момент (делает эффект длиннее)
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 30,
        origin: { y: 0.7 },
      });
    }, 250);
  };

  return (
    <section className="h-screen flex items-center justify-center overflow-hidden">
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