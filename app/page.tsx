import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl mb-6">Дмитрий & Вероника</h1>

      <p className="mb-10 text-xl">
        Приглашаем вас разделить с нами день нашей свадьбы
      </p>

      <Link
        href="/rsvp"
        className="bg-black text-white px-6 py-3"
      >
        Подтвердить участие
      </Link>
    </main>
  )
}