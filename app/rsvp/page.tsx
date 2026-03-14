"use client";

import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";

export default function RSVP() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const { error } = await supabase.from("guests_response").insert({
      name: data.name,
      surname: data.surname,
      will_attend: data.will_attend === "yes",
      alcohol: data.alcohol,
      comment: data.comment,
    });

    console.log(error);

    alert("Спасибо ❤️ Мы получили ваш ответ");
    reset();
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl mb-6">Подтвердите участие</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Имя"
          className="border p-2 w-full"
        />
        <input
          {...register("surname")}
          placeholder="Фамилия"
          className="border p-2 w-full"
        />

        <select {...register("will_attend")} className="border p-2 w-full">
          <option value="yes">Буду 🎉</option>
          <option value="no">Не смогу 😢</option>
        </select>

        <select {...register("alcohol")} className="border p-2 w-full">
          <option value="wine">Вино</option>
          <option value="whiskey">Виски</option>
          <option value="none">Не пью</option>
        </select>

        <textarea
          {...register("comment")}
          placeholder="Комментарий"
          className="border p-2 w-full"
        />

        <button className="bg-black text-white p-3 w-full">Отправить</button>
      </form>
    </div>
  );
}
