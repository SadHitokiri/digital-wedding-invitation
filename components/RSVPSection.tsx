"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function RSVP() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    surname: false,
  });

  const [form, setForm] = useState({
    name: "",
    surname: "",
    will_attend: true,
    alcohol: [] as string[],
    allergies: "",
    comment: "",
  });

  const isFormValid =
    form.name.trim().length > 0 && form.surname.trim().length > 0;

  const handleSubmit = async () => {
    if (loading || success) return;

    const nameValid = form.name.trim().length > 0;
    const surnameValid = form.surname.trim().length > 0;

    setErrors({
      name: !nameValid,
      surname: !surnameValid,
    });

    if (!nameValid || !surnameValid) return;

    try {
      setLoading(true);

      const { error } = await supabase.from("guests_response").insert([form]);

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      alert("Ошибка отправки 😢");
    } finally {
      setLoading(false);
    }
  };

  const toggleAlcohol = (item: string) => {
    setForm((prev) => {
      if (item === "Без алкоголя") {
        return { ...prev, alcohol: ["Без алкоголя"] };
      }

      const filtered = prev.alcohol.filter((i) => i !== "Без алкоголя");
      const exists = filtered.includes(item);

      return {
        ...prev,
        alcohol: exists
          ? filtered.filter((i) => i !== item)
          : [...filtered, item],
      };
    });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (field === "name" || field === "surname") {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  return (
    <section className="relative py-32 px-6 flex justify-center">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && !success && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              <h2 className="text-2xl mb-6 text-center">
                Будешь с нами в этот день?
              </h2>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setForm((prev) => ({ ...prev, will_attend: true }));
                    setStep(2);
                  }}
                  className="px-6 py-3 rounded-full bg-neutral-900 text-white hover:opacity-90 transition cursor-pointer"
                >
                  С радостью 💛
                </button>

                <button
                  onClick={() => {
                    setForm((prev) => ({ ...prev, will_attend: false }));
                    setStep(2);
                  }}
                  className="px-6 py-3 rounded-full bg-neutral-200 hover:bg-neutral-300 transition cursor-pointer"
                >
                  К сожалению, нет
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && !success && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="space-y-10">
                {/* ❌ НЕ ПРИДУ */}
                {!form.will_attend && (
                  <>
                    <div className="text-center space-y-2">
                      <h2 className="text-xl">Нам очень жаль 💔</h2>
                      <p className="text-neutral-500 text-sm">
                        что тебя не будет с нами в этот день
                      </p>
                    </div>

                    <div className="space-y-3">
                      <input
                        placeholder="Имя"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className={`w-full p-4 rounded-xl bg-white/70 outline-none transition
              ${errors.name ? "ring-2 ring-red-400" : "focus:ring-2 ring-neutral-300"}`}
                      />

                      <input
                        placeholder="Фамилия"
                        value={form.surname}
                        onChange={(e) => updateField("surname", e.target.value)}
                        className={`w-full p-4 rounded-xl bg-white/70 outline-none transition
              ${errors.surname ? "ring-2 ring-red-400" : "focus:ring-2 ring-neutral-300"}`}
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading || !isFormValid}
                      className={`w-full py-4 rounded-full transition
            ${
              isFormValid
                ? "bg-neutral-900 text-white hover:opacity-90"
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
                    >
                      {loading ? "Отправляем..." : "Отправить"}
                    </button>

                    <button
                      onClick={() => setStep(1)}
                      className="w-full py-3 rounded-full bg-neutral-200 hover:bg-neutral-300 transition text-sm cursor-pointer"
                    >
                      Может всё же получится 💛
                    </button>
                  </>
                )}

                {/* ✅ ПРИДУ */}
                {form.will_attend && (
                  <>
                    {/* 👤 ИМЯ */}
                    <div className="space-y-3">
                      <input
                        placeholder="Имя"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className={`w-full p-4 rounded-xl bg-white/70 outline-none transition
              ${errors.name ? "ring-2 ring-red-400" : "focus:ring-2 ring-neutral-300"}`}
                      />

                      <input
                        placeholder="Фамилия"
                        value={form.surname}
                        onChange={(e) => updateField("surname", e.target.value)}
                        className={`w-full p-4 rounded-xl bg-white/70 outline-none transition
              ${errors.surname ? "ring-2 ring-red-400" : "focus:ring-2 ring-neutral-300"}`}
                      />
                    </div>

                    {/* 🍸 БАР */}
                    <div className="space-y-4 text-center">
                      <p className="text-sm text-neutral-500">
                        Наш бармен уже готовит кое-что особенное 🍸
                      </p>

                      <p className="text-base">Что тебе ближе по настроению?</p>

                      <div className="flex gap-3 flex-wrap justify-center pt-2">
                        {[
                          { title: "Лёгкие", emoji: "🍋" },
                          { title: "Сладкие", emoji: "🍓" },
                          { title: "Кислые", emoji: "🌿" },
                          { title: "Крепкие", emoji: "🥃" },
                          { title: "Без алкоголя", emoji: "🚫" },
                        ].map((item) => {
                          const label = item.title;
                          const active = form.alcohol.includes(label);

                          return (
                            <motion.button
                              key={label}
                              type="button"
                              onClick={() => toggleAlcohol(label)}
                              whileHover={{ y: -3, scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={`px-4 py-2 rounded-full text-sm border cursor-pointer
                    ${
                      active
                        ? "bg-neutral-900 text-white"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                            >
                              {item.emoji} {item.title}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 🥗 ДОП */}
                    <div className="space-y-4">
                      <input
                        placeholder="Аллергии или ограничения"
                        value={form.allergies}
                        onChange={(e) =>
                          updateField("allergies", e.target.value)
                        }
                        className="w-full p-4 rounded-xl bg-white/70 outline-none focus:ring-2 ring-neutral-300 transition"
                      />

                      <textarea
                        placeholder="Комментарий (по желанию)"
                        value={form.comment}
                        onChange={(e) => updateField("comment", e.target.value)}
                        className="w-full p-4 min-h-24 rounded-xl bg-white/70 outline-none focus:ring-2 ring-neutral-300 transition"
                      />
                    </div>

                    {/* 🌙 НОЧЬ */}
                    <p className="text-xs text-neutral-400 text-center leading-relaxed">
                      🏡 Возможность остаться на ночь есть. Мы поможем с
                      бронированием, оплата — самостоятельно
                    </p>

                    {/* КНОПКА */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading || !isFormValid}
                      className={`w-full py-4 rounded-full transition
            ${
              isFormValid
                ? "bg-neutral-900 text-white hover:opacity-90"
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
                    >
                      {loading ? "Отправляем..." : "Отправить"}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}
          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl bg-white/60 backdrop-blur-xl p-10 text-center space-y-6"
            >
              <h2 className="text-2xl">
                {form.will_attend ? "Спасибо 💛" : "Очень жаль 💔"}
              </h2>

              <p className="text-neutral-600">
                {form.will_attend
                  ? "Будем рады видеть тебя"
                  : "Спасибо, что сообщил(а)"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
