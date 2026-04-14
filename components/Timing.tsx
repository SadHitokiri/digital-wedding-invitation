"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    time: "16:00",
    title: "Сбор гостей",
  },
  {
    time: "16:30",
    title: "Торжественная церемония",
  },
  {
    time: "17:00",
    title: "Фуршет",
  },
  {
    time: "18:00",
    title: "Праздничный банкет",
  },
];

export default function Timing() {
  return (
    <section className="px-6 text-center max-w-4xl mx-auto">
      <div className="max-w-3xl mx-auto">
        {/* Заголовок */}
        <h2 className="py-5 text-4xl mb-6 font-light">Тайминг дня</h2>

        {/* Линия + события */}
        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#CFCAC3] -translate-x-1/2" />

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-center justify-between"
              >
                {/* Время */}
                <div className="w-1/2 text-right pr-8">
                  <p className="text-xl md:text-2xl font-light text-[#8C857C]">
                    {item.time}
                  </p>
                </div>

                {/* Точка */}
                <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#645e56] rounded-full" />

                {/* Описание */}
                <div className="w-1/2 text-left pl-8">
                  <p className="text-lg md:text-lg text-neutral-600 leading-relaxed">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
