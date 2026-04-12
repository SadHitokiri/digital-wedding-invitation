"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import HeartLine from "./HeartLine";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiInstance = useRef<any>(null);
  const isConfettiFired = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    confettiInstance.current = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });
  }, []);

  const fireConfetti = () => {
    if (isConfettiFired.current) return;
    isConfettiFired.current = true;

    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#3F5F45", "#A67C52", "#D6E2D3", "#FFFFFF"];

    const frame = () => {
      confettiInstance.current?.({
        particleCount: 4,
        angle: 60,
        spread: 120,
        startVelocity: 45,
        gravity: 0.5,
        scalar: 1.2,
        origin: { x: 0 },
        colors,
      });

      confettiInstance.current?.({
        particleCount: 4,
        angle: 120,
        spread: 120,
        startVelocity: 45,
        gravity: 0.5,
        scalar: 1.2,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden text-[#5A4634]">
      {/* 🎉 canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <HeartLine />

      {/* фон blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#D6E2D3] rounded-full blur-3xl opacity-30"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-[#EDE6DC] rounded-full blur-3xl opacity-30"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* 📸 ФОТКИ СВЕРХУ */}
      <div className="flex justify-between items-center w-full max-w-md mb-6 px-6 z-10">
        {/* левая */}
        <motion.div
          initial={{ opacity: 0, y: -40, rotate: -12 }}
          animate={{ opacity: 1, y: 0, rotate: -6 }}
          transition={{ delay: 1.2, duration: 1.2 }}
        >
          <div className="bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <img
              src="/Veronika-child2.jpg"
              alt="Veronika"
              className="w-24 h-24 md:w-28 md:h-28 object-cover"
            />
          </div>
        </motion.div>

        {/* правая */}
        <motion.div
          initial={{ opacity: 0, y: -40, rotate: 12 }}
          animate={{ opacity: 1, y: 0, rotate: 6 }}
          transition={{ delay: 1.4, duration: 1.2 }}
        >
          <div className="bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <img
              src="/Dima-child2.jpg"
              alt="Dima"
              className="w-24 h-24 md:w-28 md:h-28 object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* 💍 заголовок */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-serif mb-6 z-10"
        onAnimationStart={fireConfetti}
      >
        Вероника & Дмитрий
      </motion.h1>

      {/* ✨ подзаголовок */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-2xl md:text-3xl mb-4 tracking-wide z-10"
      >
        Мы женимся
      </motion.h2>

      {/* линия */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="h-px w-24 bg-[#5A4634] mx-auto mb-6 z-10"
      />

      {/* текст */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="text-lg opacity-80 z-10"
      >
        И приглашаем вас разделить этот день
      </motion.p>

      {/* 📅 дата В САМОМ НИЗУ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="mt-8 text-sm tracking-widest text-[#5A4634]/70 z-20"
      >
        15 · 08 · 2026
      </motion.div>
    </section>
  );
}