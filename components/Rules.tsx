"use client";

import { motion } from "framer-motion";

const rules = [
  {
    title: "Без детей",
    text: `Надеемся на ваше понимание и будем признательны, если этот день вы проведёте вместе с нами без детей.`,
    icon: "👶🏼",
  },
  {
    title: "Список гостей",
    text: `Мы продумали список гостей заранее и, к сожалению, не сможем принять дополнительных участников.  
Спасибо за понимание 🤍`,
    icon: "✨",
  },
  {
    title: "Без цветов",
    text: `К сожалению, мы не сможем в полной мере насладиться всеми подаренными букетами.  
Поэтому, если вы планировали дарить цветы, мы будем рады альтернативе -  
бутылочке вашего любимого напитка или любому другому приятному и долговечному подарку 💚`,
    icon: "💐",
  },
  {
    title: "Организатор",
    text: `Если у вас появятся вопросы в день мероприятия,  
вы всегда можете обратиться к нашему организатору.`,
    contact: "Юлия +37127739375",
    icon: "📱",
  },
];

export default function Rules() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl mb-6 font-light">Важно знать</h2>
        <p className="mt-4 text-lg text-neutral-600">
          Несколько небольших деталей, которые помогут сделать этот день ещё
          лучше
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {rules.map((rule, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 rounded-2xl bg-white shadow-sm border border-[#EAE7E2]"
          >
            <div className="text-2xl mb-4">{rule.icon}</div>

            <h3 className="text-lg font-medium text-[#2A2A2A] mb-2">
              {rule.title}
            </h3>

            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              {rule.text}
            </p>
            {rule.contact && (
              <p className="text-sm text-[#6B6B6B] mt-4">{rule.contact}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
