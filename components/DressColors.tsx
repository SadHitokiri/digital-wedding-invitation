"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function DressColors() {
  const [active, setActive] = useState<{
    name: string;
    hex: string;
    description: string;
  } | null>(null);
  const colors = [
    // 🤍 СВЕТЛЫЕ / БАЗА
    {
      name: "Champagne Nude",
      hex: "#E8D5C4",
      description: "Лёгкий и нежный оттенок - идеально для воздушных образов",
    },
    {
      name: "Muted Sand",
      hex: "#D8C3A5",
      description: "Спокойный песочный оттенок с мягким теплом",
    },
    {
      name: "Sand Beige",
      hex: "#CFC3AF",
      description: "Тёплая база, которая подойдёт практически каждому",
    },

    // 🌾 НЕЙТРАЛЬНЫЕ / ТЁПЛЫЕ
    {
      name: "Warm Taupe",
      hex: "#B8A89A",
      description: "Сдержанный и элегантный - для спокойного образа",
    },
    {
      name: "Camel",
      hex: "#C19A6B",
      description: "Мягкий и универсальный тёплый оттенок",
    },
    {
      name: "Clay Rose",
      hex: "#B68A6E",
      description: "Мягкий розово-глиняный оттенок с характером",
    },
    {
      name: "Terracotta",
      hex: "#A0522D",
      description: "Тёплый и выразительный акцент",
    },

    // 🍫 КОРИЧНЕВЫЕ / ГЛУБИНА
    {
      name: "Cocoa",
      hex: "#8B5E3C",
      description: "Тёплый насыщенный тон для выразительных образов",
    },
    {
      name: "Dark Walnut",
      hex: "#6B4226",
      description: "Глубокий коричневый - классика с теплом",
    },
    {
      name: "Espresso",
      hex: "#3E2723",
      description: "Максимально глубокий и вечерний оттенок",
    },

    // 🌿 ЗЕЛЁНЫЕ (от светлого к тёмному)
    {
      name: "Mustard Gold",
      hex: "#A88B00",
      description: "Тёплый акцент, добавляющий солнечного настроения",
    },
    {
      name: "Sage",
      hex: "#8C8B6E",
      description: "Спокойный и благородный зелёный",
    },
    {
      name: "Dusty Olive",
      hex: "#7A8450",
      description:
        "Приглушённый оливковый с мягкой глубиной — идеально в общей гамме",
    },
    {
      name: "Deep Olive",
      hex: "#5E6B3C",
      description: "Более насыщенный оливковый для глубины палитры",
    },
    {
      name: "Moss Green",
      hex: "#8A9A3A",
      description: "Живой и естественный - как летний сад",
    },
    {
      name: "Forest Green",
      hex: "#2F3E2F",
      description: "Глубокий и элегантный природный тон",
    },
  ];

  return (
    <section className="py-24 px-6 text-center max-w-4xl mx-auto">
      <h2 className="text-4xl mb-6 font-light">Дресс-код</h2>

      <p className="text-lg text-neutral-600 mb-4">
        Нам будет очень приятно, если ваш образ поддержит атмосферу нашего дня -
        тёплую, природную и немного винтажную
      </p>

      <p className="text-sm text-neutral-400 mb-10">
        Нажмите на цвет, чтобы почувствовать его настроение
      </p>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-7">
        {colors.map((color) => {
          const isActive = active?.name === color.name;
          return (
            <motion.div
              key={color.name}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (navigator.vibrate) {
                  navigator.vibrate(isActive ? 10 : 25);
                }
                setActive(isActive ? null : color);
              }}
              className="h-20 rounded-2xl cursor-pointer relative"
              style={{ backgroundColor: color.hex }}
              animate={{
                scale: isActive ? 1.12 : 1,
                boxShadow: isActive
                  ? "0 0 0 2px white, 0 10px 30px rgba(0,0,0,0.2)"
                  : "0 2px 8px rgba(0,0,0,0.05)",
              }}
            />
          );
        })}
      </div>

      {/* DESCRIPTION BLOCK */}
      <div className="mt-10 min-h-[60px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
              className="text-center max-w-md"
            >
              <p className="text-base text-neutral-900 font-medium mb-1">
                {active.name}
              </p>
              <p className="text-sm text-neutral-700">{active.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* bottom text */}
      <p className="mt-6 text-sm text-neutral-400">
        Вы можете выбрать любой оттенок из палитры или сочетать несколько
      </p>

      <p className="mt-4 text-sm text-neutral-400 italic">
        Каждый оттенок - часть атмосферы этого дня ✨
      </p>
    </section>
  );
}
