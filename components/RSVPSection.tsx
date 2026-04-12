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
    comment: "",
  });

  const isFormValid =
    form.name.trim().length > 0 && form.surname.trim().length > 0;

  const handleSubmit = async () => {
    const nameValid = form.name.trim().length > 0;
    const surnameValid = form.surname.trim().length > 0;

    setErrors({
      name: !nameValid,
      surname: !surnameValid,
    });

    if (!nameValid || !surnameValid) return;

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
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors((prev) => ({ ...prev, name: false }));
                    }}
                    className={`w-full p-4 rounded-xl bg-white/70 outline-none transition
                      ${errors.name ? "ring-2 ring-red-400" : "focus:ring-2 ring-neutral-300"}
                    `}
                  />

                  <input
                    placeholder="Фамилия"
                    value={form.surname}
                    onChange={(e) => {
                      setForm({ ...form, surname: e.target.value });
                      setErrors((prev) => ({ ...prev, surname: false }));
                    }}
                    className={`w-full p-4 rounded-xl bg-white/70 outline-none transition
                      ${errors.surname ? "ring-2 ring-red-400" : "focus:ring-2 ring-neutral-300"}
                    `}
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={loading || !isFormValid}
                    className={`w-full py-4 rounded-full transition
                      ${
                        isFormValid
                          ? "bg-neutral-900 text-white hover:opacity-90 cursor-pointer"
                          : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                      }
                    `}
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
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors((prev) => ({ ...prev, name: false }));
                    }}
                    className={`w-full p-4 rounded-xl bg-white/70 outline-none transition
                      ${errors.name ? "ring-2 ring-red-400" : "focus:ring-2 ring-neutral-300"}
                    `}
                  />

                  <input
                    placeholder="Фамилия"
                    value={form.surname}
                    onChange={(e) => {
                      setForm({ ...form, surname: e.target.value });
                      setErrors((prev) => ({ ...prev, surname: false }));
                    }}
                    className={`w-full p-4 rounded-xl bg-white/70 outline-none transition
                      ${errors.surname ? "ring-2 ring-red-400" : "focus:ring-2 ring-neutral-300"}
                    `}
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
                    placeholder="Комментарий (по желанию) - можно указать предпочтения по вину 🍷"
                    value={form.comment}
                    onChange={(e) =>
                      setForm({ ...form, comment: e.target.value })
                    }
                    className="w-full p-4 rounded-xl bg-white/70 outline-none focus:ring-2 ring-neutral-300 transition"
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={loading || !isFormValid}
                    className={`w-full py-4 rounded-full transition
                      ${
                        isFormValid
                          ? "bg-neutral-900 text-white hover:opacity-90 cursor-pointer"
                          : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                      }
                    `}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl bg-white/60 backdrop-blur-xl p-6 md:p-10 shadow-xl text-center space-y-6"
            >
              {/* 📸 фото */}
              <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-2xl">
                <img
                  src={
                    form.will_attend
                      ? "/photo-happy.jpg" // 👈 для гостей
                      : "/photo-soft.jpg" // 👈 более спокойное фото
                  }
                  alt="Wedding"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* 💬 текст */}
              {form.will_attend ? (
                <>
                  <h2 className="text-2xl">Спасибо 💛</h2>
                  <p className="text-neutral-600">
                    Мы получили твой ответ и будем рады видеть тебя
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl">Очень жаль 💔</h2>
                  <p className="text-neutral-600">
                    Нам будет не хватать тебя в этот день, но спасибо, что
                    сообщил(а)
                  </p>
                </>
              )}

              <div className="w-16 h-px bg-neutral-300 mx-auto" />

              <p className="text-sm text-neutral-500">
                С любовью, Вероника & Дмитрий
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
