"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Location() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 60]); 

  const addToCalendar = () => {
  const start = "20260815T130000Z";
  const end = "20260815T210000Z";

  const title = encodeURIComponent("Свадьба Вероники и Дмитрия");
  const details = encodeURIComponent(
    "Будем рады видеть вас на нашей свадьбе!",
  );
  const location = encodeURIComponent("Alberta muiža");

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    // iPhone → fallback на .ics
    window.location.href = "/wedding.ics";
  } else {
    // Android / Desktop → открываем Google Calendar
    window.open(googleUrl, "_blank");
  }
};

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Фон */}
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          whileInView={{ opacity: 1, y: 0 }}
          className="w-full h-full"
        >
          <Image
            src="/albertaPhoto.jpg"
            alt="Alberta muiža"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* ЛЁГКИЙ градиент (без серости) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent" />

      {/* Контент */}
      <div className="relative z-10 h-full flex flex-col justify-between p-15 text-white">
        {/* Дата */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-10"
        ></motion.div>

        {/* Место */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="text-center leading-none">
            <p className="tracking-[0.3em] uppercase text-xl md:text-xl">
              15 августа 2026
            </p>
            <h2 className="text-6xl md:text-8xl lg:text-[120px] font-light">
              Alberta muiža
            </h2>
          </div>

          <p className="text-lg md:text-xl opacity-80">Начало в 16:00</p>
        </motion.div>

        {/* Кнопки */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10"
        >
          <a
            href="https://www.google.com/maps/search/?api=1&query=Alberta+muiža"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full bg-white text-black text-sm md:text-base hover:scale-105 active:scale-95 transition"
          >
            Открыть карту 📍
          </a>

          <a
            onClick={addToCalendar}
            download
            className="px-7 py-3 rounded-full border border-white text-sm md:text-base hover:bg-white hover:text-black transition"
          >
            Добавить в календарь 📅
          </a>
        </motion.div>
      </div>
    </section>
  );
}
