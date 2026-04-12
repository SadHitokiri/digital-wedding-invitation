"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function RSVP() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    will_attend: true,
    alcohol: [] as string[],
    comment: "",
  });

  const handleSubmit = async () => {
    setLoading(true);

    const { error } = await supabase.from("guests_response").insert([form]);

    setLoading(false);

    if (!error) {
      setSuccess(true);
    } else {
      alert("Ошибка отправки 😢");
    }
  };

  const toggleAlcohol = (item: string) => {
    setForm((prev) => {
      const exists = prev.alcohol.includes(item);

      return {
        ...prev,
        alcohol: exists
          ? prev.alcohol.filter((i) => i !== item)
          : [...prev.alcohol, item],
      };
    });
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
                    setForm({ ...form, will_attend: true });
                    setStep(2);
                  }}
                  className="px-6 py-3 rounded-full bg-neutral-900 text-white hover:opacity-90 transition cursor-pointer"
                >
                  С радостью 💛
                </button>

                <button
                  onClick={() => {
                    setForm({ ...form, will_attend: false });
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
              className="rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] space-y-6"
            >
              {/* ❌ НЕ ПРИДУ */}
              {!form.will_attend && (
                <>
                  <div className="text-center space-y-2">
                    <h2 className="text-xl">Нам очень жаль 💔</h2>
                    <p className="text-neutral-600 text-sm">
                      что тебя не будет с нами в этот день
                    </p>
                  </div>

                  <input
                    placeholder="Имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white/70 outline-none focus:ring-2 ring-neutral-300 transition"
                  />

                  <input
                    placeholder="Фамилия"
                    value={form.surname}
                    onChange={(e) =>
                      setForm({ ...form, surname: e.target.value })
                    }
                    className="w-full p-4 rounded-xl bg-white/70 outline-none focus:ring-2 ring-neutral-300 transition"
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-neutral-900 text-white hover:opacity-90 transition cursor-pointer"
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
                  <h2 className="text-xl text-center">Заполни, пожалуйста</h2>

                  <input
                    placeholder="Имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white/70 outline-none focus:ring-2 ring-neutral-300 transition"
                  />

                  <input
                    placeholder="Фамилия"
                    value={form.surname}
                    onChange={(e) =>
                      setForm({ ...form, surname: e.target.value })
                    }
                    className="w-full p-4 rounded-xl bg-white/70 outline-none focus:ring-2 ring-neutral-300 transition"
                  />

                  <div>
                    <p className="mb-2 text-sm text-neutral-600">
                      Предпочтения по алкоголю
                    </p>

                    <div className="flex gap-3 flex-wrap">
                      {[
                        "Вино",
                        "Шампанское",
                        "Ром",
                        "Виски",
                        "Джин",
                        "Водка",
                        "Не пью",
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() => toggleAlcohol(item)}
                          className={`px-4 py-2 rounded-full border transition cursor-pointer
                  ${
                    form.alcohol.includes(item)
                      ? "bg-neutral-900 text-white"
                      : "bg-white/60"
                  }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    placeholder="Комментарий (по желанию)"
                    value={form.comment}
                    onChange={(e) =>
                      setForm({ ...form, comment: e.target.value })
                    }
                    className="w-full p-4 rounded-xl bg-white/70 outline-none focus:ring-2 ring-neutral-300 transition"
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-neutral-900 text-white hover:opacity-90 transition cursor-pointer"
                  >
                    {loading ? "Отправляем..." : "Отправить"}
                  </button>
                </>
              )}
            </motion.div>
          )}

          {/* SUCCESS */}
          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl bg-white/60 backdrop-blur-xl p-10 shadow-xl text-center"
            >
              <h2 className="text-2xl mb-3">Спасибо 💛</h2>
              <p className="text-neutral-600">Мы получили твой ответ</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
