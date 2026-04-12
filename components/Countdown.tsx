"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const weddingDate = new Date("2026-08-15T16:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  const total = Math.max(diff, 0);

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 text-center">
      <p className="text-sm tracking-[0.3em] text-[#9C8F82] mb-6 uppercase">
        До нашей свадьбы осталось
      </p>

      <motion.div className="flex justify-center gap-8">
        {[
          { label: "дни", value: time.days },
          { label: "часы", value: time.hours },
          { label: "минуты", value: time.minutes },
          { label: "секунды", value: time.seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              key={item.value}
              initial={{ y: 6 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-light text-[#3E3A37]"
            >
              {String(item.value).padStart(2, "0")}
            </motion.div>

            <span className="text-xs tracking-widest text-[#9C8F82] mt-2 uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>

      <div className="mt-10 w-16 h-[1px] bg-[#D6C6B8] mx-auto opacity-60" />
    </section>
  );
}
